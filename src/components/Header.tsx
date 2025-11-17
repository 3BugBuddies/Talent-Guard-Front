import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import MyAccount from "./ui/MyAccount";
import Container from "./ui/Container";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Quem Somos", href: "/integrantes" },
    { name: "Info e contato", href: "/contato" },
  ];

  const user = { role: "Paciente", idPaciente: 46 };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background-light-blue shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/img/Elo-Logotipo.png"
                alt="Talent Guard Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-lg font-bold uppercase transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-background-dark-blue hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
           
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-background-dark-blue hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button> <MyAccount />
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background-dark-blue rounded-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-bold uppercase transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary-400 bg-primary-900/20"
                      : "text-white hover:text-primary-400 hover:bg-primary-900/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
