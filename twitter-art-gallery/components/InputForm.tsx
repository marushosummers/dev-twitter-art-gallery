import React from "react";
import { useInput } from "../hooks/input";

interface InputFormProps {
  name: string
  onSubmit: any
};

const InputForm: React.FC<InputFormProps> = ({ name, onSubmit }) => {
  const { value, bind } = useInput(name);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className="mx-1 w-48">
        <div className="nm-flat-gray-100 flex justify-between py-2 pl-3 pr-3 mx-1 rounded-full w-full">
          <span className="text-gray-400 text-sm mt-0.5">@</span>

          <input
            type="search"
            {...bind}
            autoCapitalize="off"
            name="screen_name"
            className="bg-gray-100 w-36 focus:outline-none text-gray-500 focus:shadow-outline appearance-none"
          />
        </div>
      </div>
    </form>
  );
}

export default InputForm;
