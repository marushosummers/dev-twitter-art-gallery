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
      <div className="relative mx-1 w-48">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-1000 sm:text-sm">@</span>
        </div>
        <input
          type="text"
          {...bind}
          autoCapitalize="off"
          name="screen_name"
          className="nm-flat-gray-100 focus:outline-none text-gray-1000 focus:shadow-outline py-2 px-7 mx-1 rounded-full w-full mb-1"
        />
      </div>
    </form>
  );
}

export default InputForm;
