import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Users, Info, LayoutDashboard, Briefcase, BarChart3 } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle"; 

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const adminLinks = [
    { label: "Visão Geral", path: "/admin", icon: <LayoutDashboard size={20} />, exact: true },
    { label: "Gestão de Cargos", path: "/admin/roles", icon: <Briefcase size={20} /> },
    { label: "Benchmarks", path: "/admin/benchmarks", icon: <BarChart3 size={20} /> },
  ];

  const publicLinks = [
    { label: "Quem Somos", path: "/integrantes", icon: <Users size={20} /> },
    { label: "Info e Contato", path: "/contato", icon: <Info size={20} /> },
  ];

  const isActive = (path: string, exact = false) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  const NavLink = ({ item }: { item: any }) => (
    <Link
      to={item.path}
      onClick={() => setIsSidebarOpen(false)}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 group ${
        isActive(item.path, item.exact)
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-white"
      }`}
    >
      <span className={`${isActive(item.path, item.exact) ? "text-white" : "text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white"}`}>
        {item.icon}
      </span>
      <span className="ml-3">{item.label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg font-outfit flex flex-col md:flex-row transition-colors duration-300">
      
      {/* --- MOBILE HEADER (Visível apenas em telas pequenas) --- */}
      <div className="md:hidden bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border p-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2">
           <img src="/img/logo-transp.png" alt="Talent Guard" className="h-8 w-auto" />
           <span className="font-bold text-gray-800 dark:text-white">Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 dark:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- OVERLAY (Fundo escuro quando menu mobile abre) --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`
          fixed md:sticky md:top-0 inset-y-0 left-0 z-50 w-64 
          bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Area (Desktop) */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-dark-border">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/img/logo-transp.png" 
              alt="Talent Guard Logo" 
              className="h-10 w-auto" 
            />
             {/* Texto opcional se o logo não tiver nome */}
             {/* <span className="font-bold text-xl text-gray-900 dark:text-white">TalentGuard</span> */}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          
          {/* Grupo: Admin */}
          <div>
            <p className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Administração
            </p>
            <div className="space-y-1">
              {adminLinks.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* Grupo: Institucional */}
          <div>
            <p className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Institucional
            </p>
            <div className="space-y-1">
              {publicLinks.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer Sidebar (Logout + Dark Mode) */}
        <div className="p-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface-hover">
          <div className="flex items-center justify-between gap-2 mb-4">
             <span className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-2">Tema</span>
             <ThemeToggle />
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-colors"
          >
            <LogOut size={18} />
            Sair do Sistema
          </button>
        </div>
      </aside>
      
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen bg-gray-50 dark:bg-dark-bg p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}