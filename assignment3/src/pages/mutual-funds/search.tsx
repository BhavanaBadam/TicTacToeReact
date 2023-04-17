import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search } from '@mui/icons-material';
import { sleep } from "../../utils";

type SearchResult = {
  code: string;
  name: string;
};

interface SearchResponse {
  schemeCode: string;
  schemeName: string;
}

export const Searchfunc = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [emptyResult, setEmptyResult] = useState("No Results!");
  const [searchWord, setSearchWord] = useState("");

  const location = useLocation();

  useEffect(() => {
    setEmptyResult("Search for an Item!");
  }, [])

  const openFirstResult = async (searchWord: string) => {
    console.log(searchWord);
    let resultList = await getSearchResults(searchWord);
    let firstResult = resultList?.at(0)?.code;
    console.log(location.pathname);
    if (firstResult) {
      //console.log(firstResult);
      window.location.href = location.pathname + "/" + firstResult;
    }
  }

  const searchResults = async (searchWord: string) => {
    setIsSearching(true);
    try {
      // API is too fast sometimes. sleep to show loading state
      await sleep(500);

      const res = await getSearchResults(searchWord);
      //console.log(res);
      setResults(res);
    } catch (e) {
      console.error("Failed to search for mutual funds", e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getSearchResults = async (searchWord: string) => {
    console.log("searchWord: " + searchWord);
    const resp = await axios.get("https://api.mfapi.in/mf/search", {
      params: {
        q: searchWord,
      },
    });

    const json = await resp.data;

    if (json.length === 0) {
      setEmptyResult("No Results!")
    }
    console.log(json);

    let resultSet: SearchResult[] = [];

    json.forEach((searchLine : SearchResponse) => {
      let searchResult: SearchResult = {
        code: searchLine.schemeCode,
        name: searchLine.schemeName,
      };
      resultSet.push(searchResult);
    });
    console.log(resultSet);

/*    
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
  */
    return resultSet;
  }

  return (
    <Box width="100%">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField 
            placeholder="Search..."
            fullWidth 
            onChange={e => setSearchWord(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                  <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Button
            size="large"
            fullWidth
            variant="contained"
            onClick={() => searchResults(searchWord)}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button 
            size="large" 
            fullWidth 
            variant="contained"
            onClick={() => openFirstResult(searchWord)}>
            I'm feeling lucky
          </Button>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        {isSearching ? (
          <CircularProgress size="10vw" />
        ) : results.length === 0 ? (
          <Typography>{emptyResult}</Typography>
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
