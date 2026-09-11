import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="relative mt-6 first:mt-0 select-block">
      <label htmlFor={name} className="text-sm font-normal text-[#9C98A6] block mb-2">
        {label}
      </label>
      <select 
        id={name} 
        {...rest}
        className="w-full h-14 bg-[#F8F8FC] border border-[#E6E6F0] rounded-lg px-4 text-base text-[#32264D] outline-none focus:border-[#BE42C2] focus:ring-1 focus:ring-[#BE42C2] transition-colors"
      >
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
