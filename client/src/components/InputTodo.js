import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "./Todo.css";
import { MdAdd } from "react-icons/md";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      toast.success("Added Successfully");
      setTodosChange(true);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Fragment>
      <form className='d-flex w-75 mr-2' onSubmit={onSubmitForm}>
        <input
          type='text'
          className='form-control mr-2'
          value={description}
          placeholder='Add a Todo'
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>
          <MdAdd style={{ fontSize: "20px" }} />
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
