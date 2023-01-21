import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompleted, updateTodo, deleteTodo } from "./todoSlice";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Completed = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.me.id);
  const completed = useSelector((state) => state.todoList.todos);

  useEffect(() => {
    dispatch(fetchCompleted(id));
  }, [dispatch]);

  const handleDelete = async (todoId) => {
    await dispatch(deleteTodo({ todoId }));
    await dispatch(fetchCompleted(id));
  };

  const handleResume = async (todoId) => {
    const completed = false;
    await dispatch(updateTodo({ todoId, completed }));
    await dispatch(fetchCompleted(id));
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
      <Box>
        <h1 className="header">Completed Tasks:</h1>
      </Box>
      {completed[0] ? (
        completed.map((todo) => {
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
                  onClick={() => {
                    handleResume(todo.id);
                  }}
                  checked
                  sx={{
                    color: "#CB9CF2",
                    "&.Mui-checked": {
                      color: "#CB9CF2",
                    },
                  }}
                />
                <h4
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationColor: "#161b22",
                    textDecorationThickness: "2px",
                  }}
                >
                  {todo.desc}
                </h4>
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

export default Completed;
