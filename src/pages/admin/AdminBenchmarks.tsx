import { useState } from "react";
import Container from "../../components/ui/Container";
import BenchmarkForm from "../../components/forms/BenchmarkForm";
import BenchmarkList from "../../components/dashboard/BenchmarkList";

export default function AdminBenchmarks() {
  const [refreshList, setRefreshList] = useState(0);

  const handleSuccess = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg font-outfit">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda: Formulário */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BenchmarkForm onSuccess={handleSuccess} />
            </div>
          </div>

          {/* Coluna da Direita: Lista */}
          <div className="lg:col-span-2">
            <BenchmarkList refreshTrigger={refreshList} />
          </div>

        </div>
      </Container>
    </div>
  );
}