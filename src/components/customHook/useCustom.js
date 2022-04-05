import { useState } from "react";
import React from "react";

const useCustom = (test) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = test(value);
 
  const valueChangeHandler = (e) => {
    setIsTouched(true);
    setValue(e.target.value);

  };
  const inputblurHandler = () => {
    if (value.trim() === "") {
      setIsTouched(true);
    }
  };
  return {
    value,
    valueIsValid,
    isTouched,
    valueChangeHandler,
    inputblurHandler,
    setIsTouched
  };
};

export default useCustom;
