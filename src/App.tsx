import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import BenchmarkForm from "./components/forms/BenchmarkForm";
import RHDashboard from "./pages/RHDashboard";
import AdminBenchmarks from "./pages/admin/AdminBenchmarks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/benchmarks"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <AdminBenchmarks />
          </PrivateRoute>
        }
      />

      <Route
        path="/rh-dashboard"
        element={
          <PrivateRoute requiredRole="RH_USER">
            <RHDashboard />
          </PrivateRoute>
        }
      />

      <Route element={<Layout />}>
        {/* <Route path="/integrantes" element={<Team />} />
        <Route path="/contato" element={<Contact />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
