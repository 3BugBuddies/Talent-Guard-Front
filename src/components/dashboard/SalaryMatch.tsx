import { SalaryAnalysisEnhanced } from "../../types";

interface SalaryMatchProps {
  data: SalaryAnalysisEnhanced;
}

export default function SalaryMatch({ data }: SalaryMatchProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case "CRITICAL": return "bg-red-50 border-red-200 text-red-700";
      case "HIGH": return "bg-orange-50 border-orange-200 text-orange-700";
      case "MEDIUM": return "bg-yellow-50 border-yellow-200 text-yellow-700";
      default: return "bg-green-50 border-green-200 text-green-700";
    }
  };

  return (
    <div className="space-y-6 animate-slideUp">
      
      {/* Header do Card */}
      <div className={`p-6 rounded-xl border ${getRiskStyles(data.risk)} flex justify-between items-center shadow-sm`}>
        <div>
          <h3 className="text-lg font-bold">Resultado da Análise: {data.employee.fullName}</h3>
          <p className="text-sm opacity-80">{data.employee.role.name} ({data.employee.role.level})</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wider">Classificação de Risco</p>
          <p className="text-2xl font-black">{data.risk}</p>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Comparativo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Comparativo Salarial</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold text-gray-800">{formatPercent(data.differencePercentage)}</span>
            <span className={`text-sm font-medium mb-1 ${data.differencePercentage >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {data.differencePercentage >= 0 ? "Acima" : "Abaixo"} do mercado
            </span>
          </div>
          {/* Barra de Progresso */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className={`h-full ${data.compaRatio >= 1 ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${Math.min(data.compaRatio * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
             <span>Salário: {formatCurrency(data.recordedSalary)}</span>
             <span>Média: {formatCurrency(data.marketAverage)}</span>
          </div>
        </div>

        {/* Sugestão de Aumento */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Ajuste Sugerido</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(data.suggestedRaise)}</p>
          <p className="text-xs text-gray-400 mt-2">Baseado na performance e defasagem.</p>
          {data.suggestedRaise > 0 && (
            <div className="mt-3 inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium border border-blue-100">
              Recomendado para retenção
            </div>
          )}
        </div>

        {/* Custo de Reposição */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Custo Estimado de Perda</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{formatCurrency(data.replacementCost)}</p>
          <p className="text-xs text-gray-400 mt-2">4.5x Salário (Recrutamento + Onboarding)</p>
        </div>
      </div>

      {/* Recomendação Textual */}
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
        <div className="flex gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-bold text-gray-200 text-sm uppercase mb-1">Recomendação da IA</h4>
            <p className="text-lg font-light leading-relaxed">"{data.recommendation}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}