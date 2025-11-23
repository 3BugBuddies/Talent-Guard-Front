import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-background-dark-blue dark:text-yellow-400"
      aria-label="Alternar tema"
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === "light" ? (
        <Moon size={24} className="text-gray-700" />
      ) : (
        <Sun size={24} />
      )}
    </button>
  );
}