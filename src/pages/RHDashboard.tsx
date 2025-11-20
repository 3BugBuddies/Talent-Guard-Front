import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Footer from "../components/Footer";
import CollaboratorsList from "../components/dashboard/CollaboratorsList";
// import CareerMonitoring from "../components/dashboard/CareerMonitoring";

type TabOption = "collaborators" | "monitoring";

export default function RHDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabOption>("collaborators");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-outfit">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <Container className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary-700 tracking-tight">
              Talent Guard{" "}
              <span className="text-gray-400 font-light">| Portal RH</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Olá, <strong>Recrutador</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </Container>
      </header>

      <Container className="flex-grow py-8">
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("collaborators")}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === "collaborators"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              Lista de Colaboradores
            </button>

            <button
              onClick={() => setActiveTab("monitoring")}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === "monitoring"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              Monitoramento de Carreiras
            </button>
          </nav>
        </div>

        <div className="animate-fadeIn">
          {activeTab === "collaborators" ? (
            <CollaboratorsList />
          ) : (
            // <CareerMonitoring />
            <></>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
