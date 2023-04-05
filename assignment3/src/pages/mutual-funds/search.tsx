import { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Grid,
  Button,
  Link,
  List,
  ListItem,
} from "@mui/material";

import { sleep } from "../../utils";

type SearchResult = {
  code: string;
  name: string;
};

export const Search = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchResults = async (searchWord: string) => {
    setIsSearching(true);
    try {
      // API is too fast sometimes. sleep to show loading state
      await sleep(500);

      const resp = await axios.get("https://api.mfapi.in/mf/search", {
        params: {
          q: "nippon",
        },
      });

      // TODO: parse this from the `resp`
      const res = [
        {
          code: "100522",
          name: "Franklin India Technology Fund-Growth",
        },
        {
          code: "101160",
          name: "SBI MAGNUM DEBT FUND SERIES - 60 DAYS - 2 - GROWTH",
        },
        {
          code: "119778",
          name: "Kotak Global Emerging Market Fund - Payout of Income Distribution cum capital withdrawal option - Direct",
        },
      ];
      setResults(res);
    } catch (e) {
      console.error("Failed to search for mutual funds", e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Box width="100%">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField fullWidth />
        </Grid>

        <Grid item xs={6}>
          <Button
            size="large"
            fullWidth
            variant="contained"
            onClick={() => searchResults("TODO: get this from text field")}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button size="large" fullWidth variant="contained">
            I'm feeling lucky
          </Button>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        {isSearching ? (
          <CircularProgress size="10vw" />
        ) : results.length === 0 ? (
          <Typography>No results!</Typography>
        ) : (
          <Box textAlign="end">
            <Typography>Found {results.length} results</Typography>
            <List>
              {results.map((res) => (
                <ListItem key={res.code}>
                  <Link component={RouterLink} to={res.code}>
                    {res.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};
