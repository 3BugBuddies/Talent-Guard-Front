import { EmployeeTO } from "../types";

const API_URL = "http://localhost:8080/api/employees";

export const EmployeeService = {
  update: async (employee: EmployeeTO): Promise<EmployeeTO> => {
    try {
      const response = await fetch(`${API_URL}/${employee.idEmployee}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar colaborador");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no update do EmployeeService:", error);
      throw error;
    }
  },

  getAll: async (): Promise<EmployeeTO[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar colaboradores");
    return await response.json();
  },
};
