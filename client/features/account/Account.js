import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Account = () => {
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "4vh",
      }}
    >
      <Box>
        <h2>Account</h2>
      </Box>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "0" }}>First Name</h3>
          <h4>{user.first_name}</h4>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "0" }}>Last Name</h3>
          <h4>{user.last_name}</h4>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h3 style={{ marginBottom: "0" }}>Email</h3>
          <h4>{user.email}</h4>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "0" }}>Password</h3>
          <h4>*********</h4>
        </Grid>
      </Grid>
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
        onClick={() => logoutAndRedirectHome()}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Account;
