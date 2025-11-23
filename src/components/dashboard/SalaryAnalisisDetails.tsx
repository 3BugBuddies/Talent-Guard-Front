import { useEffect, useState } from "react";
import { SalaryAnalysisService } from "../../services/SalaryAnalysisService";
import { SalaryAnalysisEnhanced } from "../../types";
import CreateAnalysisModal from "../modals/CreateAnalysisModal";
import { DollarSign, AlertTriangle, BarChart2 } from "lucide-react";

export default function SalaryAnalysisDetails() {
  const [analyses, setAnalyses] = useState<SalaryAnalysisEnhanced[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await SalaryAnalysisService.getAll();
      setAnalyses(data);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm("Remover análise?")) return;
    try {
      await SalaryAnalysisService.delete(id);
      setAnalyses((prev) => prev.filter((a) => a.idSalaryAnalysis !== id));
    } catch (error) {
      alert("Erro ao excluir.");
    }
  };

  const formatMoney = (val: number | undefined | null) => {
    if (val === undefined || val === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  // KPIs
  const totalGap = analyses.reduce((acc, curr) => acc + (curr.suggestedRaise || 0), 0);
  const criticalCount = analyses.filter((a) => a.risk === "BELOW_FLOOR").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cards KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card */}
        <div className="bg-white dark:bg-dark-surface p-4 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
            <BarChart2 size={16} className="text-gray-400" />
            Total Analisado
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary mt-1">{analyses.length}</p>
        </div>

        <div className={`p-4 rounded-xl border shadow-sm ${criticalCount > 0 ? "bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800" : "bg-white border-gray-200 dark:bg-dark-surface dark:border-dark-border"}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className={`text-xs font-bold uppercase flex items-center gap-1 ${criticalCount > 0 ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}>
                <AlertTriangle size={16} />
                Abaixo do Piso
              </p>
              <p className={`text-2xl font-bold mt-1 ${criticalCount > 0 ? "text-red-700 dark:text-red-300" : "text-gray-800 dark:text-dark-text-primary"}`}>
                {criticalCount}
              </p>
              <p className={`text-xs mt-1 ${criticalCount > 0 ? "text-red-400" : "text-gray-400 dark:text-gray-500"}`}>
                Colaboradores em risco
              </p>
            </div>
          </div>
        </div>

        {/* Card de Investimento (Budget) */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm dark:bg-blue-900/20 dark:border-blue-800">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1">
            <DollarSign size={16} />
            Budget de Ajuste
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{formatMoney(totalGap)}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Nova Análise
        </button>
      </div>

      {/* Tabela de Histórico */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden border border-gray-100 dark:border-dark-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            
            {/* Cabeçalho da Tabela */}
            <thead className="bg-gray-50 dark:bg-dark-surface-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Colaborador</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Salário</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status (Backend)</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Ação</th>
              </tr>
            </thead>
            
            {/* Corpo da Tabela */}
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">Carregando...</td></tr>
              ) : analyses.map((item) => (
                <tr key={item.idSalaryAnalysis} className="hover:bg-gray-50 dark:hover:bg-dark-surface-hover transition-colors">
                  
                  {/* Data */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.analysisDate ? new Date(item.analysisDate).toLocaleDateString() : "-"}
                  </td>
                  
                  {/* Colaborador */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{item.employee?.fullName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.employee?.role?.name}</div>
                  </td>
                  
                  {/* Salário */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text-primary">
                    {formatMoney(item.recordedSalary)}
                    <div className="text-xs text-gray-400 dark:text-gray-500">Ref: {formatMoney(item.marketAverage)}</div>
                  </td>

                  {/* BADGE DE STATUS */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span 
                      className={`px-2 py-1 text-xs font-bold rounded-full border 
                      ${item.risk === "BELOW_FLOOR" 
                        ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800" 
                        : item.risk === "ABOVE_CEILING" 
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800" 
                        : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                      }`}
                    >
                      {item.risk === "BELOW_FLOOR" ? "ABAIXO DO PISO" :
                        item.risk === "ABOVE_CEILING" ? "ACIMA DO TETO" :
                          "NO ALVO"}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(item.idSalaryAnalysis)} 
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:underline transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {analyses.length === 0 && !loading && (
                <tr><td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">Nenhuma análise encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (payload) => {
          await SalaryAnalysisService.create(payload as unknown as any);
          await loadHistory();
        }}
      />
    </div>
  );
}