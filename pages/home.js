import React from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import Navigator from "../src/components/Navigator";
import Search from "../src/components/Search";
import Table from "../src/components/TableBranches";
import { AddCircle } from "@mui/icons-material";

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
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };

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
                    onClick={handleToggle}
                  >
                    ADICIONAR
                  </Button>
                </Grid>
              </Grid>
              <Table />
            </Container>
          </Navigator>
        </Box>
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle>{"SOBRE"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type="text"
                  variant="standard"
                  color="success"
                  label="Nome (Apelido) *"
                  sx={{ minWidth: "30vw" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  variant="standard"
                  color="success"
                  label="Cidade *"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              color="success"
              onClick={handleClose}
            >
              SALVAR
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
