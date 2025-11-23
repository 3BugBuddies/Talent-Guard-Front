import { EmployeeTO, SalaryAnalysisEnhanced, SalaryAnalysisTO, RiskClassification } from "../types";
import { BenchmarkService } from "./BenchmarkService";
import { apiRequest } from "./services";

export const SalaryAnalysisService = {
  analyzeEnhanced: async (
    employee: EmployeeTO
  ): Promise<SalaryAnalysisEnhanced> => {
    const benchmarks = await BenchmarkService.getAll();

    const match = benchmarks.find(
      (b) =>
        b.role.name.toLowerCase() === employee.role.name.toLowerCase() &&
        b.role.level === employee.role.level
    );

    const marketAvg = match ? match.averageSalary : employee.salary;
    const compaRatio = marketAvg > 0 ? employee.salary / marketAvg : 1.0;
    
    // Simulação de dados que não temos no banco ainda
    const performances = ["Médio", "Alto", "Top Performer", "Médio"];
    const performanceRating = performances[(employee.idEmployee ?? 1) % performances.length] as any;
    const lastIncreaseMonths = (employee.idEmployee ?? 1) * 4 + 2;

    let risk: RiskClassification = "ON_TARGET";
    let recommendation = "Salário alinhado com o mercado.";
    let suggestedRaise = 0;

    // --- LÓGICA DE NEGÓCIO ADAPTADA PARA O ENUM DO JAVA ---
    
    if (!match) {
        recommendation = "Sem benchmark vinculado.";
    } 
    // CASO 1: Salário Baixo (Risco de Evasão) -> BELOW_FLOOR
    else if (compaRatio < 0.85) {
        risk = "BELOW_FLOOR";
        recommendation = "Defasagem severa: Risco alto de turnover.";
        suggestedRaise = marketAvg - employee.salary;
    } 
    // CASO 2: Top Performer Ganhando Pouco -> BELOW_FLOOR (Mesmo que não esteja tão baixo, é risco)
    else if (performanceRating === "Top Performer" && compaRatio < 1.0) {
        risk = "BELOW_FLOOR";
        recommendation = "Risco Crítico: Top Talent abaixo da média de mercado.";
        suggestedRaise = (marketAvg * 1.1) - employee.salary; // Proposta agressiva
    }
    // CASO 3: Salário Muito Alto -> ABOVE_CEILING
    else if (compaRatio > 1.20) {
        risk = "ABOVE_CEILING";
        recommendation = "Acima do teto de mercado. Avaliar promoção ou congelamento.";
    }

    return {
      employee,
      benchmark: match || { 
          role: employee.role, 
          averageSalary: employee.salary, 
          floorSalary: employee.salary, 
          ceilingSalary: employee.salary 
      },
      recordedSalary: employee.salary,
      marketAverage: marketAvg,
      differencePercentage: match ? ((employee.salary - marketAvg) / marketAvg) * 100 : 0,
      risk,
      recommendation,
      compaRatio,
      percentile: compaRatio > 1.05 ? "Acima da Média" : compaRatio < 0.95 ? "Abaixo da Média" : "Na Média",
      replacementCost: employee.salary * 4.5,
      suggestedRaise: Math.max(0, suggestedRaise),
      performanceRating,
      lastIncreaseMonths,
    };
  },

  create: async (analysis: SalaryAnalysisEnhanced): Promise<SalaryAnalysisTO> => {
    if (!analysis.benchmark?.idBenchmark) throw new Error("Benchmark obrigatório");

    const payload: SalaryAnalysisTO = {
      employee: analysis.employee,
      benchmark: analysis.benchmark,
      recordedSalary: analysis.recordedSalary,
      marketAverage: analysis.marketAverage,
      risk: analysis.risk, // Agora envia BELOW_FLOOR, ON_TARGET ou ABOVE_CEILING
      analysisDate: new Date().toISOString().split("T")[0],
      differencePercentage: analysis.differencePercentage,
      recommendation: analysis.recommendation,
    };

    return await apiRequest<SalaryAnalysisTO>("/analysis", "POST", payload);
  },

  getAll: async (): Promise<SalaryAnalysisEnhanced[]> => {
    const data = await apiRequest<SalaryAnalysisTO[]>("/analysis", "GET");
    return data.map(SalaryAnalysisService.enhanceFromTO);
  },
  
  delete: async (id: number) => apiRequest<void>(`/analysis/${id}`, "DELETE"),

  enhanceFromTO: (to: SalaryAnalysisTO): SalaryAnalysisEnhanced => {
    const marketAvg = to.marketAverage || to.recordedSalary;
    const compaRatio = marketAvg > 0 ? to.recordedSalary / marketAvg : 1.0;
    
    // Recalcula sugestão de aumento baseada no Risco persistido
    let suggestedRaise = 0;
    if (to.risk === "BELOW_FLOOR") {
       // Se foi marcado como BELOW_FLOOR, sugerimos ajustar para a média
       suggestedRaise = Math.max(0, marketAvg - to.recordedSalary);
    }

    return {
      ...to,
      compaRatio,
      percentile: to.risk === "ABOVE_CEILING" ? "Acima do Teto" : to.risk === "BELOW_FLOOR" ? "Abaixo do Piso" : "Na Faixa",
      replacementCost: to.recordedSalary * 4.5,
      suggestedRaise,
      performanceRating: "Médio", // Mock visual
      lastIncreaseMonths: 12, // Mock visual
      // Mapeia o ENUM técnico para texto amigável na tela
      recommendation: to.recommendation || (
          to.risk === "BELOW_FLOOR" ? "Ação Necessária: Ajuste Salarial" :
          to.risk === "ABOVE_CEILING" ? "Monitorar custo" : 
          "Manter"
      )
    };
  },
};