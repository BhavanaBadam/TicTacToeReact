import { useState, useEffect } from "react";
import axios from "axios";

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
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

type MutualFund = {
  code: number;
  name: string;
  fundHouse: string;
  schemeType: string;
  data: {
    date: string;
    nav: number;
  }[];
}

interface ResponseData {
  data: {
    date: string;
    nav: number;
  }[];
  meta: {
    fund_house: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
    scheme_type: string;
  };
  status: string;
}

export const Info = () => {
  const [isSearching, setIsSearching] = useState<boolean>(true);

  // param name is set in App.tsx
  const { code } = useParams();
  console.log(code);

  const [result, setResult] = useState<MutualFund>({
    code: Number(code),
    name: "",
    fundHouse: "",
    schemeType: "",
    data: []
  });

  useEffect(() => {
		getMutualFundInfo(); 
	}, []);

/*
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
  */


  const getMutualFundInfo = async () => {
    const resp = await axios.get("https://api.mfapi.in/mf/" + code, {
      params: {
      },
    }); 
    const respData: ResponseData = resp.data;
    //console.log(respData);
    let fundData: MutualFund = {
      code: respData.meta.scheme_code,
      name: respData.meta.scheme_name,
      fundHouse: respData.meta.fund_house,
      schemeType: respData.meta.scheme_type,
      data: respData.data.slice(),
    }
    setResult(fundData);   
    setIsSearching(false);
  }

  return (
    <Box>
      {isSearching ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size="10vw" />
          </div>
        ) :
      (<Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{result.name}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Fund House</Typography>
          </Grid>
          <Grid item xs={6}>
            {result.fundHouse}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Scheme Type</Typography>
          </Grid>
          <Grid item xs={6}>
            {result.schemeType}
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
                  <TableCell>{datum.date}</TableCell>
                  <TableCell>{datum.nav}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>)}
    </Box>
    );
};
