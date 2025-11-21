import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoleService } from "../../services/RoleService";
import { BenchmarkService } from "../../services/BenchmarkService";

export default function AdminHome() {
  const [stats, setStats] = useState({
    rolesCount: 0,
    benchmarksCount: 0,
    loading: true,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        // Carrega contagens (usando length dos arrays)
        const [roles, benchmarks] = await Promise.all([
          RoleService.getAll(),
          BenchmarkService.getAll(),
        ]);

        setStats({
          rolesCount: roles.length,
          benchmarksCount: benchmarks.length,
          loading: false,
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Painel Administrativo
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bem-vindo ao centro de configuração do Talent Guard. Selecione um
          módulo abaixo.
        </p>
      </div>

      {/* Cards de Acesso Rápido */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card: Gestão de Cargos */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                {/* Icone Cargo */}
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Cargos Cadastrados
                </dt>
                <dd>
                  <div className="text-2xl font-medium text-gray-900">
                    {stats.loading ? "..." : stats.rolesCount}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link
              to="/admin/roles"
              className="text-sm font-medium text-indigo-700 hover:text-indigo-900 flex items-center"
            >
              Gerenciar Cargos{" "}
              <span aria-hidden="true" className="ml-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Card: Benchmarks */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                {/* Icone Gráfico */}
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Dados de Mercado
                </dt>
                <dd>
                  <div className="text-2xl font-medium text-gray-900">
                    {stats.loading ? "..." : stats.benchmarksCount}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link
              to="/admin/benchmarks"
              className="text-sm font-medium text-green-700 hover:text-green-900 flex items-center"
            >
              Gerenciar Benchmarks{" "}
              <span aria-hidden="true" className="ml-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Seção de Instruções Rápidas */}
      <div className="bg-white shadow sm:rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Como usar o painel administrativo
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Este painel centraliza as configurações vitais do Talent Guard.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Cargos:</strong> Crie novos níveis hierárquicos e
              padronize os nomes dos cargos para uso no RH.
            </li>
            <li>
              <strong>Benchmarks:</strong> Insira dados de pesquisas salariais
              para alimentar a inteligência de comparação salarial.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
