import { useState } from 'react'

const useInput = (validationHandler: (value: string) => boolean) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  
  const validate = (value: string) => {
    setIsValid(validationHandler(value));
  }
  return {value, setValue, isValid, setIsValid, validate, isTouched, setIsTouched};
}

export default useInput;