import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import RHDashboard from "./pages/RHDashboard";
import AdminBenchmarks from "./pages/admin/AdminBenchmarks";
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminRoles from "./pages/admin/AdminRoles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="roles" element={<AdminRoles />} />
        <Route path="benchmarks" element={<AdminBenchmarks />} />{" "}
      </Route>

      <Route
        path="/rh-dashboard"
        element={
          <PrivateRoute requiredRole="RH_USER">
            <RHDashboard />
          </PrivateRoute>
        }
      />

      <Route element={<Layout />}>
        <Route path="/integrantes" element={<Team />} />
        <Route path="/contato" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
