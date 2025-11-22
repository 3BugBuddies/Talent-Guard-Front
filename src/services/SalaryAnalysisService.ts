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
        floorSalary: 0,
        averageSalary: employee.salary,
        ceilingSalary: 0,
        role: employee.role,
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
    };

    return await apiRequest<SalaryAnalysisTO>("/analysis", "POST", payload);
  },
};
