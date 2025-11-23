import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "./ui/Container";
import ThemeToggle from "./ui/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigation = [
    { name: "Quem Somos", href: "/integrantes" },
    { name: "Info e contato", href: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background-light-blue dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <Container>
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <img
                  src="/img/logo-transp-3.png"
                  alt="Talent Guard Logo"
                  className="h-20 w-auto"
                />
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-dark-text-primary">
              Talent Guard | RH
            </h2>



          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-base font-bold uppercase transition-colors duration-200 ${isActive(item.href)
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-background-dark-blue dark:text-gray-200 hover:text-primary-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <button onClick={handleLogout} className="text-red-500 font-bold uppercase text-base">Sair</button>
            <div className="ml-4 border-l pl-4 border-gray-300 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu controls */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-background-dark-blue dark:text-white hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background-dark-blue dark:bg-gray-800 rounded-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-bold uppercase transition-colors duration-200 ${isActive(item.href)
                    ? "text-primary-400 bg-primary-900/20"
                    : "text-white hover:text-primary-400 hover:bg-primary-900/10"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <button onClick={handleLogout} className="px-3 py-2 text-red-500 font-bold uppercase text-base">Sair</button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}