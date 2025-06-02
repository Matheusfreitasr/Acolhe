// Placeholder para configuração do Axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // TODO: Substituir pela URL real da API backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Adicionar interceptors para tratamento de token/autenticação, se necessário

export default apiClient;

