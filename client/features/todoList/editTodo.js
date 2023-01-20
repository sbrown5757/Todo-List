import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, fetchTodos } from "./todoSlice";
import Box from "@mui/material/Box";
import { FocusTrap } from "@mui/base";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";

const EditTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.me.id);
  const [updatedTask, setUpdatedTask] = useState(null);
  const [error, setError] = useState(null);
  console.log(updatedTask);

  const handleSubmit = async (todoId) => {
    const desc = updatedTask;

    if (desc === "" || !!!desc) {
      setError("Input cannot be empty");
    } else {
      await dispatch(await updateTodo({ todoId, desc }));
      setError(null);
      await dispatch(await fetchTodos(id));
    }
  };

  return (
    // <FocusTrap open>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
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
          handleSubmit(todo.id);
        }}
      >
        Save
      </Button>
    </Box>
    // </FocusTrap>
  );
};

export default EditTodo;
