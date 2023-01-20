import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos, createTodo } from "./todoSlice";
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
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditTodo from "./editTodo";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList.todos);
  const id = useSelector((state) => state.auth.me.id);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState({ isOpen: false, todoId: null });
  const [newTask, setNewTask] = useState(null);
  const [error, setError] = useState(null);

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

  const handleDelete = async (todoId) => {
    await dispatch(deleteTodo({ todoId }));
    await dispatch(fetchTodos(id));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
            <CancelRoundedIcon
              sx={{ cursor: "pointer", color: "#da3633" }}
              onClick={() => {
                setError(null);
                setOpen(false);
              }}
            ></CancelRoundedIcon>
          </Box>
        </FocusTrap>
      )}
      {todos.map((todo) => {
        return (
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
                sx={{
                  color: "#CB9CF2",
                  "&.Mui-checked": {
                    color: "#CB9CF2",
                  },
                }}
              />
              <h4>{todo.desc}</h4>
              <EditTodo todo={todo} />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                className="edit"
                sx={{
                  display: "none",
                  paddingRight: "15px",
                  transition: ".3s",
                }}
                onClick={() => {}}
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
        );
      })}
    </Container>
  );
};

export default Todos;
