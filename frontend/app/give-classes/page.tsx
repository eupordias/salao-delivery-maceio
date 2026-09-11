'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default function TeacherForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 0, from: '', to: '' }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setScheduleItemValue(position: number, field: keyof ScheduleItem, value: string | number) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    if (!name || !whatsapp || !cost || !subject) {
      alert('Por favor, preencha todos os dados obrigatórios.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/study');
    }, 1800);
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F0F7] font-['Poppins'] pb-16">
      <PageHeader 
        title="Woww vamos juntos embelezar o mundo" 
        description="O primeiro passo, é preencher esse formulário de inscrição."        
      />

      <main className="w-full max-w-[740px] mx-auto -mt-8 md:-mt-12 px-4">
        <div className="bg-white border border-[#E6E6F0] rounded-lg shadow-sm overflow-hidden pt-8 md:pt-12">
          {isSuccess ? (
            <div className="py-16 text-center px-6">
              <div className="w-16 h-16 bg-[#42C269]/10 text-[#42C269] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#42C269]/30">
                <img src="/assets/images/icons/success-check-icon.svg" alt="Sucesso" className="w-8 h-8" />
              </div>
              <h2 className="font-['Archivo'] font-bold text-2xl md:text-3xl text-[#32264D] mb-2">
                Cadastro realizado com sucesso!
              </h2>
              <p className="text-[#6A6180] text-sm md:text-base max-w-md mx-auto">
                Redirecionando para a lista de profissionais cadastrados...
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreateClass}>
              {/* Fieldset 1: Seus dados */}
              <fieldset className="border-0 px-6 md:px-16 mb-12">
                <legend className="font-['Archivo'] font-bold text-2xl text-[#32264D] pb-4 border-b border-[#E6E6F0] w-full block">
                  Seus dados
                </legend>
                
                <div className="mt-6 space-y-6">
                  <Input 
                    name="name" 
                    label="Nome completo" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  
                  <Input 
                    name="avatar" 
                    label="Avatar (link da foto)" 
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                  
                  <Input 
                    name="whatsapp" 
                    label="WhatsApp" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(82) 99999-9999"
                    required
                  />
                  
                  <Textarea 
                    name="bio" 
                    label="Biografia"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conte um pouco sobre suas especialidades e experiência..."
                    required
                  />
                </div>
              </fieldset>

              {/* Fieldset 2: Sobre o serviço */}
              <fieldset className="border-0 px-6 md:px-16 mb-12">
                <legend className="font-['Archivo'] font-bold text-2xl text-[#32264D] pb-4 border-b border-[#E6E6F0] w-full block">
                  Sobre o serviço
                </legend>

                <div className="mt-6 space-y-6">
                  <Select 
                    name="subject" 
                    label="Serviço"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    options={[
                      { value: 'Matização dos fios', label: 'Matização dos fios' },
                      { value: 'Design de sobrancelhas', label: 'Design de sobrancelhas' },
                      { value: 'Massagem relaxante', label: 'Massagem relaxante' },
                      { value: 'Automaquiagem', label: 'Automaquiagem' },
                      { value: 'Spa de mãos', label: 'Spa de mãos' },
                      { value: 'Spa dos pés', label: 'Spa dos pés' },
                      { value: 'Dia da Noiva', label: 'Dia da Noiva' }
                    ]}
                  />

                  <Input 
                    name="cost" 
                    label="Custo do serviço (R$)" 
                    value={cost}
                    type="number"
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Ex: 150"
                    required
                  />
                </div>
              </fieldset>

              {/* Fieldset 3: Horários disponíveis */}
              <fieldset className="border-0 px-6 md:px-16 mb-12">
                <div className="flex justify-between items-center pb-4 border-b border-[#E6E6F0] w-full">
                  <legend className="font-['Archivo'] font-bold text-2xl text-[#32264D]">
                    Horário disponíveis
                  </legend>
                  <button 
                    type="button" 
                    onClick={addNewScheduleItem}
                    className="bg-transparent border-0 text-[#BE42C2] hover:text-[#774DD6] font-['Archivo'] font-bold text-sm md:text-base cursor-pointer transition-colors"
                  >
                    + Novo horário
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {scheduleItems.map((scheduleItem, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 rounded-lg bg-[#F8F8FC] border border-[#E6E6F0]">
                      <div className="sm:col-span-6">
                        <Select
                          name="week_day"
                          label="Dia da semana"
                          value={scheduleItem.week_day}
                          onChange={e => setScheduleItemValue(index, 'week_day', Number(e.target.value))}
                          options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                          ]}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Input 
                          name="from" 
                          label="De" 
                          value={scheduleItem.from}
                          type="time" 
                          onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Input 
                          name="to" 
                          label="Até" 
                          value={scheduleItem.to}
                          type="time" 
                          onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* Footer */}
              <footer className="p-6 md:p-12 bg-[#FAFAFC] border-t border-[#E6E6F0] flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="flex items-center text-xs md:text-sm text-[#9C98A6] leading-relaxed">
                  <img src="/assets/images/icons/warning.svg" alt="Aviso importante" className="mr-4 w-6 h-6 shrink-0" />
                  <span>
                    Importante! <br />
                    Preencha todos os dados
                  </span>
                </p>
                <button 
                  type="submit"
                  className="w-full sm:w-56 h-14 bg-[#42C269] hover:bg-[#71C242] text-white rounded-lg font-['Archivo'] font-bold text-base flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  Salvar cadastro
                </button>
              </footer>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
