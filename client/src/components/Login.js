import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLogin } from "react-icons/ai";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const { email, password } = inputs;
  return (
    <>
      <h1 className='text-center mt-5'>User Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          name='email'
          placeholder='email'
          className='form-control my-3'
          value={email}
          onChange={(e) => onHandler(e)}
          autoComplete='on'
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='form-control my-3'
          value={password}
          onChange={(e) => onHandler(e)}
          autoComplete='on'
        />
        <button className='btn btn-success btn-block'>
          <span>
            L
            <AiOutlineLogin style={{ fontSize: "x-large" }} />
            GIN
          </span>
        </button>
      </form>
      <span className='text-center my-5'>
        Dont Have an Account?
        <Link to='/register'> Register Here</Link>
      </span>
    </>
  );
};

export default Login;
