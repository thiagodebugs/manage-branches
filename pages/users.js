import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Search from "../src/components/Search";
import Table from "../src/components/TableUsers";
import Navigator from "../src/components/Navigator";
import { AddCircle } from "@mui/icons-material";

export default function UsersPage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navigator>
          <Container>
            <Typography variant="h6" noWrap component="div">
              Lista de Usuários
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
