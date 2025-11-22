import { EmployeeTO, SalaryAnalysisEnhanced, SalaryAnalysisTO } from "../types";
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

    const performances = ["Médio", "Alto", "Top Performer", "Médio"];
    const performanceRating = performances[
      (employee.idEmployee ?? 1) % performances.length
    ] as any;
    const lastIncreaseMonths = (employee.idEmployee ?? 1) * 4 + 2;

    const compaRatio = employee.salary / marketAvg;
    const safeCompaRatio = match ? compaRatio : 1.0;
    const replacementCost = employee.salary * 4.5;

    let suggestedRaise = 0;
    let risk = "LOW";
    let recommendation = "Salário alinhado.";

    if (!match) {
      recommendation = "Sem dados de mercado para comparação.";
    } else if (performanceRating === "Top Performer" && safeCompaRatio < 0.9) {
      risk = "CRITICAL";
      recommendation =
        "Risco Crítico: Top Talent ganhando pouco. Ajustar urgente.";
      suggestedRaise = marketAvg * 1.1 - employee.salary;
    } else if (safeCompaRatio < 0.85) {
      risk = "HIGH";
      recommendation = "Defasagem severa em relação ao mercado.";
      suggestedRaise = marketAvg - employee.salary;
    }

    return {
      employee,
      benchmark: match || {
        role: employee.role,
        averageSalary: employee.salary,
        floorSalary: employee.salary,
        ceilingSalary: employee.salary,
      },
      recordedSalary: employee.salary,
      marketAverage: marketAvg,
      differencePercentage: match
        ? ((employee.salary - marketAvg) / marketAvg) * 100
        : 0,
      risk: risk as any,
      recommendation,
      compaRatio: safeCompaRatio,
      percentile: safeCompaRatio > 1.05 ? "Acima da Média" : "Abaixo da Média",
      replacementCost,
      suggestedRaise: Math.max(0, suggestedRaise),
      performanceRating,
      lastIncreaseMonths,
    };
  },

  create: async (
    analysis: SalaryAnalysisEnhanced
  ): Promise<SalaryAnalysisTO> => {
    if (!analysis.benchmark || !analysis.benchmark.idBenchmark) {
      throw new Error(
        "Não é possível salvar a análise sem um Benchmark de mercado correspondente."
      );
    }

    const payload: SalaryAnalysisTO = {
      employee: analysis.employee,
      benchmark: analysis.benchmark,
      recordedSalary: analysis.recordedSalary,
      marketAverage: analysis.marketAverage,
      risk: analysis.risk,
      analysisDate:
        analysis.analysisDate || new Date().toISOString().split("T")[0],
      differencePercentage: analysis.differencePercentage,
      recommendation: analysis.recommendation,
    };

    return await apiRequest<SalaryAnalysisTO>("/analysis", "POST", payload);
  },

  /**
   * [BACKEND] GET /analysis - Busca todo o histórico
   */
  getAll: async (): Promise<SalaryAnalysisEnhanced[]> => {
    const data = await apiRequest<SalaryAnalysisTO[]>("/analysis", "GET");
    // Recalcula os campos "Enhanced" (UI) que não ficam salvos no banco
    return data.map(SalaryAnalysisService.enhanceFromTO);
  },

  /**
   * [BACKEND] DELETE /analysis/{id} - Remove do histórico
   */
  delete: async (id: number): Promise<void> => {
    await apiRequest<void>(`/analysis/${id}`, "DELETE");
  },

  /**
   * [BACKEND] PUT /analysis/{id} - Atualiza um registro
   */
  update: async (
    id: number,
    analysis: SalaryAnalysisTO
  ): Promise<SalaryAnalysisTO> => {
    return await apiRequest<SalaryAnalysisTO>(
      `/analysis/${id}`,
      "PUT",
      analysis
    );
  },

  /**
   * [HELPER] Reconstrói os dados visuais a partir do objeto salvo no banco
   */
  enhanceFromTO: (to: SalaryAnalysisTO): SalaryAnalysisEnhanced => {
    const marketAvg = to.marketAverage || to.recordedSalary;
    const compaRatio = to.recordedSalary / marketAvg;
    const diffPct = ((to.recordedSalary - marketAvg) / marketAvg) * 100;

    // Recalcula sugestão de aumento baseada na regra de negócio original
    let suggestedRaise = 0;
    if (to.risk === "CRITICAL" || (compaRatio < 0.9 && to.risk === "HIGH")) {
      suggestedRaise = Math.max(0, marketAvg - to.recordedSalary);
    }

    return {
      ...to,
      differencePercentage: diffPct,
      recommendation:
        to.risk === "CRITICAL" ? "Ação Imediata Requerida" : "Monitorar",
      compaRatio: compaRatio,
      percentile: compaRatio > 1.05 ? "Acima da Média" : "Abaixo da Média",
      replacementCost: to.recordedSalary * 4.5, // Estimativa
      suggestedRaise: suggestedRaise,
      performanceRating: "Médio", // Default pois não salvamos isso no banco ainda
      lastIncreaseMonths: 12, // Default
    };
  },
};
