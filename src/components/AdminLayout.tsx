import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserTO } from "../types";
import Container from "./ui/Container";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  let user: UserTO | null = null;
  if (userString) {
    try {
      user = JSON.parse(userString) as UserTO;
    } catch (e) {
      console.error("Erro ao ler dados do usuário logado.");
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Colaborador", path: "/admin/colaborador" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background-light-blue">
      <header className="bg-background-light-blue shadow-md sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <img
                src="/img/Elo-Logotipo.png"
                alt="Talent Guard Logo"
                className="h-20 w-auto"
              />
            </div>
          </div>
        </Container>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-background-dark-blue text-white flex flex-col overflow-y-auto">
          <div className="p-6 text-center text-2xl font-bold">
            Talent Guard Admin
          </div>
          <nav className="flex-grow p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-blue-700 text-blue-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-blue-600 text-center gap-4 flex flex-col">
            <p className="text-sm font-semibold truncate">
              {user?.nomeCompleto || "Colaborador"}
            </p>
            <button
              onClick={handleLogout}
              className="w-full mt-2 text-sm bg-red-700 hover:bg-red-700 text-white py-1 rounded transition duration-150"
            >
              Sair
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
