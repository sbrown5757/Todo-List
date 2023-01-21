import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { useNavigate } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20vh",
        backgroundColor: "#30363d",
        padding: "4vh",
        borderRadius: "8px",
        boxShadow: "0px 12px 12px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      {displayName === "login" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="header">Log in</h1>
          <form onSubmit={handleSubmit} name={name}>
            <Box>
              <InputBase
                placeholder="Username"
                name="username"
                required
                variant="outlined"
                autoComplete="off"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "4vh 2vh 4vh 2vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <InputBase
                placeholder="Password"
                name="password"
                required
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "4vh 2vh 4vh 2vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#CB9CF2",
                  padding: "1vh 4vh 1vh 4vh",
                  color: "#161b22",
                  ":hover": {
                    backgroundColor: "#d8b6f3",
                  },
                }}
              >
                {displayName}
              </Button>
            </Box>
            {error && <div> {error} </div>}
          </form>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="header">Sign up</h1>
          <form onSubmit={handleSubmit} name={name}>
            <Box>
              <InputBase
                placeholder="Username"
                name="username"
                required
                variant="outlined"
                autoComplete="off"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "4vh 2vh 4vh 2vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <InputBase
                placeholder="Password"
                name="password"
                required
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "4vh 2vh 4vh 2vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#CB9CF2",
                  padding: "1vh 4vh 1vh 4vh",
                  color: "#161b22",
                  ":hover": {
                    backgroundColor: "#d8b6f3",
                  },
                }}
              >
                {displayName}
              </Button>
            </Box>
            {error && <div> {error} </div>}
          </form>
        </Box>
      )}
    </Container>
  );
};

export default AuthForm;
