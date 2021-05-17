import { useState } from "react";

const useForm = (callback, intialState) => {
  const [values, setValues] = useState(intialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(values);
  };

  const onSubmit = (event) => {
    // console.log(values);
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export default useForm;
