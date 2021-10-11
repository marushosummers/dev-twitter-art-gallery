import React from "react";
import { useInput } from "../hooks/input";

interface InputFormProps {
  name: string
  onSubmit: any
};

const InputForm: React.FC<InputFormProps> = ({ name, onSubmit }) => {
  const { value, bind } = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mx-1 w-48">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500 text-sm">@</span>
        </div>
        <input
          type="text"
          {...bind}
          autoCapitalize="off"
          name="screen_name"
          placeholder={name}
          className="nm-flat-gray-100 focus:outline-none text-gray-500 focus:shadow-outline py-2 pl-8 pr-4 mx-1 rounded-full w-full mb-1"
        />
      </div>
    </form>
  );
}

export default InputForm;
