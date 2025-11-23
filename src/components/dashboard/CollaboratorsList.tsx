import { useState, useEffect } from "react";
import EditEmployeeModal from "../modals/EditEmployeeModal";
import AddEmployeeModal from "../modals/AddEmployeeModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { EmployeeTO } from "../../types";
import { EmployeeService } from "../../services/EmployeeService";

interface EmployeeUI extends EmployeeTO {
  retentionRisk: "Baixo" | "Médio" | "Alto";
}

type NewEmployee = Omit<EmployeeTO, "idEmployee">;

export default function CollaboratorsList() {
  const [employees, setEmployees] = useState<EmployeeUI[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeUI | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeTO | null>(null);


  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await EmployeeService.getAll();
      const uiData: EmployeeUI[] = data.map(emp => ({
        ...emp,
        retentionRisk: calculateRiskMock(emp)
      }));

      setEmployees(uiData);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      alert("Erro ao carregar a lista de colaboradores.");
    } finally {
      setLoading(false);
    }
  };

  const calculateRiskMock = (emp: EmployeeTO): "Baixo" | "Médio" | "Alto" => {
    if (emp.salary < 3000) return "Alto";
    if (emp.salary < 7000) return "Médio";
    return "Baixo";
  };

  const handleEditClick = (employee: EmployeeUI) => {
    const { retentionRisk, ...employeeData } = employee;
    setSelectedEmployee(employeeData);
    setIsModalOpen(true);
  };

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleDeleteClick = (employee: EmployeeUI) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete?.idEmployee) return;

    try {
      await EmployeeService.delete(employeeToDelete.idEmployee);

      setEmployees((prev) =>
        prev.filter((emp) => emp.idEmployee !== employeeToDelete.idEmployee)
      );

      alert("Colaborador removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover:", error);
      alert("Erro ao remover colaborador.");
    } finally {
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee: EmployeeTO) => {
    try {
      const saved = await EmployeeService.update(updatedEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.idEmployee === saved.idEmployee
            ? { ...saved, retentionRisk: emp.retentionRisk }
            : emp
        )
      );

      setIsModalOpen(false);
      alert("Colaborador atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar colaborador.");
    }
  };

  const handleCreateEmployee = async (newEmployeeData: NewEmployee) => {
    try {
      const savedEmployee = await EmployeeService.create(newEmployeeData);
      console.log("Criado no Backend com ID:", savedEmployee.idEmployee);

      const newEmployeeUI: EmployeeUI = {
        ...savedEmployee,
        retentionRisk: "Baixo",
      };

      setEmployees((prev) => [...prev, newEmployeeUI]);
      setIsAddModalOpen(false);
      alert("Colaborador cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert("Erro ao criar colaborador.");
    }
  };

  // Formatadores
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    if (Array.isArray(dateString)) {
      const [year, month, day] = dateString;
      return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
    }
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow dark:shadow-none overflow-hidden border border-gray-100 dark:border-dark-border">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-surface-hover">
        <div>
          {/* Título */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">Quadro de Colaboradores</h3>
          {/* Subtítulo */}
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Gerencie os dados e acompanhe métricas</p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          onClick={handleAddClick}
        >
          + Adicionar Colaborador
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-500">Carregando colaboradores...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-dark-surface-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Colaborador</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cargo / Nível</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admissão</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Salário</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risco Retenção</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 dark:text-gray-500">
                    Nenhum colaborador encontrado. Adicione o primeiro!
                  </td>
                </tr>
              )}


              {employees.map((emp) => (
                <tr key={emp.idEmployee} className="hover:bg-blue-50 dark:hover:bg-dark-surface-hover transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200 font-bold text-sm">
                        {emp.fullName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{emp.fullName}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-dark-text-primary">{emp.role?.name || "Sem Cargo"}</div>
                    <div className="text-xs text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-dark-surface-hover inline-block px-2 py-0.5 rounded mt-1 border dark:border-gray-700">
                      {emp.role?.level || "-"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">{formatDate(emp.hireDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary font-mono">{formatCurrency(emp.salary)}</td>

                  {/* Risco de Retenção (Badges) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                    ${emp.retentionRisk === "Alto"
                        ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800" :
                        emp.retentionRisk === "Médio"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800" :
                          "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"}`}>
                      {emp.retentionRisk}
                    </span>
                  </td>

                  {/* Ações (Botões) */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Editar */}
                    <button className="text-gray-400 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mr-4" onClick={() => handleEditClick(emp)}>
                      Editar
                    </button>
                    {/* Remover */}
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium" onClick={() => handleDeleteClick(emp)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdateEmployee}
        employee={selectedEmployee}
      />
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreateEmployee}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDelete?.fullName}
      />
    </div>
  );
}