
// import { BenchmarkTO } from '../types';
// import { apiRequest } from './services';

// export const BenchmarkService = {
//   getAll: async (): Promise<BenchmarkTO[]> => {
//     return await apiRequest<BenchmarkTO[]>("/benchmarks", "GET");
//   },

//   create: async (benchmark: Omit<BenchmarkTO, 'idBenchmark'>): Promise<BenchmarkTO> => {
//     return await apiRequest<BenchmarkTO>("/benchmarks", "POST", benchmark);
//   },

//   delete: async (id: number): Promise<void> => {
//     await apiRequest<void>(`/benchmarks/${id}`, "DELETE");
//   }
// };

import { BenchmarkTO } from "../types";

const STORAGE_KEY = "tg_mock_benchmarks";

// Dados iniciais para teste (Mock Seed)
const INITIAL_DATA: BenchmarkTO[] = [
  {
    idBenchmark: 1,
    roleName: "Desenvolvedor Frontend",
    level: "SENIOR",
    region: "São Paulo",
    companySize: "Grande Porte",
    averageSalary: 12000.0,
  },
  {
    idBenchmark: 2,
    roleName: "Desenvolvedor Backend",
    level: "PLENO",
    region: "São Paulo",
    companySize: "Média",
    averageSalary: 9500.0,
  },
  {
    idBenchmark: 3,
    roleName: "Analista de Marketing",
    level: "JUNIOR",
    region: "Remoto",
    companySize: "Pequena",
    averageSalary: 3500.0,
  },
];

// Função auxiliar para simular delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const BenchmarkService = {
  /**
   * Retorna todos os benchmarks do LocalStorage
   */
  getAll: async (): Promise<BenchmarkTO[]> => {
    await delay(500); // Fake delay
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      // Se não tiver nada, salva os dados iniciais e retorna
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    
    return JSON.parse(data);
  },

  /**
   * Cria um novo benchmark e salva no LocalStorage
   */
  create: async (benchmark: Omit<BenchmarkTO, "idBenchmark">): Promise<BenchmarkTO> => {
    await delay(500);
    const storedData = localStorage.getItem(STORAGE_KEY);
    const benchmarks: BenchmarkTO[] = storedData ? JSON.parse(storedData) : [];

    // Gera um ID fake
    const newId = benchmarks.length > 0 
      ? Math.max(...benchmarks.map(b => b.idBenchmark || 0)) + 1 
      : 1;

    const newBenchmark: BenchmarkTO = { ...benchmark, idBenchmark: newId };
    
    benchmarks.push(newBenchmark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(benchmarks));

    return newBenchmark;
  },

  /**
   * Remove um benchmark do LocalStorage
   */
  delete: async (id: number): Promise<void> => {
    await delay(300);
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const benchmarks: BenchmarkTO[] = JSON.parse(storedData);
      const filtered = benchmarks.filter(b => b.idBenchmark !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};