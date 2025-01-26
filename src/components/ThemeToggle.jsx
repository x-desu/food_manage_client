import { useAuth } from "../../context/userContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={toggleTheme}
        className="bg-orange-500 text-white p-4 rounded-full relative flex items-center justify-center dark:bg-neutral-800"
        aria-label="Toggle Theme"
      >
        {/* Moon Icon */}
        <Moon
          className={`absolute  transition-opacity duration-500 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
          size={24}
        />

        {/* Sun Icon */}
        <Sun
          className={`absolute   transition-opacity duration-500 ${
            theme === "light" ? "opacity-100" : "opacity-0"
          }`}
          size={24}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
