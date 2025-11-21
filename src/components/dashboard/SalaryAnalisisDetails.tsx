import { useEffect, useState } from "react";
import { EmployeeService } from "../../services/EmployeeService";
import { SalaryAnalysisService } from "../../services/SalaryAnalysisService";
import { SalaryAnalysisEnhanced } from "../../types";

export default function SalaryAnalysisDetails() {
  const [analyses, setAnalyses] = useState<SalaryAnalysisEnhanced[]>([]);
  const [loading, setLoading] = useState(true);

  // KPI: Orçamento necessário para corrigir todos os riscos
  const totalBudgetGap = analyses.reduce((acc, curr) => acc + curr.suggestedRaise, 0);
  
  // KPI: Contagem de riscos
  const riskCount = analyses.filter(a => a.risk === "HIGH" || a.risk === "CRITICAL").length;
  
  // KPI: Média global de alinhamento (Compa-Ratio Médio)
  const avgCompaRatio = analyses.length > 0 
    ? (analyses.reduce((acc, curr) => acc + curr.compaRatio, 0) / analyses.length) * 100 
    : 0;

    useEffect(() => {
    const fetchData = async () => {
      try {
        const emps = await EmployeeService.getAll();
        const results = await Promise.all(emps.map(e => SalaryAnalysisService.analyzeEnhanced(e)));
        
        setAnalyses(results);
      } catch (error) {
        console.error("Erro ao carregar análises detalhadas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatMoney = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const formatPercent = (val: number) => `${val.toFixed(0)}%`;

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Processando inteligência salarial...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* --- SEÇÃO 1: KPIs ESTRATÉGICOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Budget de Retenção */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-6 text-white shadow-lg border border-blue-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-2 -translate-y-2">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
          </div>
          <h4 className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Budget Mensal Sugerido</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatMoney(totalBudgetGap)}</span>
          </div>
          <p className="text-xs text-blue-200 mt-2 font-light">
            Investimento necessário para corrigir disparidades salariais de talentos em risco.
          </p>
        </div>

        {/* Card 2: Risco de Talentos */}
        <div className="bg-white border-l-4 border-red-500 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Talentos em Risco Alto/Crítico</h4>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-4xl font-bold text-gray-800">{riskCount}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                 de {analyses.length} total
              </span>
            </div>
          </div>
          <p className="text-xs text-red-600 mt-3 font-semibold flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Requer plano de ação imediato.
          </p>
        </div>

        {/* Card 3: Competitividade Geral */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
             <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Competitividade Salarial</h4>
             <div className="mt-3 mb-1 flex justify-between items-end">
                <span className={`text-2xl font-bold ${avgCompaRatio >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {formatPercent(avgCompaRatio)}
                </span>
                <span className="text-xs text-gray-400 mb-1">da média de mercado</span>
             </div>
             {/* Barra Visual */}
             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
               <div 
                 className={`h-full rounded-full ${avgCompaRatio >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`} 
                 style={{ width: `${Math.min(avgCompaRatio, 100)}%` }}
               ></div>
             </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {avgCompaRatio < 95 
              ? "Sua empresa paga, em média, abaixo do mercado." 
              : "Sua empresa é competitiva na média geral."}
          </p>
        </div>
      </div>

      {/* --- SEÇÃO 2: TABELA DETALHADA DE INTELIGÊNCIA --- */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Diagnóstico Individual de Equidade</h3>
            <p className="text-xs text-gray-500">Cruza performance e salários para identificar inconsistências.</p>
          </div>
          <button className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 transition font-medium shadow-sm flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Exportar Relatório PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Talento & Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Alinhamento (Compa-Ratio)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Diagnóstico & Risco</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ação Sugerida</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyses.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                  
                  {/* Coluna 1: Dados do Colaborador */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{item.employee.fullName}</span>
                      <span className="text-xs text-gray-500">{item.employee.role.name}</span>
                      <span className="inline-flex items-center gap-1 mt-1">
                         <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 rounded">
                           {item.employee.role.level}
                         </span>
                         <span className="text-[10px] text-gray-400">
                           • {item.lastIncreaseMonths} meses s/ aumento
                         </span>
                      </span>
                    </div>
                  </td>

                  {/* Coluna 2: Performance (Simulada) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border shadow-sm
                      ${item.performanceRating === 'Top Performer' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                        item.performanceRating === 'Alto' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        item.performanceRating === 'Médio' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                      {item.performanceRating}
                    </span>
                  </td>

                  {/* Coluna 3: Visualização Compa-Ratio */}
                  <td className="px-6 py-4 w-64">
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-gray-700">{formatMoney(item.employee.salary)}</span>
                      <span className="text-gray-400 text-[10px]">Ref. Mercado: {formatMoney(item.marketAverage)}</span>
                    </div>
                    
                    {/* Barra de Progresso Customizada */}
                    <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      {/* Marcador de Média (100%) */}
                      <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10 left-1/2" title="Média de Mercado"></div>
                      
                      {/* Preenchimento */}
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.compaRatio < 0.85 ? 'bg-red-500' : 
                          item.compaRatio > 1.15 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(item.compaRatio * 50, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-1">
                      <span className={`text-[10px] font-bold ${item.compaRatio < 0.85 ? 'text-red-600' : 'text-gray-500'}`}>
                        {Math.round(item.compaRatio * 100)}%
                      </span>
                      <span className="text-[10px] text-gray-400 italic">{item.percentile}</span>
                    </div>
                  </td>

                  {/* Coluna 4: Risco e Recomendação */}
                  <td className="px-6 py-4">
                     {item.risk === 'CRITICAL' && (
                       <div className="flex items-center text-red-600 text-xs font-bold mb-1">
                         <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                         ALTO RISCO DE PERDA
                       </div>
                     )}
                     {item.risk === 'HIGH' && <span className="text-orange-600 text-xs font-bold block mb-1">Risco Elevado</span>}
                     {item.risk === 'MEDIUM' && <span className="text-yellow-600 text-xs font-bold block mb-1">Risco Moderado</span>}
                     {item.risk === 'LOW' && <span className="text-green-600 text-xs font-bold block mb-1">Risco Baixo</span>}
                     
                     <p className="text-[11px] text-gray-500 leading-tight max-w-[180px]">
                       {item.recommendation}
                     </p>
                  </td>

                  {/* Coluna 5: Ação (Financeira) */}
                  <td className="px-6 py-4 text-right">
                    {item.suggestedRaise > 0 ? (
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Ajuste Sugerido</span>
                        <span className="text-sm font-bold text-green-600">+{formatMoney(item.suggestedRaise)}</span>
                        <button 
                          onClick={() => alert(`Ação disparada: Solicitação de ajuste para ${item.employee.fullName}`)}
                          className="mt-1.5 bg-gray-900 hover:bg-black text-white text-[10px] font-medium px-2.5 py-1 rounded transition-colors shadow-sm"
                        >
                          Aplicar Ajuste
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end opacity-50">
                        <span className="text-xs text-gray-400 italic">Nenhuma ação</span>
                        <span className="text-xs text-green-600 font-medium">✓ Em dia</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SEÇÃO 3: INSIGHT DE IMPACTO FINANCEIRO (Footer) --- */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-orange-100 rounded-full text-orange-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h5 className="text-sm font-bold text-orange-900">Análise de Custo de Perda (Churn Cost)</h5>
          <p className="text-sm text-orange-800 mt-1 leading-relaxed">
            Identificamos <strong>{riskCount} colaboradores-chave</strong> com alto risco de saída. 
            Se esses talentos deixarem a empresa, o custo estimado de reposição (Recrutamento + Onboarding + Perda de Produtividade) 
            será de aproximadamente <span className="font-bold underline decoration-orange-400">{formatMoney(analyses.filter(a => a.risk === 'CRITICAL' || a.risk === 'HIGH').reduce((acc, curr) => acc + curr.replacementCost, 0))}</span>.
          </p>
          <p className="text-xs text-orange-700 mt-2 font-medium">
            Insight: O investimento em ajustes salariais ({formatMoney(totalBudgetGap)}) representa apenas uma fração do custo de perder esses talentos.
          </p>
        </div>
      </div>

    </div>
  );
}