import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const NotFound = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "15vh" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h2>404</h2>
        <p>Page not found</p>
        <Link className="link" to="/">
          Home
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;
