import Inter from "../public/static/fonts/Inter.ttf";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import RootComponent from "./components/RootComponent";
import RootPage from "./components/RootPage";
import Home from "./components/bodyComponents/home/Home";
import Inventory from "./components/bodyComponents/inventory/Inventory";
import Customer from "./components/bodyComponents/customer/Customer";
import Revenue from "./components/bodyComponents/revenue/Revenue";
import Growth from "./components/bodyComponents/growth/Growth";
import Report from "./components/bodyComponents/report/Report";
import Setting from "./components/bodyComponents/Settings/Setting";
import Order from "./components/bodyComponents/order/Order";
import OrderModal from "./components/bodyComponents/order/OrderModal";
import BarcodeComponent from "../components/BarcodeComponent";
import PhysicalVerificationComponent from "../components/PhysicalVerificationComponent";
import NotFound from "./components/NotFound";

// React Router and routing components
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Define the custom theme for Material-UI
const theme = createTheme({
  spacing: 4,
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${Inter}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootComponent />}>
      <Route index element={<RootPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inventory/*" element={<Inventory />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/growth" element={<Growth />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/settings" element={<Setting />} />

      {/* Barcode and Physical Verification components */}
      <Route path="/barcode" element={<BarcodeComponent />} />
      <Route path="/physical-verification" element={<PhysicalVerificationComponent />} />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
