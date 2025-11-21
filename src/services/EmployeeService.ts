import { EmployeeTO } from "../types";

const STORAGE_KEY = "tg_mock_employees";

// Dados iniciais para não começar com a tabela vazia
const INITIAL_DATA: EmployeeTO[] = [
  {
    idEmployee: 1,
    fullName: "Carlos Oliveira",
    birthDate: "1990-05-15",
    salary: 8500.0,
    department: "TI",
    educationLevel: "Pós-Graduação",
    hireDate: "2021-03-10",
    role: { idRole: 1, name: "Desenvolvedor Full Stack", level: "SENIOR" },
  },
  {
    idEmployee: 2,
    fullName: "Mariana Santos",
    birthDate: "1995-08-20",
    salary: 4200.0,
    department: "Marketing",
    educationLevel: "Graduação",
    hireDate: "2023-01-15",
    role: { idRole: 5, name: "Analista de Marketing", level: "PLENO" },
  },
  {
    idEmployee: 3,
    fullName: "João da Silva",
    birthDate: "1988-12-01",
    salary: 15000.0,
    department: "TI",
    educationLevel: "Mestrado",
    hireDate: "2019-05-20",
    role: { idRole: 6, name: "Tech Lead", level: "SPECIALIST" },
  }
];

// Simula delay de rede (500ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const EmployeeService = {
  /**
   * Lista todos os funcionários (Local Storage)
   */
  getAll: async (): Promise<EmployeeTO[]> => {
    await delay(500);
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    
    return JSON.parse(stored);
  },

  getById: async (id: number): Promise<EmployeeTO> => {
    await delay(300);
    const employees = await EmployeeService.getAll();
    const found = employees.find(e => e.idEmployee === id);
    if (!found) throw new Error("Funcionário não encontrado");
    return found;
  },

  /**
   * Cria novo funcionário gerando ID automático
   */
  create: async (employee: Omit<EmployeeTO, "idEmployee">): Promise<EmployeeTO> => {
    await delay(600);
    const employees = await EmployeeService.getAll();

    const newId = employees.length > 0 
      ? Math.max(...employees.map(e => e.idEmployee || 0)) + 1 
      : 1;

    const newEmployee: EmployeeTO = { ...employee, idEmployee: newId };
    
    const updatedList = [...employees, newEmployee];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return newEmployee;
  },

  /**
   * Atualiza funcionário existente
   */
  update: async (employee: EmployeeTO): Promise<EmployeeTO> => {
    await delay(600);
    const employees = await EmployeeService.getAll();
    
    const index = employees.findIndex(e => e.idEmployee === employee.idEmployee);
    if (index === -1) throw new Error("Funcionário não encontrado para atualização");

    employees[index] = employee;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

    return employee;
  },

  /**
   * Remove funcionário
   */
  delete: async (id: number): Promise<void> => {
    await delay(400);
    const employees = await EmployeeService.getAll();
    const filtered = employees.filter(e => e.idEmployee !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};