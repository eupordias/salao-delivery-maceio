import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div className="relative mt-6 first:mt-0 textarea-block">
      <label htmlFor={name} className="text-sm font-normal text-[#9C98A6] block mb-2">
        {label}
      </label>
      <textarea 
        id={name} 
        {...rest}
        className="w-full h-40 bg-[#F8F8FC] border border-[#E6E6F0] rounded-lg p-4 text-base text-[#32264D] outline-none focus:border-[#BE42C2] focus:ring-1 focus:ring-[#BE42C2] transition-colors resize-y"
      />
    </div>
  );
};

export default Textarea;
