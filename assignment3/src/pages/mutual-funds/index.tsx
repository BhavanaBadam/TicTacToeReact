import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";

const MutualFunds = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", marginY: 2 }}>
        <Typography variant="h2">India Mutual Fund</Typography>
        <Typography>
          Powered by{" "}
          <Link target="_blank" href="https://www.mfapi.in/">
            mfapi
          </Link>
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Outlet />
    </Container>
  );
};

export { Searchfunc } from "./search";
export { Info } from "./info";
export default MutualFunds;
