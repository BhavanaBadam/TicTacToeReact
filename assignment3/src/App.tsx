import {useState} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {Box, ThemeProvider} from '@mui/material';

import Home from "./pages/home";
import Assignment3 from "./pages/assignment3";
import Assignment4 from "./pages/assignment4";
import MutualFunds from "./pages/mutual-funds";
import Sidebar from "./components/sidebar";
import {AppTheme, lightTheme, darkTheme} from "./constants";


const Layout = () => {
  const [currentTheme, setTheme] = useState<AppTheme>(AppTheme.LIGHT);
  return <ThemeProvider theme={currentTheme === AppTheme.LIGHT ? lightTheme : darkTheme}>
    <Box sx={{display: 'flex'}}>
      <Box>
        <Sidebar currentTheme={currentTheme} setTheme={setTheme} />
      </Box>
      <Box width="100%">
        <Outlet />
      </Box>
    </Box>
  </ThemeProvider>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "mutual-funds",
        element: <MutualFunds />,
      },
      {
        path: "assignment-3",
        element: <Assignment3 />
      },
      {
        path: "assignment-4",
        element: <Assignment4 />
      }
    ],
  },
]);

function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App;
