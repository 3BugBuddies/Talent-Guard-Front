import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

import BenchmarkForm from "./components/forms/BenchmarkForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/benchmark-form"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <BenchmarkForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/rh-dashboard"
        element={
          <PrivateRoute requiredRole="RH_USER">
            <BenchmarkForm />
            {/* trocar para o dashboard*/}
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
