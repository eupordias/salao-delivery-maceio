import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="relative mt-6 first:mt-0 input-block">
      <label htmlFor={name} className="text-sm font-normal text-[#9C98A6] block mb-2">
        {label}
      </label>
      <input 
        type="text" 
        id={name} 
        {...rest}
        className="w-full h-14 bg-[#F8F8FC] border border-[#E6E6F0] rounded-lg px-4 text-base text-[#32264D] outline-none focus:border-[#BE42C2] focus:ring-1 focus:ring-[#BE42C2] transition-colors"
      />
    </div>
  );
};

export default Input;
