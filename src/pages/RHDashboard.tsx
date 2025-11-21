import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Footer from "../components/Footer";
import CollaboratorsList from "../components/dashboard/CollaboratorsList";
import SalaryMatch from "../components/dashboard/SalaryMatch";
// 1. Importe o novo componente

// ... (outros imports, como o CareerMonitoring se houver)

type TabOption = "collaborators" | "salary-match"; // 2. Adicione a opção ao tipo

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
         {/* ... Header Code (Mantenha igual) ... */}
         <Container className="py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-700">Talent Guard | RH</h1>
            <button onClick={handleLogout} className="text-red-500">Sair</button>
         </Container>
      </header>

      <Container className="flex-grow py-8">
        {/* Navegação em Abas */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            
            <button
              onClick={() => setActiveTab("collaborators")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "collaborators"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Gestão de Colaboradores
            </button>

            {/* 3. Novo Botão da Aba */}
            <button
              onClick={() => setActiveTab("salary-match")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "salary-match"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Análise Salarial & Mercado
            </button>

          </nav>
        </div>

        {/* Área de Conteúdo Dinâmico */}
        <div className="animate-fadeIn">
          {activeTab === "collaborators" && <CollaboratorsList />}
          {/* 4. Renderização Condicional */}
          {activeTab === "salary-match" && <SalaryMatch />}
        </div>

      </Container>
      <Footer />
    </div>
  );
}