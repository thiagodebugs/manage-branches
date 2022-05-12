import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { Person, Key } from "@mui/icons-material";

export default function Login() {
  const [getUser, setUser] = React.useState("User");
  const [getPass, setPass] = React.useState("Password");
  const [disable, setDisable] = React.useState(false);
  const roteamento = useRouter();
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box>
          <Box my={5} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ color: "#00d700", fontWeight: "bold" }}
            >
              {"{"}
            </Typography>
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ color: "#3a3a3a", fontWeight: "bold" }}
            >
              LOGO
            </Typography>
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ color: "#00d700", fontWeight: "bold" }}
            >
              {"}"}
            </Typography>
          </Box>
          <Box
            my={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              my={1}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />

              <TextField
                fullWidth
                type="text"
                variant="standard"
                color="success"
                label="Usuario ou E-mail *"
                value={getUser}
                onChange={(event) => {
                  setUser(event.target.value);
                  if (event.target.value == "" || getPass == "") {
                    setDisable(true);
                  } else {
                    setDisable(false);
                  }
                }}
              />
            </Box>
            <Box
              my={1}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                type="password"
                variant="standard"
                color="success"
                label="Senha *"
                value={getPass}
                onChange={(event) => {
                  setPass(event.target.value);
                  if (getUser == "" || event.target.value == "") {
                    setDisable(true);
                  } else {
                    setDisable(false);
                  }
                }}
              />
            </Box>
          </Box>
          <Box my={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              disabled={disable}
              sx={{ width: "70%", borderRadius: "20px" }}
              onClick={(event) => {
                roteamento.push(`/home?user=${getUser}`);
              }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
