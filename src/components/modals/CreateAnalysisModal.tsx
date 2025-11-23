import { useState, useEffect } from "react";
import { EmployeeService } from "../../services/EmployeeService";
import { BenchmarkService } from "../../services/BenchmarkService";
import { EmployeeTO, BenchmarkTO } from "../../types";

interface CreateAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { employee: { idEmployee: number }, benchmark: { idBenchmark: number } }) => Promise<void>;
}

export default function CreateAnalysisModal({ isOpen, onClose, onSave }: CreateAnalysisModalProps) {
  const [employees, setEmployees] = useState<EmployeeTO[]>([]);
  const [benchmarks, setBenchmarks] = useState<BenchmarkTO[]>([]);
  
  const [selectedEmpId, setSelectedEmpId] = useState<number>(0);
  const [matchedBenchmark, setMatchedBenchmark] = useState<BenchmarkTO | null>(null);
  const [loading, setLoading] = useState(false);

  // Carrega dados iniciais
  useEffect(() => {
    if (isOpen) {
      loadData();
      resetForm();
    }
  }, [isOpen]);

  // Lógica de Match Automático
  useEffect(() => {
    if (selectedEmpId) {
      const emp = employees.find(e => e.idEmployee === selectedEmpId);
      if (emp) {
        // AQUI ESTÁ A MÁGICA: Busca o benchmark que tem o mesmo Role do funcionário
        const match = benchmarks.find(b => b.role.idRole === emp.role.idRole);
        setMatchedBenchmark(match || null);
      }
    } else {
      setMatchedBenchmark(null);
    }
  }, [selectedEmpId, employees, benchmarks]);

  const loadData = async () => {
    try {
   // 1. Busca Colaboradores primeiro e espera terminar
      console.log("Iniciando busca de colaboradores...");
      const empData = await EmployeeService.getAll();
      setEmployees(empData);

      // 2. Só depois busca os Benchmarks
      console.log("Iniciando busca de benchmarks...");
      const benchData = await BenchmarkService.getAll();
      setBenchmarks(benchData);
    } catch (error) {
      console.error("Erro na sincronia das requisições:", error);
    }
  };

  const resetForm = () => {
    setSelectedEmpId(0);
    setMatchedBenchmark(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId || !matchedBenchmark?.idBenchmark) return;

    setLoading(true);
    try {
      await onSave({
        employee: { idEmployee: selectedEmpId },
        benchmark: { idBenchmark: matchedBenchmark.idBenchmark! }
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Nova Análise de Salário</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* 1. Seleção de Colaborador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecione o Colaborador
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={0}>Selecione...</option>
              {employees.map(emp => (
                <option key={emp.idEmployee} value={emp.idEmployee}>
                  {emp.fullName} - {emp.role.name} ({emp.role.level})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Feedback Visual do Match */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Benchmark Correspondente</h4>
            
            {selectedEmpId === 0 ? (
              <p className="text-sm text-gray-400 italic">Selecione um colaborador acima...</p>
            ) : matchedBenchmark ? (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800">Match Encontrado!</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Cargo: {matchedBenchmark.role.name} {matchedBenchmark.role.level}
                    <br />
                    Média de Mercado: <strong>R$ {matchedBenchmark.averageSalary.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-red-800">Sem Benchmark Compatível</p>
                  <p className="text-xs text-red-600 mt-1">
                    Não encontramos um benchmark para o cargo deste colaborador. Cadastre-o na aba "Benchmarks" primeiro.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !matchedBenchmark}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processando..." : "Gerar Análise"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}