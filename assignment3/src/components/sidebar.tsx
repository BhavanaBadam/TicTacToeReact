import { Box, Divider, Typography, useTheme, Switch, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { AppTheme } from "../constants";

type Props = {
  currentTheme: AppTheme;
  setTheme: (newTheme: AppTheme) => void;
};

const Sidebar = (props: Props) => {
  const { currentTheme, setTheme } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "10vw",
        background: theme.palette.background.default,
        borderRight: 1,
      }}
    >
      <Stack textAlign="center" spacing={2}>
        <Box mt={4}>
          <Typography variant="h6">
            {currentTheme === AppTheme.LIGHT ? "Light Mode" : "Dark Mode"}
          </Typography>
          <Switch
            sx={{ margin: "auto" }}
            checked={currentTheme === AppTheme.LIGHT}
            onChange={(_, checked) => {
              setTheme(checked ? AppTheme.LIGHT : AppTheme.DARK);
            }}
          />
        </Box>

        <Link variant="h6" component={RouterLink} to="/">
          Home
        </Link>

        <Divider />
        <Typography variant="h5">Assignments</Typography>
        <Divider />

        <Link variant="h6" component={RouterLink} to="assignment-3">
          Assignment 3
        </Link>

        <Link variant="h6" component={RouterLink} to="assignment-4">
          Assignment 4
        </Link>

        <Link variant="h6" component={RouterLink} to="assignment-4">
          Assignment 5
        </Link>

        <Divider />
        <Typography variant="h5">Apps</Typography>
        <Divider />

        <Link variant="h6" component={RouterLink} to="mutual-funds">
          Mutual Funds
        </Link>
      </Stack>
    </Box>
  );
};

export default Sidebar;
