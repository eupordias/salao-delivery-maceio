import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';
import { CampaignChannel, CampaignStatus } from '@prisma/client';

export interface CreateCampaignDto {
  name: string;
  segment: string;
  message: string;
  channel?: CampaignChannel;
}

export class CrmService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async getInactiveClients(inactiveDays: number, minSpent: number = 0, serviceFilter?: string) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - inactiveDays);

    // Using raw SQL for complex aggregation
    let query = `
      SELECT 
        u.id, 
        u.name, 
        u.phone, 
        u.email,
        MAX(a."scheduledAt") as "lastAppointment",
        (SELECT s.name FROM "Appointment" latest_a JOIN "Service" s ON latest_a."serviceId" = s.id WHERE latest_a."clientId" = u.id AND latest_a.status = 'COMPLETED' ORDER BY latest_a."scheduledAt" DESC LIMIT 1) as "lastService",
        COALESCE((SELECT SUM(amount) FROM "Transaction" WHERE "clientId" = u.id AND type = 'INCOME'), 0) as "totalSpent"
      FROM "User" u
      LEFT JOIN "Appointment" a ON u.id = a."clientId" AND a.status = 'COMPLETED'
      WHERE u.role = 'CLIENT'
      GROUP BY u.id
      HAVING (MAX(a."scheduledAt") <= $1 OR MAX(a."scheduledAt") IS NULL)
         AND COALESCE((SELECT SUM(amount) FROM "Transaction" WHERE "clientId" = u.id AND type = 'INCOME'), 0) >= $2
    `;

    const results: any[] = await prisma.$queryRawUnsafe(query, cutoffDate, minSpent);

    let mappedResults = results.map(row => {
      const lastApp = row.lastAppointment ? new Date(row.lastAppointment) : null;
      const daysSince = lastApp ? Math.floor((Date.now() - lastApp.getTime()) / (1000 * 3600 * 24)) : -1;
      return {
        ...row,
        totalSpent: Number(row.totalSpent),
        daysSinceLastVisit: daysSince,
      };
    });

    if (serviceFilter) {
      mappedResults = mappedResults.filter(r => r.lastService?.toLowerCase().includes(serviceFilter.toLowerCase()));
    }

    return mappedResults.sort((a, b) => b.totalSpent - a.totalSpent);
  }

  async getVipClients(minSpent: number) {
    const query = `
      SELECT 
        u.id, 
        u.name, 
        u.phone, 
        u.email,
        COALESCE((SELECT SUM(amount) FROM "Transaction" WHERE "clientId" = u.id AND type = 'INCOME'), 0) as "totalSpent"
      FROM "User" u
      WHERE u.role = 'CLIENT'
      GROUP BY u.id
      HAVING COALESCE((SELECT SUM(amount) FROM "Transaction" WHERE "clientId" = u.id AND type = 'INCOME'), 0) >= $1
      ORDER BY "totalSpent" DESC
    `;
    const results: any[] = await prisma.$queryRawUnsafe(query, minSpent);
    return results.map(r => ({ ...r, totalSpent: Number(r.totalSpent) }));
  }

  async createCampaign(data: CreateCampaignDto) {
    return prisma.campaign.create({ data });
  }

  async listCampaigns() {
    return prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async triggerCampaign(campaignId: string, clientIds: string[], messageTemplate: string, channel: CampaignChannel) {
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: CampaignStatus.SENDING }
    });

    let successCount = 0;

    for (const clientId of clientIds) {
      const client = await prisma.user.findUnique({ where: { id: clientId } });
      if (!client) continue;

      // Simplistic placeholder replace for demonstration
      const personalizedMessage = messageTemplate
        .replace(/{{clientName}}/g, client.name)
        .replace(/{{daysSinceLastVisit}}/g, 'alguns dias'); // Would compute actual in real app

      let status = 'SUCCESS';

      try {
        if (channel === 'WHATSAPP' || channel === 'BOTH') {
          await this.sendWhatsApp(client.phone, personalizedMessage);
        }
        if (channel === 'EMAIL' || channel === 'BOTH') {
          await this.sendEmail(client.email, 'Oferta Especial Salão Maceió', personalizedMessage);
        }
      } catch (err) {
        console.error(`Error sending message to ${client.name}`, err);
        status = 'FAILED';
      }

      await prisma.campaignLog.create({
        data: {
          campaignId,
          clientId,
          channel,
          status,
          sentAt: status === 'SUCCESS' ? new Date() : null,
        }
      });

      if (status === 'SUCCESS') successCount++;
    }

    await prisma.campaign.update({
      where: { id: campaignId },
      data: { 
        status: CampaignStatus.SENT,
        sentCount: successCount
      }
    });

    return { total: clientIds.length, successCount };
  }

  private async sendWhatsApp(phone: string, message: string) {
    if (!process.env.EVOLUTION_API_URL) {
      console.warn(`[STUB] WhatsApp message to ${phone}: ${message}`);
      return;
    }
    // Real implementation would use fetch to send to Evolution API
    console.log(`Sending WhatsApp to ${phone}`);
  }

  private async sendEmail(to: string, subject: string, htmlContent: string) {
    if (!this.transporter) {
      console.warn(`[STUB] Email to ${to}: ${subject}`);
      return;
    }
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@salaomaceio.com',
      to,
      subject,
      html: htmlContent,
    });
  }

  exportClientsCsv(clients: any[]) {
    const headers = ['Nome', 'Telefone', 'Email', 'Último Serviço', 'Dias Inativo', 'Total Gasto'];
    const rows = clients.map(c => [
      c.name,
      c.phone,
      c.email,
      c.lastService || '',
      c.daysSinceLastVisit,
      c.totalSpent
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}
