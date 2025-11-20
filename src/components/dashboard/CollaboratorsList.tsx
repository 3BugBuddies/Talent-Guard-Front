import { useState } from "react";

export interface RoleTO {
  id: number;
  name: string;
  level: string; // Ex: Junior, Pleno, Senior
}

export interface EmployeeTO {
  idEmployee: number;
  fullName: string;
  birthDate: string;
  salary: number;
  department: string;
  educationLevel: string;
  hireDate: string;
  role: RoleTO;
}

interface EmployeeUI extends EmployeeTO {
  retentionRisk: "Baixo" | "Médio" | "Alto";
}

// 3. Dados Fictícios
const MOCK_EMPLOYEES: EmployeeUI[] = [
  {
    idEmployee: 1,
    fullName: "Carlos Oliveira",
    birthDate: "1990-05-15",
    salary: 8500.0,
    department: "TI",
    educationLevel: "Pós-Graduação",
    hireDate: "2021-03-10",
    role: { id: 101, name: "Desenvolvedor Full Stack", level: "Senior" },
    retentionRisk: "Baixo",
  },
  {
    idEmployee: 2,
    fullName: "Mariana Santos",
    birthDate: "1995-08-20",
    salary: 4200.0,
    department: "Marketing",
    educationLevel: "Graduação",
    hireDate: "2023-01-15",
    role: { id: 102, name: "Analista de Marketing", level: "Pleno" },
    retentionRisk: "Alto",
  },
  {
    idEmployee: 3,
    fullName: "Roberto Costa",
    birthDate: "1985-12-10",
    salary: 12000.0,
    department: "Produto",
    educationLevel: "Mestrado",
    hireDate: "2019-11-01",
    role: { id: 103, name: "Gerente de Projetos", level: "Gestão" },
    retentionRisk: "Médio",
  },
];

export default function CollaboratorsList() {
  const [employees] = useState<EmployeeUI[]>(MOCK_EMPLOYEES);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Quadro de Colaboradores
          </h3>
          <p className="text-sm text-gray-500">
            Gerencie os dados e acompanhe métricas
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Adicionar Colaborador
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Colaborador
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Cargo / Nível
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Admissão
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Salário
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Risco Retenção
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr
                key={emp.idEmployee}
                className="hover:bg-blue-50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {emp.fullName.charAt(0)}
                      {emp.fullName.split(" ")[1]?.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {emp.fullName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{emp.role.name}</div>
                  <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
                    {emp.role.level}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {emp.department}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(emp.hireDate)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {formatCurrency(emp.salary)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                    ${
                      emp.retentionRisk === "Alto"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : emp.retentionRisk === "Médio"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }`}
                  >
                    {emp.retentionRisk}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
