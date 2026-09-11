'use client';

import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 1,
    name: 'Jéssica Medeiros',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    subject: 'Matização dos fios & Mega Hair',
    bio: 'Apaixonada por realçar a beleza feminina através de técnicas exclusivas de matização, mechas e aplicação invisível de Mega Hair. Atendimento personalizado e de alto padrão.',
    cost: 150,
    whatsapp: '5582999990001'
  },
  {
    id: 2,
    name: 'Carlos Henrique',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    subject: 'Dia da Noiva',
    bio: 'Especialista em produções completas para noivas, eventos e formandas. Mais de 10 anos de experiência com penteados elaborados e visagismo.',
    cost: 350,
    whatsapp: '5582999990002'
  },
  {
    id: 3,
    name: 'Larissa Vasconcelos',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    subject: 'Design de sobrancelhas',
    bio: 'Especialista em harmonização facial, micropigmentação suave e design de sobrancelhas personalizado para cada formato de rosto.',
    cost: 80,
    whatsapp: '5582999990003'
  },
  {
    id: 4,
    name: 'Amanda Silveira',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    subject: 'Massagem relaxante',
    bio: 'Terapeuta corporal especializada em massagem relaxante, drenagem linfática e spa dos pés para revigorar sua energia no conforto de casa.',
    cost: 120,
    whatsapp: '5582999990004'
  }
];

export default function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function searchTeachers(e: FormEvent) {
    e.preventDefault();
    if (!subject && !week_day && !time) {
      setTeachers(INITIAL_TEACHERS);
      return;
    }
    const filtered = INITIAL_TEACHERS.filter(t => {
      return !subject || t.subject.toLowerCase().includes(subject.toLowerCase());
    });
    setTeachers(filtered);
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F0F7] font-['Poppins']">
      <PageHeader title="Profissionais disponíveis para agendar">
        <form onSubmit={searchTeachers} className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <Select
            name="subject"
            label="Serviço"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta' },
              { value: '6', label: 'Sábado' }
            ]}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button 
            type="submit"
            className="w-full h-14 bg-[#42C269] hover:bg-[#71C242] text-white rounded-lg font-['Archivo'] font-bold text-base flex items-center justify-center transition-colors shadow-sm cursor-pointer mt-6 sm:mt-0"
          >
            Buscar
          </button>
        </form>
      </PageHeader>

      <main className="w-full max-w-[740px] mx-auto px-4 py-8 pb-16">
        {teachers.length === 0 ? (
          <p className="text-center text-[#9C98A6] mt-8 text-base">
            Nenhum profissional encontrado com os filtros selecionados.
          </p>
        ) : (
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />;
          })
        )}
      </main>
    </div>
  );
}
