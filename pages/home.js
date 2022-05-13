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
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dW91a3Rsc3ZreWlkdmd4eGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzODY3ODUsImV4cCI6MTk2Nzk2Mjc4NX0.LPOVOLtutfN9eoSg9gEarHY-T7WTXWVQahwTF3MmiA8";
const SUPABASE_URL = "https://jzuouktlsvkyidvgxxjm.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function refreshTable(addRow) {
  return supabaseClient
    .from("filiais")
    .on("*", (resposta) => {
      addRow(resposta.new);
    })
    .subscribe();
}

export default function HomePage() {
  const roteamento = useRouter();
  const user = roteamento.query.user;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branchName, setBranchName] = React.useState("");
  const [branchCity, setBranchCity] = React.useState("");
  const [disable, setDisable] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  // if (!user) {
  //   React.useEffect(() => {
  //     roteamento.push("/");
  //   });
  //   return (
  //     <Box
  //       sx={{
  //         width: "100vw",
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <CircularProgress color="success" />
  //     </Box>
  //   );
  // }

  function handleNewBranch() {
    const branch = {
      name: branchName,
      city: branchCity,
    };
    supabaseClient.from("filiais").insert([branch]).then();
    setBranchName("");
    setBranchCity("");
    setDisable(true);
  }

  function handleRemoveBranch() {
    const branch = {
      name: branchName,
      city: branchCity,
    };
    supabaseClient.from("filiais").delete([branch]).then();
  }

  const handleClose = () => {
    setBranchName("");
    setBranchCity("");
    setDisable(true);
    setOpenDialog(false);
  };

  const handleToggle = () => {
    setOpenDialog(!openDialog);
  };

  React.useEffect(() => {
    supabaseClient
      .from("filiais")
      .select("*")
      .then(({ data }) => {
        setRows(data);
      });
    refreshTable((newRow) => {
      setRows((rows) => {
        return [...rows, newRow];
      });
    });
  }, []);

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
            <Table rows={rows} />
          </Container>
        </Navigator>
      </Box>
      <Dialog maxWidth="md" open={openDialog} onClose={handleClose}>
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
                value={branchName}
                sx={{ minWidth: "30vw" }}
                onChange={(event) => {
                  setBranchName(event.target.value);
                  if (branchCity == "" || event.target.value == "") {
                    setDisable(true);
                  } else {
                    setDisable(false);
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="text"
                variant="standard"
                color="success"
                label="Cidade *"
                value={branchCity}
                onChange={(event) => {
                  setBranchCity(event.target.value);
                  if (branchName == "" || event.target.value == "") {
                    setDisable(true);
                  } else {
                    setDisable(false);
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="success"
            disabled={disable}
            onClick={() => {
              handleNewBranch();
            }}
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
