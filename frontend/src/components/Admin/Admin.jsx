import Sidebar from "./Sidebar";
import "../../styles/admin.css";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import ListProduct from "./ListProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="admin/addproduct" element={<AddProduct />} />
          <Route path="admin/listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
