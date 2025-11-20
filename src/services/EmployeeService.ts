import { EmployeeTO } from "../types";
import { apiRequest } from "./services";


export const EmployeeService = {
  /**
   * Busca todos os colaboradores
   * GET /employees
   */
  getAll: async (): Promise<EmployeeTO[]> => {
    return await apiRequest<EmployeeTO[]>("/employees", "GET");
  },

  /**
   * Busca um colaborador por ID
   * GET /employees/{id}
   */
  getById: async (id: number): Promise<EmployeeTO> => {
    return await apiRequest<EmployeeTO>(`/employees/${id}`, "GET");
  },

  /**
   * Cria um novo colaborador
   * POST /employees
   */
  create: async (employee: Omit<EmployeeTO, "idEmployee">): Promise<EmployeeTO> => {
    return await apiRequest<EmployeeTO>("/employees", "POST", employee);
  },

  /**
   * Atualiza um colaborador existente
   * PUT /employees/{id}
   */
  update: async (employee: EmployeeTO): Promise<EmployeeTO> => {
    if (!employee.idEmployee) throw new Error("ID do colaborador é obrigatório para atualização");
    return await apiRequest<EmployeeTO>(`/employees/${employee.idEmployee}`, "PUT", employee);
  },

  /**
   * Remove um colaborador
   * DELETE /employees/{id}
   */
  delete: async (id: number): Promise<void> => {
    return await apiRequest<void>(`/employees/${id}`, "DELETE");
  }
};