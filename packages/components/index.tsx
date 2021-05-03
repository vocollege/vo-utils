import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Form2: React.FC = () => {
  //   const { register, setValue } = useForm<any>({ mode: "onChange" });

  const handleChange = (e: any) => {
    const { value } = e.target;
    // setValue("testfield", value);
  };

  useEffect(() => {
    // register("testfield", { required: true });
  }, []);

  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Form2;
