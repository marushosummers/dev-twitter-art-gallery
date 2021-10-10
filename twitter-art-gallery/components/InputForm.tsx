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
        <div className="flex mb-5 mx-auto max-w-xs">
            <div className="mt-1 relative rounded-md shadow-sm mx-5 w-11/12">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  {...bind} 
                  autoCapitalize="off"
                  name="screen_name"
                  className="bg-white focus:outline-none focus:shadow-outline py-2 px-8 rounded-md w-full"
                />
            </div>
        </div>
        <div className="flex justify-center mb-5 mx-5">
            <input
                type="submit"
                value="Get"
                disabled={value === ""}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 rounded w-20 mb-10"
            />
        </div>
    </form>
  );
}

export default InputForm;
