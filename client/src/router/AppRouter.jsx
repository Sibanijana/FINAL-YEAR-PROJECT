import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";
import LoginPage from "../components/Auth/LoginPage";
import AdminPage from "../pages/AdminPage";
import DepartmentPage from "../pages/DepartmentPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/department/:department_name"
            element={<DepartmentPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
