import React from 'react';

export interface Teacher {
  id: number | string;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

export const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  return (
    <article className="bg-white border border-[#E6E6F0] rounded-lg mt-6 overflow-hidden shadow-sm">
      <header className="p-6 md:p-8 flex items-center">
        <img 
          src={teacher.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'} 
          alt={teacher.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0 border-2 border-[#BE42C2]/20" 
        />
        <div className="ml-6">
          <strong className="font-['Archivo'] font-bold text-xl md:text-2xl text-[#32264D] block">
            {teacher.name}
          </strong>
          <span className="text-sm md:text-base text-[#BE42C2] block mt-1 font-semibold">
            {teacher.subject}
          </span>
        </div>
      </header>

      <p className="px-6 md:px-8 text-[#6A6180] text-sm md:text-base leading-relaxed">
        {teacher.bio}
      </p>

      <footer className="p-6 md:p-8 bg-[#FAFAFC] border-t border-[#E6E6F0] mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#9C98A6]">
          Preço/hora ou procedimento
          <strong className="text-[#BE42C2] text-xl font-bold font-['Archivo'] ml-2 block sm:inline">
            R$ {Number(teacher.cost).toFixed(2)}
          </strong>
        </p>

        <a 
          target="_blank" 
          rel="noopener noreferrer"
          href={`https://wa.me/${teacher.whatsapp}?text=Ol%C3%A1%20${encodeURIComponent(teacher.name)}%2C%20vi%20seu%20perfil%20no%20LaBelle%20e%20gostaria%20de%20agendar%20um%20atendimento%21`}
          className="w-full sm:w-60 h-14 bg-[#42C269] hover:bg-[#71C242] text-white rounded-lg font-['Archivo'] font-bold text-sm md:text-base flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <img src="/assets/images/icons/whatsapp.svg" alt="Whatsapp" className="w-5 h-5" />
          <span>Entrar em contato</span>
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
