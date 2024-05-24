import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Entry from "./pages/Entry"
import Setup from "./setup/Setup";
import Categories from './setup/Categories';
import Stores from "./setup/Stores";
import EditStore from "./setup/EditStore";
import { BottomNavigation, BottomNavigationAction, Container } from "@mui/material";
import { HomeOutlined, LocalAtm, Settings } from "@mui/icons-material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EditCategory from './setup/EditCategory';
import BudgetingPeriods from './setup/BudgetingPeriods';
import EditBudgetingPeriod from './setup/EditBudgetingPeriods';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entry",
    element: <Entry />
  },
  {
    path: "/setup",
    element: <Setup />
  },
  {
    path: "/setup/categories",
    element: <Categories />
  },
  {
    path: "/setup/categories/:id",
    element: <EditCategory />
  },
  {
    path: "/setup/stores",
    element: <Stores />
  },
  {
    path: "/setup/stores/:id",
    element: <EditStore />
  },
  {
    path: "/setup/budgetingperiods",
    element: <BudgetingPeriods />
  },
  {
    path: "/setup/budgetingperiods/:id",
    element: <EditBudgetingPeriod />
  }
]);

function App() {
  const [page, setPage] = useState("/");
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </Container>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<a href="/"><HomeOutlined /></a>} />
        <BottomNavigationAction label="Entry" icon={<a href="/entry"><LocalAtm /></a>} />
        <BottomNavigationAction label="Setup" icon={<a href="/setup"><Settings /></a>} />
      </BottomNavigation>
    </QueryClientProvider>
  );
}

export default App;
