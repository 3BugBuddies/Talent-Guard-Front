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
const handleAddClick = () => setIsModalOpen(true);
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Tem certeza que deseja remover esta análise do histórico?"))
      return;

    try {
      await SalaryAnalysisService.delete(id);
      setAnalyses((prev) => prev.filter((a) => a.idSalaryAnalysis !== id));
      alert("Registro removido com sucesso.");
    } catch (error) {
      alert("Erro ao excluir registro.");
    }
  };



  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);

  // KPIs do Histórico
  const totalInvestimento = analyses.reduce(
    (acc, curr) => acc + curr.suggestedRaise,
    0
  );
  const riscosCriticos = analyses.filter(
    (a) => a.risk === "CRITICAL" || a.risk === "HIGH"
  ).length;

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Carregando histórico de análises...
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Nenhuma análise salva no histórico.</p>
        <p className="text-sm text-gray-400">
          Realize uma nova análise na aba "Análise Salarial" e clique em Salvar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cards de Resumo do Histórico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase">
            Total de Análises
          </p>
          <p className="text-2xl font-bold text-gray-800">{analyses.length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm">
          <p className="text-xs font-bold text-red-500 uppercase">
            Riscos Identificados
          </p>
          <p className="text-2xl font-bold text-red-700">{riscosCriticos}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-xs font-bold text-blue-500 uppercase">
            Gap Financeiro Total
          </p>
          <p className="text-2xl font-bold text-blue-700">
            {formatMoney(totalInvestimento)}
          </p>
        </div>
      </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          onClick={handleAddClick}
        >
          + Adicionar Colaborador
        </button>
      {/* Tabela de Histórico */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Histórico de Análises Salvas
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Colaborador
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Salário Atual
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Patamar
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyses.map((item) => (
                <tr key={item.idSalaryAnalysis} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.analysisDate
                      ? new Date(item.analysisDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.employee.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.employee.role.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatMoney(item.recordedSalary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full 
                      ${
                        item.risk === "CRITICAL"
                          ? "bg-red-100 text-red-800"
                          : item.risk === "HIGH"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(item.idSalaryAnalysis)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <CreateAnalysisModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={async (payload) => {
                // adapt modal payload to the service call; use a cast to bypass stricter typings if needed
                await SalaryAnalysisService.create(payload as unknown as any);
                // reload the history and close the modal after successful save
                await loadHistory();
                setIsModalOpen(false);
              }}
            />
        </div>
      </div>
    );
}
