import React from "react";
import { useInput } from "../hooks/input";

interface InputFormProps {
  onSubmit: any
};

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const { value, bind } = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex max-w-xs">
        <div className="relative rounded-md shadow-sm mx-5 w-11/12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">@</span>
          </div>
          <input
            type="text"
            {...bind} 
            autoCapitalize="off"
            name="screen_name"
            className="nm-flat-gray-50 focus:outline-none focus:shadow-outline py-2 px-6 rounded-full w-full"
          />
        </div>
      </div>
    </form>
  );
}

export default InputForm;
