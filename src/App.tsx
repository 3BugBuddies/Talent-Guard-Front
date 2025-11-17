import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="Colaborador">
            <AdminLayout />
          </PrivateRoute>
        }
      >
      </Route>

      <Route element={<Layout />}>
        <Route path="/integrantes" element={<Team />} />
        <Route path="/contato" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
