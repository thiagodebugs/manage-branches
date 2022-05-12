import React from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import Navigator from "../src/components/Navigator";
import Search from "../src/components/Search";
import Table from "../src/components/Table";
import { AddCircle, Delete } from "@mui/icons-material";

export default function HomePage() {
  const roteamento = useRouter();
  const user = roteamento.query.user;
  if (!user) {
    React.useEffect(() => {
      roteamento.push("/");
    });
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  } else {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navigator>
            <Container>
              <Typography variant="h6" noWrap component="div">
                Lista de Filiais
              </Typography>
              <Grid
                container
                spacing={2}
                my={1}
                mx={"auto"}
                sx={{ alignItems: "center" }}
              >
                <Grid item xs={10}>
                  <Search />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddCircle />}
                  >
                    ADICIONAR
                  </Button>
                </Grid>
              </Grid>
              <Table />
            </Container>
          </Navigator>
        </Box>
      </>
    );
  }
}
