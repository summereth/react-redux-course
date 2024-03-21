import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductPage from "../pages/ProductPage";
import PricingPage from "../pages/PricingPage";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../pages/AppLayout";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>List of cities</p>} />
            <Route path="cities" element={<p>List of cities</p>} />
            <Route path="countries" element={<p>List of countries</p>} />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
