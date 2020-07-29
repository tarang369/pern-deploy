import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { toast } from "react-toastify";
import "./Todo.css";
import InputTodo from "./InputTodo";
import { AiOutlineSearch } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const ListTodo = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]);
  const [q, setQ] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/todo?q=${q}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();
      setTodos(parseRes);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      toast.success("Deleted Successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);
  return (
    <>
      <div className='header'>
        <InputTodo setTodosChange={setTodosChange} />
        <form style={{ display: "flex" }} onSubmit={onSubmitForm}>
          <input
            type='text'
            className='form-control mr-2'
            value={q}
            placeholder='Search Todo'
            onChange={(e) => setQ(e.target.value)}
          />
          <button className='btn btn-primary'>
            <AiOutlineSearch style={{ fontSize: "20px" }} />
          </button>
        </form>
      </div>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    <MdDeleteForever style={{ fontSize: "20px" }} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
