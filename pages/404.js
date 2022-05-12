import React from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

export default function Custom404() {
  const roteamento = useRouter();
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
}
