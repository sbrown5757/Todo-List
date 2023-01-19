import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./todoSlice";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList.todos);
  const id = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(fetchTodos(id));
  }, [dispatch]);

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
            </Box>
            <Box
              className="delete"
              sx={{ display: "none", padding: "15px", transition: ".3s" }}
            >
              <DeleteForeverIcon className="delete-icon" />
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};

export default Todos;
