import { useEffect, useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { BenchmarkTO } from "../../types";

interface BenchmarkListProps {
  refreshTrigger?: number;
}

export default function BenchmarkList({ refreshTrigger = 0 }: BenchmarkListProps) {
  const [benchmarks, setBenchmarks] = useState<BenchmarkTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBenchmarks();
  }, [refreshTrigger]);

  const loadBenchmarks = async () => {
    try {
      setLoading(true);
      const data = await BenchmarkService.getAll();
      setBenchmarks(data);
    } catch (error) {
      console.error("Erro ao carregar benchmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Tem certeza que deseja excluir este dado de mercado?")
    ) {
      try {
        await BenchmarkService.delete(id);
        setBenchmarks((prev) => prev.filter((b) => b.idBenchmark !== id));
      } catch (error) {
        alert("Erro ao deletar benchmark.");
      }
    }
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  if (loading)
    return <div className="text-gray-500 dark:text-gray-400 p-4 text-center">Carregando dados...</div>;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden border border-gray-100 dark:border-dark-border">
      
      {/* Header da Tabela */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface-hover">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary">
          Dados de Mercado Cadastrados
        </h3>
      </div>

      {benchmarks.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-dark-text-secondary">
          Nenhum benchmark cadastrado. Utilize o formulário acima.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {/* Cabeçalho das Colunas */}
            <thead className="bg-gray-50 dark:bg-dark-surface-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Nível
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Média Salarial
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Faixa (Min - Max)
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            
            {/* Corpo da Tabela */}
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
              {benchmarks.map((bench) => (
                <tr key={bench.idBenchmark} className="hover:bg-gray-50 dark:hover:bg-dark-surface-hover transition-colors">
                  
                  {/* Cargo */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-dark-text-primary">
                    {/* Tenta usar role.name (estrutura aninhada) ou roleName (estrutura plana) */}
                    {bench.role?.name || bench.role?.idRole || "N/A"}
                  </td>
                  
                  {/* Nível (Badge) */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-dark-text-secondary">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {bench.role?.level || bench.referenceDate || "N/A"}
                    </span>
                  </td>
                  
                  {/* Média Salarial */}
                  <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-dark-text-primary">
                    {formatCurrency(bench.averageSalary)}
                  </td>
                  
                  {/* Faixa Salarial */}
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-dark-text-secondary font-mono">
                    {formatCurrency((bench as any).floorSalary || 0)} -{" "}
                    {formatCurrency((bench as any).ceilingSalary || 0)}
                  </td>
                  
                  {/* Ações */}
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        bench.idBenchmark && handleDelete(bench.idBenchmark)
                      }
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:underline transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}