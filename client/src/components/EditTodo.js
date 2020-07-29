import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);
  const editText = async (id) => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/dashboard/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      toast.success("Updated in Successfully");
      setTodosChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <button
        type='button'
        className='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${todo.todo_id}`}
      >
        <AiFillEdit style={{ fontSize: "20px", color: "white" }} />
      </button>
      <div
        id={`id${todo.todo_id}`}
        className='modal fade'
        role='dialog'
        onClick={(e) => setDescription(todo.description)}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title '>Edit Todo</h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={(e) => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-dismiss='modal'
                onClick={() => editText(todo.todo_id)}
              >
                <span>SAVE </span>
                <AiFillSave />
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={(e) => setDescription(todo.description)}
              >
                <span>CANCEL </span>
                <GiCancel />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
