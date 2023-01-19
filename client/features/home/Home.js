import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Todos from "../todoList/TodoList";

/**
 * COMPONENT
 */
const Home = (props) => {
  return (
    <Container
      maxWidth="md"
      sx={{ backgroundColor: "#30363d", borderRadius: "8px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 className="header">Todo List</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Todos />
      </Box>
    </Container>
  );
};

export default Home;
