const BASE_URL = "http://localhost:8080/talent-guard"; 

/**
 * Função genérica realiza requisições HTTP à API Talent Guard.
 */
export async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: unknown
): Promise<T> {
  
  // Recupera o token JWT do LocalStorage
  const token = localStorage.getItem("token");

  // Configura os Cabeçalhos
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Configura a Requisição
  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Tratamento de Erros HTTP (4xx, 5xx)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro API [${response.status}]: ${errorText || response.statusText}`);
    }

    // Tratamento para respostas sem conteúdo (ex: DELETE 204)
    if (response.status === 204) {
      return {} as T;
    }

    // Retorna o JSON tipado
    return await response.json();
  } catch (error) {
    console.error(`Falha na requisição para ${endpoint}:`, error);
    throw error;
  }
}