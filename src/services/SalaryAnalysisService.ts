import { EmployeeTO, SalaryAnalysisTO } from "../types";
import { apiRequest } from "./services";

export const SalaryAnalysisService = {
  /**
   * Envia os dados do funcionário para análise de risco e comparação salarial
   * POST /salary-analysis
   */
  analyze: async (employee: EmployeeTO): Promise<SalaryAnalysisTO> => {
    return await apiRequest<SalaryAnalysisTO>(
      "/salary-analysis",
      "POST",
      employee
    );
  },
};
