import { EmployeeTO, SalaryAnalysisEnhanced } from "../types";
import { BenchmarkService } from "./BenchmarkService";

export const SalaryAnalysisService = {
  analyzeEnhanced: async (
    employee: EmployeeTO
  ): Promise<SalaryAnalysisEnhanced> => {
    // 1. Busca o Benchmark (Seja do Java ou do Mock Local)
    const benchmarks = await BenchmarkService.getAll();
    const match = benchmarks.find(
      (b) =>
        b.roleName.toLowerCase() === employee.role.name.toLowerCase() &&
        b.level === employee.role.level
    );

    // Define média de mercado
    const marketAvg = match ? match.averageSalary : employee.salary;

    // 2. Simulação de Dados que faltam no Backend (Performance e Histórico)
    // Usamos o ID para gerar sempre o mesmo dado "aleatório" (determinístico)
    const performances = ["Médio", "Alto", "Top Performer", "Médio"];
    const performanceRating = performances[
      (employee.idEmployee ?? 1) % performances.length
    ] as any;
    const lastIncreaseMonths = (employee.idEmployee ?? 1) * 4 + 2; // Gera ex: 6, 10, 14 meses

    // 3. Cálculos Matemáticos (Lógica de Negócio no Front)
    const compaRatio = employee.salary / marketAvg;
    const replacementCost = employee.salary * 4.5; // Custo estimado de demissão + contratação + treino

    let suggestedRaise = 0;
    let risk = "LOW";
    let recommendation = "Salário alinhado.";

    // Recalcula risco com base na Performance (que o Java desconhece)
    if (performanceRating === "Top Performer" && compaRatio < 0.9) {
      risk = "CRITICAL";
      recommendation =
        "Risco Crítico: Top Talent ganhando pouco. Ajustar urgente.";
      suggestedRaise = marketAvg * 1.1 - employee.salary;
    } else if (compaRatio < 0.85) {
      risk = "HIGH";
      recommendation = "Defasagem severa em relação ao mercado.";
      suggestedRaise = marketAvg - employee.salary;
    }

    // 4. Monta o Objeto Final
    return {
      employee,
      marketAverage: marketAvg,
      differencePercentage: ((employee.salary - marketAvg) / marketAvg) * 100,
      risk: risk as any,
      recommendation,

      // Novos campos
      compaRatio,
      percentile: compaRatio > 1.05 ? "Acima da Média" : "Abaixo da Média",
      replacementCost,
      suggestedRaise: Math.max(0, suggestedRaise),
      performanceRating,
      lastIncreaseMonths,
    };
  },
};
