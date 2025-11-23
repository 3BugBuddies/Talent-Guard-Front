import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
export default function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quem Somos", href: "/integrantes" },
    { name: "Info e contato", href: "/contato" }
  ];
  const { theme } = useTheme();

  const githubIconSrc = 
    theme === 'dark'
      ? './img/github-mark-white.svg'
      : './img/github-mark.svg';

  return (
    <footer className="w-full bg-white dark:bg-dark-surface px-6 py-4 flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex justify-center md:justify-start mb-4 md:mb-0">
        <Link to="/">
          <img
            src="/img/logo-transp-2.png"
            alt="Talent Guard Logo"
            className="w-24 h-auto"
          />
        </Link>
      </div>

      <div className="flex flex-col sm:space-x-8 text-center text-indigo-950 dark:text-dark-text-primary text-base font-normal font-['Lato'] mb-4 md:mb-0">
        <nav className="flex flex-wrap justify-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-background-dark-blue dark:text-dark-text-primary hover:text-primary-600 font-bold uppercase text-lg transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="text-center text-indigo-950 dark:text-dark-text-secondary text-[10px] font-medium">
          © 2025 Talent Guard. Todos direitos reservados.
        </div>
      </div>

      <div className="flex justify-center md:justify-end space-x-2 mt-4 md:mt-0">
        <a
          href="https://github.com/3BugBuddies/Talent-Guard-Front"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors duration-200"
          aria-label="GitHub"
        >
          <img src={githubIconSrc} alt="GitHub" className="w-6 h-6"/>
        </a>

        {/* 
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors duration-200"
          aria-label="YouTube"
        >
          <img src="./img/youtube.png" alt="YouTube"/>
        </a> */}
      </div>
    </footer>
  );
}