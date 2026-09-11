import { PrismaClient, ProductCategory, TransactionType, TransactionCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Admin
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@salaomaceio.com' },
    update: {},
    create: {
      name: 'Admin Salão',
      email: 'admin@salaomaceio.com',
      phone: '82999999999',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin created/verified: ${admin.email}`);

  // 2. Services
  const servicesData = [
    { name: 'Mega Hair 50cm', basePrice: 350, durationMinutes: 120, description: 'Colocação de Mega Hair natural 50cm' },
    { name: 'Mega Hair 60cm', basePrice: 420, durationMinutes: 150, description: 'Colocação de Mega Hair natural 60cm' },
    { name: 'Selagem', basePrice: 180, durationMinutes: 90, description: 'Selagem térmica' },
    { name: 'Progressiva', basePrice: 220, durationMinutes: 120, description: 'Escova progressiva' },
    { name: 'Coloração', basePrice: 150, durationMinutes: 90, description: 'Aplicação de tinta profissional' },
    { name: 'Manutenção Mega Hair', basePrice: 120, durationMinutes: 60, description: 'Manutenção de mega hair' },
  ];

  const services = [];
  for (const s of servicesData) {
    // Basic deduplication approach using name
    const existing = await prisma.service.findFirst({ where: { name: s.name } });
    if (!existing) {
      const created = await prisma.service.create({ data: s });
      services.push(created);
    } else {
      services.push(existing);
    }
  }
  console.log('✅ Services seeded');

  // 3. Products
  const productsData = [
    { name: 'Mega Hair Cabelo Natural 50cm', category: ProductCategory.MEGA_HAIR, currentStock: 20, minStock: 5, unit: 'pacote', costPrice: 80, sellPrice: 150 },
    { name: 'Mega Hair Cabelo Natural 60cm', category: ProductCategory.MEGA_HAIR, currentStock: 15, minStock: 5, unit: 'pacote', costPrice: 100, sellPrice: 200 },
    { name: 'Queratina BTX 1kg', category: ProductCategory.QUERATINA, currentStock: 8, minStock: 2, unit: 'kg', costPrice: 85, sellPrice: 180 },
    { name: 'Tinta 60g Louro Dourado', category: ProductCategory.TINTA, currentStock: 30, minStock: 10, unit: 'bisnaga', costPrice: 12, sellPrice: 40 },
    { name: 'Fita Adesiva Dupla Face', category: ProductCategory.FITA_ADESIVA, currentStock: 50, minStock: 15, unit: 'rolo', costPrice: 25, sellPrice: 60 },
    { name: 'Condicionador Home Care 300ml', category: ProductCategory.HOMECARE, currentStock: 25, minStock: 8, unit: 'frasco', costPrice: 22, sellPrice: 45 },
  ];

  const products = [];
  for (const p of productsData) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      const created = await prisma.product.create({ data: p });
      products.push(created);
    } else {
      products.push(existing);
    }
  }
  console.log('✅ Products seeded');

  // 4. Mappings (Service Product Usages)
  const mega50 = services.find(s => s.name === 'Mega Hair 50cm');
  const prodMega50 = products.find(p => p.name === 'Mega Hair Cabelo Natural 50cm');
  if (mega50 && prodMega50) {
    const existingUsage = await prisma.serviceProductUsage.findFirst({
      where: { serviceId: mega50.id, productId: prodMega50.id }
    });
    if (!existingUsage) {
      await prisma.serviceProductUsage.create({
        data: { serviceId: mega50.id, productId: prodMega50.id, quantityUsed: 1 }
      });
    }
  }
  console.log('✅ Service Product Usages seeded');

  // 5. Sample Transactions for Dashboard
  const pastTransactions = await prisma.transaction.count();
  if (pastTransactions === 0) {
    const client = await prisma.user.upsert({
      where: { email: 'client@test.com' },
      update: {},
      create: { name: 'Maria Cliente', email: 'client@test.com', phone: '82988888888', passwordHash: 'test', role: 'CLIENT' }
    });

    const now = new Date();
    const transactions = [];

    // Create a few daily transactions for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      transactions.push({
        type: TransactionType.INCOME,
        category: TransactionCategory.SERVICE,
        amount: Math.floor(Math.random() * 300) + 150, // 150 to 450
        description: `Serviço realizado - Dia ${i}`,
        clientId: client.id,
        date: date
      });

      if (i % 3 === 0) { // Expenses every 3 days
        transactions.push({
          type: TransactionType.EXPENSE,
          category: TransactionCategory.STOCK_COST,
          amount: Math.floor(Math.random() * 100) + 50,
          description: `Compra de insumos - Dia ${i}`,
          date: date
        });
      }
    }

    await prisma.transaction.createMany({ data: transactions });
    console.log('✅ Sample Transactions seeded');
  }

  console.log('✅ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
