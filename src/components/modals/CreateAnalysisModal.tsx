import { useState, useEffect } from "react";
import { EmployeeService } from "../../services/EmployeeService";
import { BenchmarkService } from "../../services/BenchmarkService";
import { EmployeeTO, BenchmarkTO } from "../../types";
import { CheckCircle, XCircle, Users } from "lucide-react"; // Importando ícones

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
      console.log("Iniciando busca de colaboradores...");
      const empData = await EmployeeService.getAll();
      setEmployees(empData);

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
      alert("Erro ao gerar análise salarial.");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (val: number | undefined) => {
    if (val === undefined || val === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  if (!isOpen) return null;

  return (
    // Fundo do Overlay e Responsividade
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* 1. CONTAINER DO MODAL: Fundo e bordas adaptados. */}
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-dark-border">
        
        {/* 2. HEADER DO MODAL: Fundo e textos adaptados. */}
        <div className="bg-gray-50 dark:bg-dark-surface-hover px-6 py-4 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text-primary">Nova Análise de Salário</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* 1. Seleção de Colaborador */}
          <div>
            {/* Label adaptado */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Selecione o Colaborador
            </label>
            {/* Select adaptado */}
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value={0}>Selecione...</option>
              {employees.map(emp => (
                <option key={emp.idEmployee} value={emp.idEmployee}>
                  {emp.fullName} - {emp.role?.name} ({emp.role?.level})
                </option>
              ))}
            </select>
            {employees.length === 0 && (
                 <p className="text-xs text-red-500 mt-1 dark:text-red-400 flex items-center gap-1">
                    <Users size={12} /> Nenhum colaborador encontrado.
                 </p>
            )}
          </div>

          {/* 2. Feedback Visual do Match */}
          {/* Fundo do feedback adaptado */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Benchmark Correspondente</h4>
            
            {selectedEmpId === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">Selecione um colaborador acima...</p>
            ) : matchedBenchmark ? (
              // Match Encontrado (Green)
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800 dark:text-green-300">Match Encontrado!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Cargo: {matchedBenchmark.role.name} {matchedBenchmark.role.level}
                    <br />
                    Média de Mercado: <strong>{formatMoney(matchedBenchmark.averageSalary)}</strong>
                  </p>
                </div>
              </div>
            ) : (
              // Sem Match (Red)
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-800 dark:text-red-300">Sem Benchmark Compatível</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Não encontramos um benchmark para o cargo deste colaborador. Cadastre-o na aba "Benchmarks" primeiro.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4">
            {/* Botão Cancelar adaptado */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
            {/* Botão Salvar adaptado */}
            <button
              type="submit"
              disabled={loading || !matchedBenchmark}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md dark:shadow-blue-900/50"
            >
              {loading ? "Processando..." : "Gerar Análise"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}