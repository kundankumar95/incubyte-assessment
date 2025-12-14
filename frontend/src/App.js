import Navbar from "./components/Navbar";
import LoginSignup from "./components/LoginSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Admin from "./components/Admin/Admin";
import AddProduct from "./components/Admin/AddProduct";
import ListProduct from "./components/Admin/ListProduct";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/cart" element={<Cart />} />

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/listproduct" element={<ListProduct />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
