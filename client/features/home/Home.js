import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

/**
 * COMPONENT
 */
const Home = (props) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        <h1>Todo List</h1>
      </Box>
    </Container>
  );
};

export default Home;
