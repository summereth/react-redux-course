import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
// import Homepage from "./pages/Homepage";
// import ProductPage from "./pages/ProductPage";
// import PricingPage from "./pages/PricingPage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import LoginPage from "./pages/LoginPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index path="/" element={<Homepage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                  path="app"
                  element={
                    <>
                      <ProtectedRoute />
                      <AppLayout />
                    </>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
