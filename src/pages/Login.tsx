import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

interface UserData {
  id: number;
  nomeCompleto: string;
  email: string;
  role: "ADMIN" | "RH_USER";
  token: string;
}

const ADMIN_DATA = {
  email: "admin@global.com",
  password: "admin",
  info: {
    id: 1,
    nomeCompleto: "Administrador do Sistema",
    role: "ADMIN" as const,
    email: "admin@global.com",
    token: "fake-admin-token-xyz",
  },
};

const RH_DATA = {
  email: "rh@global.com",
  password: "rhuser",
  info: {
    id: 2,
    nomeCompleto: "Analista de Recursos Humanos",
    role: "RH_USER" as const,
    email: "rh@global.com",
    token: "fake-rh-token-abc",
  },
};

type UserRole = "ADMIN" | "RH_USER";

export default function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>("ADMIN");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      let authenticatedUser: UserData | null = null;

      if (selectedRole === "ADMIN") {
        if (email === ADMIN_DATA.email && password === ADMIN_DATA.password) {
          authenticatedUser = ADMIN_DATA.info;
        } else {
          throw new Error("Credenciais de Administrador inválidas.");
        }
      } else if (selectedRole === "RH_USER") {
        if (email === RH_DATA.email && password === RH_DATA.password) {
          authenticatedUser = RH_DATA.info;
        } else {
          throw new Error("Credenciais de RH inválidas.");
        }
      }

      if (authenticatedUser) {
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        localStorage.setItem("token", authenticatedUser.token);
        localStorage.setItem("userRole", authenticatedUser.role);

        if (authenticatedUser.role === "ADMIN") {
          navigate("/admin/benchmarks", { replace: true });
        } else {
          navigate("/rh-dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido durante o login."
      );
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = () => {
    if (selectedRole === "ADMIN") {
      setEmail(ADMIN_DATA.email);
      setPassword(ADMIN_DATA.password);
    } else {
      setEmail(RH_DATA.email);
      setPassword(RH_DATA.password);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Acesso ao Sistema
          </h2>
          <p className="text-gray-500 mt-2">Selecione seu perfil de acesso</p>
        </div>

        <div className="flex rounded-md bg-gray-200 p-1 mb-6">
          <button
            type="button"
            onClick={() => {
              setSelectedRole("ADMIN");
              setError("");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedRole === "ADMIN"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Administrador
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole("RH_USER");
              setError("");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedRole === "RH_USER"
                ? "bg-white text-purple-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Recursos Humanos
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail Corporativo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder={
                selectedRole === "ADMIN" ? "admin@global.com" : "rh@global.com"
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md shadow-md text-white text-lg font-semibold transition-all transform hover:-translate-y-0.5 ${
              selectedRole === "ADMIN"
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading
              ? "Autenticando..."
              : `Entrar como ${selectedRole === "ADMIN" ? "Admin" : "RH"}`}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-400 uppercase tracking-wide mb-2">
            Dados para Teste (Mock)
          </p>
          <div
            onClick={fillCredentials}
            className="bg-gray-50 p-3 rounded border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors text-center"
            title="Clique para preencher automaticamente"
          >
            <p className="font-mono">
              <span className="font-bold">User:</span>{" "}
              {selectedRole === "ADMIN" ? ADMIN_DATA.email : RH_DATA.email}
            </p>
            <p className="font-mono mt-1">
              <span className="font-bold">Pass:</span>{" "}
              {selectedRole === "ADMIN"
                ? ADMIN_DATA.password
                : RH_DATA.password}
            </p>
            <p className="mt-2 text-blue-500 text-[10px] font-bold">
              (Clique aqui para preencher)
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
