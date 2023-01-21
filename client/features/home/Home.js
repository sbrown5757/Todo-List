import React, { useState } from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Todos from "../todoList/TodoList";
import Completed from "../todoList/CompletedList";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

/**
 * COMPONENT
 */
const Home = (props) => {
  const [value, setValue] = useState("incomplete");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value);

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#30363d",
        borderRadius: "8px",
        boxShadow: "0px 12px 12px 12px rgba(0,0,0, 0.8)",
        marginTop: "20vh",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { backgroundColor: "#CB9CF2" } }}
        sx={{
          marginBottom: "4vh",
          "& button": { color: "#ffffff" },
          "& button:hover": { color: "#CB9CF2" },
          "& button:active": { color: "#CB9CF2" },
          "& button.Mui-selected": { color: "#CB9CF2" },
        }}
      >
        <Tab value="incomplete" label="Incomplete" />

        <Tab value="completed" label="Completed" />
        <Tab value="account" label="Account" />
      </Tabs>
      {value === "completed" ? <Completed /> : <Todos />}
    </Container>
  );
};

export default Home;
