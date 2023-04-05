import {
  Box,
  Grid,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";

export const Info = () => {
  // param name is set in App.tsx
  const { code } = useParams();
  console.log(code);

  // TODO: convert this to a state, fetch data on page load, add loading indicator.
  // TODO: add type for `result`
  const result = {
    code: "1234",
    name: "Mutual Fund Name HERE",
    fundHouse: "Fund House HERE",
    schemeType: "Scheme Type HERE",
    data: [
      { date: new Date(2023, 4, 1), nav: 10.42 },
      { date: new Date(2023, 4, 2), nav: 11.3 },
      { date: new Date(2023, 4, 3), nav: 12.34 },
      { date: new Date(2023, 4, 4), nav: 10.98 },
    ],
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">{result.name}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">Fund House</Typography>
        </Grid>
        <Grid item xs={6}>
          TODO
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">Scheme Type</Typography>
        </Grid>
        <Grid item xs={6}>
          TODO
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>NAV</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {result.data.map((datum, idx) => (
              <TableRow key={idx}>
                <TableCell>{datum.date.toLocaleDateString()}</TableCell>
                <TableCell>{datum.nav}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
