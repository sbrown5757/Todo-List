import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos, createTodo, updateTodo } from "./todoSlice";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import FocusTrap from "@mui/base/FocusTrap";
import { InputBase } from "@mui/material";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList.todos);
  const id = useSelector((state) => state.auth.me.id);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState({
    status: false,
    todoId: null,
  });
  const [newTask, setNewTask] = useState(null);
  const [error, setError] = useState(null);
  const [updatedTask, setUpdatedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos(id));
  }, [dispatch]);

  const handleSubmit = async () => {
    const desc = newTask;
    if (desc === "" || !!!desc) {
      setError("Input cannot be empty");
    } else {
      await dispatch(createTodo({ id, desc }));
      setOpen(false);
      setError(null);
      await dispatch(fetchTodos(id));
    }
  };

  const handleEditSubmit = async (todoId) => {
    const desc = updatedTask;

    if (desc === "" || !!!desc) {
      setError("Input cannot be empty");
    } else {
      await dispatch(updateTodo({ todoId, desc }));
      setError(null);
      setEditOpen({ status: false, todoId: null });
      setUpdatedTask(null);
      await dispatch(fetchTodos(id));
    }
  };

  const handleComplete = async (todoId) => {
    const completed = true;
    await dispatch(updateTodo({ todoId, completed }));
    await dispatch(fetchTodos(id));
  };

  const handleDelete = async (todoId) => {
    await dispatch(deleteTodo({ todoId }));
    await dispatch(fetchTodos(id));
  };

  const handleEdit = async (todoId) => {
    setEditOpen({ status: true, todoId: todoId });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        marginBottom: "20px",
        paddingBottom: "20px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="header">Tasks:</h1>
        <Fab
          sx={{
            backgroundColor: "#CB9CF2",
            ":hover": {
              backgroundColor: "#d8b6f3",
            },
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>
      {open && (
        <FocusTrap open>
          <Box
            tabIndex={-1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <InputBase
              placeholder="Task"
              required
              variant="outlined"
              sx={{
                width: "100%",
                border: "1px solid white",
                borderRadius: "6px",
                height: "6vh",
                padding: "4vh 2vh 4vh 2vh",
                color: "#ffffff",
              }}
              onChange={(evt) => setNewTask(evt.target.value)}
            />
            {error && (
              <Box>
                <p className="error-text">{error}</p>
              </Box>
            )}
            <Button
              sx={{
                width: "150px",
                backgroundColor: "#2ea043 ",
                ":hover": {
                  backgroundColor: "#3fb950",
                },
              }}
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#da3633",
                borderColor: "#da3633",
                ":hover": {
                  backgroundColor: "#da3633",
                  color: "#ffffff",
                  borderColor: "#da3633",
                },
              }}
              onClick={() => {
                setError(null);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </FocusTrap>
      )}
      {todos[0] ? (
        todos.map((todo) => {
          return (
            <Box key={todo.id}>
              {editOpen.status && editOpen.todoId === todo.id ? (
                <FocusTrap open>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "20px",
                      backgroundColor: "#161b22",
                      boxShadow: "0px 12px 12px 12px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                      padding: "4vh",
                    }}
                    tabIndex={-1}
                  >
                    <InputBase
                      defaultValue={todo.desc}
                      required
                      variant="outlined"
                      sx={{
                        width: "100%",
                        border: "1px solid white",
                        borderRadius: "6px",
                        height: "6vh",
                        padding: "4vh 2vh 4vh 2vh",
                        color: "#ffffff",
                      }}
                      onChange={(evt) => setUpdatedTask(evt.target.value)}
                    />

                    <Button
                      sx={{
                        width: "150px",
                        backgroundColor: "#2ea043 ",
                        ":hover": {
                          backgroundColor: "#3fb950",
                        },
                      }}
                      variant="contained"
                      onClick={() => {
                        handleEditSubmit(todo.id);
                      }}
                    >
                      Save
                    </Button>
                    {error && (
                      <Box>
                        <p className="error-text">{error}</p>
                      </Box>
                    )}
                  </Box>
                </FocusTrap>
              ) : (
                <Box
                  className="todo-box"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="todo-box"
                  key={todo.id}
                >
                  <Box sx={{ display: "flex" }}>
                    <Checkbox
                      onClick={() => {
                        handleComplete(todo.id);
                      }}
                      sx={{
                        color: "#CB9CF2",
                        "&.Mui-checked": {
                          color: "#CB9CF2",
                        },
                      }}
                    />
                    <h4>{todo.desc}</h4>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      id={todo.id}
                      className="edit"
                      sx={{
                        display: "none",
                        paddingRight: "15px",
                        transition: ".3s",
                      }}
                      onClick={() => {
                        setUpdatedTask(todo.desc);
                        handleEdit(todo.id);
                      }}
                    >
                      <EditIcon className="edit-delete-icon" />
                    </Box>
                    <Box
                      className="delete"
                      sx={{
                        color: "#da3633",
                        display: "none",
                        paddingRight: "15px",
                        transition: ".3s",
                      }}
                      onClick={() => {
                        handleDelete(todo.id);
                      }}
                    >
                      <DeleteForeverIcon className="edit-delete-icon" />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#ffffff" }}>No tasks</h2>
        </Box>
      )}
    </Container>
  );
};

export default Todos;
