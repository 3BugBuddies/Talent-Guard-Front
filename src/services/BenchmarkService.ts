
import { BenchmarkTO } from '../types';
import { apiRequest } from './services';

export const BenchmarkService = {
  getAll: async (): Promise<BenchmarkTO[]> => {
    return await apiRequest<BenchmarkTO[]>("/benchmarks", "GET");
  },

  create: async (benchmark: Omit<BenchmarkTO, 'idBenchmark'>): Promise<BenchmarkTO> => {
    return await apiRequest<BenchmarkTO>("/benchmarks", "POST", benchmark);
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest<void>(`/benchmarks/${id}`, "DELETE");
  }
};