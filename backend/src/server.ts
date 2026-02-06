import app from './app';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escutar em todas as interfaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📌 Endpoints disponíveis:`);
  console.log(`   GET  / - Health check`);
  console.log(`   POST /api/forms/submissions - Criar submissão`);
  console.log(`   GET  /api/forms/submissions - Listar submissões`);
  console.log(`   GET  /api/forms/submissions/:id - Buscar por ID`);
});