import { useEffect, useState } from "react";
import { BenchmarkService } from "../../services/BenchmarkService";
import { BenchmarkTO } from "../../types";

interface BenchmarkListProps {
  refreshTrigger: number; // Prop para forçar recarregamento quando o form salvar
}

export default function BenchmarkList({ refreshTrigger }: BenchmarkListProps) {
  const [benchmarks, setBenchmarks] = useState<BenchmarkTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBenchmarks();
  }, [refreshTrigger]); // Recarrega sempre que o trigger mudar

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
    if (window.confirm("Tem certeza que deseja excluir este dado de mercado?")) {
      try {
        await BenchmarkService.delete(id);
        // Remove da lista localmente para feedback instantâneo
        setBenchmarks((prev) => prev.filter((b) => b.idBenchmark !== id));
      } catch (error) {
        alert("Erro ao deletar benchmark.");
      }
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  if (loading) return <div className="text-gray-500 p-4">Carregando dados...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Dados de Mercado Cadastrados</h3>
      </div>
      
      {benchmarks.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          Nenhum benchmark cadastrado. Utilize o formulário acima.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Nível</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Empresa/Região</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Média Salarial</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {benchmarks.map((bench) => (
                <tr key={bench.idBenchmark} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{bench.roleName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {bench.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {bench.companySize} - {bench.region}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-700">
                    {formatCurrency(bench.averageSalary)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => bench.idBenchmark && handleDelete(bench.idBenchmark)}
                      className="text-red-600 hover:text-red-900 hover:underline"
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