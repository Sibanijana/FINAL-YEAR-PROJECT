import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";
import AdminPage from "../pages/AdminPage";
//import DepartmentPage from "../pages/DepartmentPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* <Route
            path="/department/:department_name"
            element={<DepartmentPage />}
          /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
