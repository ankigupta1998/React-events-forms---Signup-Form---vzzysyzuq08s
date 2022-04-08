import React from "react";
// import { useState } from "react";
import "./Form.css";
import useCustom from "./customHook/useCustom";
import { useState } from "react";

let RegEx = /^[a-z0-9 ]+$/i;
const Form = () => {
  const [test, setTest] = useState(false);

  const clickHandler = () => {
    !valueIsValidForPass &&
      !valueIsValidForNo &&
      !valueIsValidForOpt &&
      !valueIsValidForEmail &&
      !valueIsValid &&
      setTest(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsTouched(true);
    setIsTouchedForEmail(true);
    setIsTouchedForNo(true);
    setIsTouchedForPass(true);
    setIsTouchedForOpt(true);
  };

  const {
    value,
    valueIsValid,
    isTouched,
    valueChangeHandler,
    inputblurHandler,
    setIsTouched,
  } = useCustom((value) => {
    return !RegEx.test(value) || value.trim() === "";
  });

  const {
    value: valueEmail,
    valueIsValid: valueIsValidForEmail,
    isTouched: isTouchedForEmail,
    valueChangeHandler: valueChangeHandlerForEmail,
    inputblurHandler: inputblurHandlerForEmail,
    setIsTouched: setIsTouchedForEmail,
  } = useCustom((valueEmail) => {
    return !valueEmail.includes("@");
  });

  const {
    value: valueNo,
    valueIsValid: valueIsValidForNo,
    isTouched: isTouchedForNo,
    valueChangeHandler: valueChangeHandlerForNo,
    inputblurHandler: inputblurHandlerForNo,
    setIsTouched: setIsTouchedForNo,
  } = useCustom((valueNo) => {
    return valueNo.trim() === "";
  });

  const {
    value: valuePass,
    valueIsValid: valueIsValidForPass,
    isTouched: isTouchedForPass,
    valueChangeHandler: valueChangeHandlerForPass,
    inputblurHandler: inputblurHandlerForPass,
    setIsTouched: setIsTouchedForPass,
  } = useCustom((valuePass) => {
    return valuePass.length < 6;
  });

  const {
    value: valueOpt,
    valueIsValid: valueIsValidForOpt,
    isTouched: isTouchedForOpt,
    valueChangeHandler: valueChangeHandlerForopt,
    inputblurHandler: inputblurHandlerForOpt,
    setIsTouched: setIsTouchedForOpt,
  } = useCustom((valueOpt) => {
    return !valueOpt;
  });

  const inputValidClass =
    isTouched && valueIsValid ? "name-input-invalid" : "name-input";
  const emailValidClass =
    isTouchedForEmail && valueIsValidForEmail
      ? "name-input-invalid"
      : "name-input";

  const NoValidClass =
    isTouchedForNo && valueIsValidForNo ? "name-input-invalid" : "name-input";

  const PassValidClass =
    isTouchedForPass && valueIsValidForPass
      ? "name-input-invalid"
      : "name-input";
  const OptValidClass =
    isTouchedForOpt && valueIsValidForOpt ? "name-input-invalid" : "name-input";

  const email = valueEmail;
  const result = email.slice(0, email.indexOf("@"));

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="content">
            <label htmlFor="name">Name: </label>
            <input
              className={inputValidClass}
              type="text"
              data-testid="name"
              id="name"
              onChange={valueChangeHandler}
              value={value}
              onBlur={inputblurHandler}
            />
            <br />

            {isTouched && valueIsValid && <div>Name is not alphanumeric</div>}
            <label htmlFor="email">Email: </label>
            <input
              className={emailValidClass}
              type="text"
              id="email"
              data-testid="email"
              value={valueEmail}
              onChange={valueChangeHandlerForEmail}
              onBlur={inputblurHandlerForEmail}
            />
            <br />
            {isTouchedForEmail && valueIsValidForEmail && (
              <div>Email must contain @</div>
            )}
            <label htmlFor="gender">Gender:</label>
            <select
              className={OptValidClass}
              data-testid="gender"
              id="gender"
              defaultValue="Male"
              onBlur={inputblurHandlerForOpt}
              onClick={valueChangeHandlerForopt}
            >
              <option>Male</option>
              <option>Female</option>
              <option>others</option>
            </select>
            <br />
            {isTouchedForOpt && valueIsValidForOpt && (
              <div>Please identify as male, female or others</div>
            )}
            <label htmlFor="number">Number:</label>
            <input
              className={NoValidClass}
              type="number"
              id="number"
              data-testid="phoneNumber"
              onChange={valueChangeHandlerForNo}
              value={valueNo}
              onBlur={inputblurHandlerForNo}
            />
            <br />
            {isTouchedForNo && valueIsValidForNo && (
              <div>Phone Number must contain only numbers</div>
            )}
            <label htmlFor="pass">Password:</label>
            <input
              className={PassValidClass}
              type="password"
              onChange={valueChangeHandlerForPass}
              onBlur={inputblurHandlerForPass}
              id="pass"
              data-testid="password"
            />
            <br />
            {isTouchedForPass && valueIsValidForPass && (
              <div>Password must contain atleast 6 letters</div>
            )}
            <button type="submit" data-testid="submit" onClick={clickHandler}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
      {test && !valueIsValidForPass &&
      !valueIsValidForNo &&
      !valueIsValidForOpt &&
      !valueIsValidForEmail &&
      !valueIsValid && <h1 className="greetingMessage">Hello {result}.</h1>}
      </div>
    </>
  );
};

export default Form;
