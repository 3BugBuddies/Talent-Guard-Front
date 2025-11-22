import { BenchmarkTO } from "../types";
import { apiRequest } from "./services";

export const BenchmarkService = {
  getAll: async (): Promise<BenchmarkTO[]> => {
    return await apiRequest<BenchmarkTO[]>("/benchmark", "GET");
  },

  getById: async (id: number): Promise<BenchmarkTO> => {
    return await apiRequest<BenchmarkTO>(`/benchmark/${id}`, "GET");
  },

  create: async (benchmark: BenchmarkTO): Promise<BenchmarkTO> => {
    return await apiRequest<BenchmarkTO>("/benchmark", "POST", benchmark);
  },

  update: async (benchmark: BenchmarkTO): Promise<BenchmarkTO> => {
    if (!benchmark.idBenchmark) throw new Error("ID necessário para atualização");
    return await apiRequest<BenchmarkTO>(`/benchmark/${benchmark.idBenchmark}`, "PUT", benchmark);
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest<void>(`/benchmark/${id}`, "DELETE");
  }
};