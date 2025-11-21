import { useEffect, useState } from "react";
import { EmployeeService } from "../../services/EmployeeService";
import { SalaryAnalysisService } from "../../services/SalaryAnalysisService";
import { SalaryAnalysisTO } from "../../types";

export default function SalaryMatch() {
  const [analysisList, setAnalysisList] = useState<SalaryAnalysisTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Métricas para os Cards
  const [metrics, setMetrics] = useState({
    totalAnalyzed: 0,
    belowMarket: 0,
    highRisk: 0,
    avgDifference: 0,
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // 1. Busca todos os colaboradores
      const employees = await EmployeeService.getAll();

      // 2. Para cada colaborador, solicita a análise ao backend
      // Nota: Em produção real, o ideal seria um endpoint de "Bulk Analysis" no backend
      const analysisPromises = employees.map((emp) =>
        SalaryAnalysisService.analyzeEnhanced(emp)
      );

      const results = await Promise.all(analysisPromises);
      setAnalysisList(results);
      calculateMetrics(results);
    } catch (error) {
      console.error("Erro ao carregar análises:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (data: SalaryAnalysisTO[]) => {
    const belowMarketCount = data.filter((item) => item.differencePercentage < 0).length;
    const highRiskCount = data.filter(
      (item) => item.risk === "HIGH" || item.risk === "CRITICAL"
    ).length;

    // Média de defasagem/superávit
    const totalDiff = data.reduce((acc, curr) => acc + curr.differencePercentage, 0);
    const avgDiff = data.length > 0 ? totalDiff / data.length : 0;

    setMetrics({
      totalAnalyzed: data.length,
      belowMarket: belowMarketCount,
      highRisk: highRiskCount,
      avgDifference: avgDiff,
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Carregando análise de mercado...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- CARDS DE INFORMAÇÃO --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Total */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Colaboradores Analisados</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{metrics.totalAnalyzed}</p>
        </div>

        {/* Card 2: Abaixo do Mercado */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-400">
          <p className="text-sm font-medium text-gray-500">Salários Abaixo do Mercado</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{metrics.belowMarket}</p>
          <p className="text-xs text-gray-400 mt-1">Requer atenção moderada</p>
        </div>

        {/* Card 3: Risco de Saída */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm font-medium text-gray-500">Alto Risco de Saída (Churn)</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{metrics.highRisk}</p>
          <p className="text-xs text-gray-400 mt-1">Ação imediata recomendada</p>
        </div>

        {/* Card 4: Competitividade Geral */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Competitividade Geral</p>
          <p className={`text-3xl font-bold mt-2 ${metrics.avgDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.avgDifference > 0 ? "+" : ""}{formatPercent(metrics.avgDifference)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Média comparativa da empresa</p>
        </div>
      </div>

      {/* --- TABELA DE MATCH --- */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Detalhes da Análise Salarial</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Colaborador</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Salário Atual</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Média Mercado</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Recomendação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analysisList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.employee.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.employee.role.name} <span className="text-xs bg-gray-100 px-1 rounded">{item.employee.role.level}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(item.employee.salary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.marketAverage)}
                  </td>
                  
                  {/* Status Visual (Pill) */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border
                      ${item.risk === 'CRITICAL' || item.risk === 'HIGH' 
                        ? 'bg-red-100 text-red-800 border-red-200' 
                        : item.risk === 'MEDIUM'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-green-100 text-green-800 border-green-200'
                      }`}>
                      {item.differencePercentage > 0 ? "+" : ""}{formatPercent(item.differencePercentage)} ({item.risk})
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.recommendation}>
                    {item.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}