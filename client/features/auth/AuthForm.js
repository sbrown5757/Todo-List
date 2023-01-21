import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    // const first_name = evt.target.firstName.value;
    // const last_name = evt.target.lastName.value;

    const email = evt.target.email.value;
    const password = evt.target.password.value;

    if (name === "signup") {
      const first_name = evt.target.firstName.value;
      const last_name = evt.target.lastName.value;
      const res = await dispatch(
        authenticate({
          first_name,
          last_name,
          email,
          password,
          method: formName,
        })
      );

      if (res.type === "auth/authenticate/fulfilled") {
        navigate("/");
      }
    } else {
      const res = await dispatch(
        authenticate({ email, password, method: formName })
      );
      if (res.type === "auth/authenticate/fulfilled") {
        navigate("/");
      }
    }

    // dispatch(authenticate({ username, password, method: formName }));
    // navigate("/");
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
      {name === "login" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="header">Log in</h2>
          <form onSubmit={handleSubmit} name={name}>
            <Box>
              <InputBase
                placeholder="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                autoComplete="off"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "2vh 1vh 2vh 1vh",
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
                  padding: "2vh 1vh 2vh 1vh",
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
          <h4>Don't have an account?</h4>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="header">Sign up</h2>
          <form className="signup-form" onSubmit={handleSubmit} name={name}>
            <Box>
              <InputBase
                placeholder="First Name"
                name="firstName"
                required
                variant="outlined"
                autoComplete="off"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "2vh 1vh 2vh 1vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <InputBase
                placeholder="Last Name"
                name="lastName"
                required
                variant="outlined"
                type="text"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "2vh 1vh 2vh 1vh",
                  color: "#ffffff",
                }}
              />
            </Box>
            <Box>
              <InputBase
                placeholder="Email"
                name="email"
                required
                variant="outlined"
                type="email"
                sx={{
                  width: "100%",
                  border: "1px solid white",
                  borderRadius: "6px",
                  height: "6vh",
                  padding: "2vh 1vh 2vh 1vh",
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
                  padding: "2vh 1vh 2vh 1vh",
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
          <h4>Or</h4>
          <Link className="link" to="/login">
            Login
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default AuthForm;
