import { EmployeeTO } from "../types";
import { apiRequest } from "./services";

export const EmployeeService = {
  getAll: async (): Promise<EmployeeTO[]> => {
    return await apiRequest<EmployeeTO[]>("/employee", "GET");
  },

  getById: async (id: number): Promise<EmployeeTO> => {
    return await apiRequest<EmployeeTO>(`/employee/${id}`, "GET");
  },

  create: async (employee: EmployeeTO): Promise<EmployeeTO> => {
    return await apiRequest<EmployeeTO>("/employee", "POST", employee);
  },

  update: async (employee: EmployeeTO): Promise<EmployeeTO> => {
    if (!employee.idEmployee) throw new Error("ID necessário para atualização");
    return await apiRequest<EmployeeTO>(`/employee/${employee.idEmployee}`, "PUT", employee);
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest<void>(`/employee/${id}`, "DELETE");
  }
};