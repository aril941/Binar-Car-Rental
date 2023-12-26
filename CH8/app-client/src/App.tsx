import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Login from "./pages/login";
import { theme } from "./config/theme";
import { CarList, CarCreate, CarUpdate, CarDetail } from "./pages/cars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CarList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <CarCreate />,
  },
  {
    path: "/update/:id",
    element: <CarUpdate />,
  },
  {
    path: "/detail/:id",
    element: <CarDetail />,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}