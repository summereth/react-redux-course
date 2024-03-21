import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductPage from "../pages/ProductPage";
import PricingPage from "../pages/PricingPage";
import PageNotFound from "../pages/PageNotFound";
import PageNav from "../components/PageNav";

function App() {
  return (
    <div>
      <BrowserRouter>
        <PageNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
