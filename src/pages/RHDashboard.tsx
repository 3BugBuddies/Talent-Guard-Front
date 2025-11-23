import { useState } from "react";
import Container from "../components/ui/Container";
import Footer from "../components/Footer";
import CollaboratorsList from "../components/dashboard/CollaboratorsList";
import SalaryAnalysisDetails from "../components/dashboard/SalaryAnalisisDetails";
import Header from "../components/Header";

type TabOption = "collaborators" | "salary-match";

export default function RHDashboard() {
  const [activeTab, setActiveTab] = useState<TabOption>("collaborators");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg font-outfit">
      <header className="bg-white dark:bg-dark-surface shadow-sm sticky top-0 z-10">
        <Header />
      </header>

      <Container className="flex-grow py-8">
        <h1 className="text-2xl font-bold text-primary-700 dark:text-dark-text-primary">
          Talent Guard | RH
        </h1>

        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("collaborators")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "collaborators"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
            >
              Gestão de Colaboradores
            </button>
            <button
              onClick={() => setActiveTab("salary-match")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "salary-match"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
            >
              Análise Salarial & Mercado
            </button>
          </nav>
        </div>
        <div className="animate-fadeIn">
          {activeTab === "collaborators" && <CollaboratorsList />}
          {activeTab === "salary-match" && <SalaryAnalysisDetails />}
        </div>
      </Container>
      <Footer />
    </div>
  );
}