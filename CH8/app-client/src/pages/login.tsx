import styled from "@emotion/styled";
import {
  Alert,
  AlertProps,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import PublicProvider from "../providers/PublicProvider";

const LoginContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100vh;
`;

const Background = styled.div`
  flex: 0.8;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.3;
  flex-basis: 20%;
`;

const Brand = styled.div`
  width: 100px;
  height: 34px;
  background-color: #cfd4ed;
`;

interface IAlert extends AlertProps {
  message: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = useState<IAlert>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response?.data?.data);

      setAlert({
        message: "Login success!",
        severity: "success",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({
          message: error?.response?.data?.message,
          severity: "error",
        });
      }
      setAlert({
        message: "Failed",
        severity: "error",
      });
    }
  };

  return (
    <PublicProvider>
      <LoginContainerStyled>
        <Background>
          <img
            src="https://res.cloudinary.com/dbsnmbhhl/image/upload/v1702745022/img-dashboard-admin_d4miwe.png"
            alt="background-login"
            style={{ width: "100%", height: "100%" }}
          />
        </Background>
        <Form onSubmit={handleSubmit}>
          <div style={{ width: "60%" }}>
            <Brand />
            <h2>Welcome, Admin BCR</h2>
            {alert && alert.message && (
              <Alert sx={{ mb: 3 }} severity={alert.severity}>
                {alert.message}
              </Alert>
            )}
            <InputLabel
              shrink
              htmlFor="username-input"
              sx={{ fontSize: "1.25em" }}
            >
              Username
            </InputLabel>
            <TextField
              name="username"
              id="username"
              placeholder="Type your username"
              sx={{ width: "100%", mb: 3 }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputLabel
              shrink
              htmlFor="password-input"
              sx={{ fontSize: "1.25em" }}
            >
              Password
            </InputLabel>
            <TextField
              name="password"
              id="password"
              placeholder="Type your password"
              type="password"
              sx={{ width: "100%", mb: 5 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: "100%" }}
            >
              Sign In
            </Button>
          </div>
        </Form>
      </LoginContainerStyled>
    </PublicProvider>
  );
}