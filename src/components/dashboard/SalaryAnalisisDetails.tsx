import { useEffect, useState } from "react";
import { SalaryAnalysisService } from "../../services/SalaryAnalysisService";
import { SalaryAnalysisEnhanced } from "../../types";
import CreateAnalysisModal from "../modals/CreateAnalysisModal";

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
    if (!id || !confirm("Remover análise?")) return;
    try {
      await SalaryAnalysisService.delete(id);
      setAnalyses((prev) => prev.filter((a) => a.idSalaryAnalysis !== id));
    } catch (error) {
      alert("Erro ao excluir.");
    }
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // KPIs baseados no ENUM DO BACKEND
  const totalGap = analyses.reduce((acc, curr) => acc + (curr.suggestedRaise || 0), 0);

  // BELOW_FLOOR = Risco Crítico para nós
  const criticalCount = analyses.filter((a) => a.risk === "BELOW_FLOOR").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cards KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase">Total Analisado</p>
          <p className="text-2xl font-bold text-gray-800">{analyses.length}</p>
        </div>

        {/* Card de Risco */}
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-red-500 uppercase">Abaixo do Piso</p>
              <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
              <p className="text-xs text-red-400">Colaboradores em risco</p>
            </div>
          </div>
        </div>

        {/* Card de Investimento */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-xs font-bold text-blue-500 uppercase">Budget de Ajuste</p>
          <p className="text-2xl font-bold text-blue-700">{formatMoney(totalGap)}</p>
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

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Colaborador</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Salário</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status (Backend)</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="p-4 text-center">Carregando...</td></tr>
              ) : analyses.map((item) => (
                <tr key={item.idSalaryAnalysis} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.analysisDate ? new Date(item.analysisDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.employee?.fullName}</div>
                    <div className="text-xs text-gray-500">{item.employee?.role?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatMoney(item.recordedSalary)}
                    <div className="text-xs text-gray-400">Ref: {formatMoney(item.marketAverage)}</div>
                  </td>

                  {/* BADGE COM ENUM CORRETO */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full border ${item.risk === "BELOW_FLOOR" ? "bg-red-100 text-red-800 border-red-200" :
                        item.risk === "ABOVE_CEILING" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-green-100 text-green-800 border-green-200"
                      }`}>
                      {item.risk === "BELOW_FLOOR" ? "ABAIXO DO PISO" :
                        item.risk === "ABOVE_CEILING" ? "ACIMA DO TETO" :
                          "NO ALVO"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(item.idSalaryAnalysis)} className="text-red-600 hover:underline">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
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