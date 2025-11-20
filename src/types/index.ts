export type Level = "JUNIOR" | "PLENO" | "SENIOR";

export type RiskClassification = "BELOW_FLOOR" | "ON_TARGET" | "ABOVE_CEILING";

export interface RoleTO {
  idRole: number; // Long -> number
  name: string;
  description: string;
  level: Level; // Enum
}

export interface EmployeeTO {
  idEmployee: number; // Long -> number
  fullName: string;
  birthDate: string; // LocalDate -> string (ISO format: YYYY-MM-DD)
  salary: number; // BigDecimal -> number
  department: string;
  educationLevel: string;
  hireDate: string; // LocalDate -> string (ISO format)
  role: RoleTO; // Objeto aninhado
}

export interface BenchmarkSalaryTO {
  idBenchmarkSalary: number; // Long -> number
  floorSalary: number; // BigDecimal -> number
  averageSalary: number; // BigDecimal -> number
  ceilingSalary: number; // BigDecimal -> number
  referenceDate: string; // LocalDate -> string
  role: RoleTO; // Relacionamento com Role
}

export interface SalaryAnalysisTO {
  idSalaryAnalysis: number; // Long -> number
  recordedSalary: number; // BigDecimal -> number
  marketAverage: number; // BigDecimal -> number
  risk: RiskClassification; // Enum
  employee: EmployeeTO; // Objeto completo do funcionário
  benchmark: BenchmarkSalaryTO; // Objeto completo do benchmark
}

export interface ErrorResponse {
  status: number; // int -> number
  erro: string;
}
