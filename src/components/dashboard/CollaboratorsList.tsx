import { useState, useEffect } from "react";
import EditEmployeeModal from "../modals/EditEmployeeModal";
import AddEmployeeModal from "../modals/AddEmployeeModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { EmployeeTO } from "../../types";
import { EmployeeService } from "../../services/EmployeeService";

// Interface estendida apenas para controle visual de Risco
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

      // Mapeia para adicionar o campo visual 'retentionRisk' (simulado por enquanto)
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
    // Tenta tratar datas no formato array [2023, 5, 20] que o Java, ou string ISO
    if (Array.isArray(dateString)) {
      const [year, month, day] = dateString;
      return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
    }
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quadro de Colaboradores</h3>
          <p className="text-sm text-gray-500">Gerencie os dados e acompanhe métricas</p>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Colaborador</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo / Nível</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Admissão</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Salário</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Risco Retenção</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                    Nenhum colaborador encontrado. Adicione o primeiro!
                  </td>
                </tr>
              )}
              {employees.map((emp) => (
                <tr key={emp.idEmployee} className="hover:bg-blue-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {emp.fullName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{emp.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Proteção contra role undefined */}
                    <div className="text-sm text-gray-900">{emp.role?.name || "Sem Cargo"}</div>
                    <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
                      {emp.role?.level || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(emp.hireDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{formatCurrency(emp.salary)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                      ${emp.retentionRisk === "Alto" ? "bg-red-50 text-red-700 border-red-200" :
                        emp.retentionRisk === "Médio" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-green-50 text-green-700 border-green-200"}`}>
                      {emp.retentionRisk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors mr-4" onClick={() => handleEditClick(emp)}>
                      Editar
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors font-medium" onClick={() => handleDeleteClick(emp)}>
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