const express = require('express');
const cors = require('cors')        // Quem pode acessar?
const routes = require('./routes'); // Importa as routas do arquivo ~routes.js~

const app = express();

app.use(cors());
app.use(express.json()); // Para entender que as postagens está sendo enviado no formato de JSON
app.use(routes);

//#region 
/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parametros:
 * 
 * Query Params: Enviado na rota após o simbolo de ? -> Usa para filtro
 * e paginação (const params = request.query; -> Pode enviar mais de uma informação)
 * 
 * Route Params: Identificar recursos (Tabela -> const params = request.params;). Usado p ID
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recurso.
 */

/**
 * nodemon é uma dependencia dev que atualiza seu servidor em tempo real conforme as suas modificações
 */

 /**
  * SQL: My,SQL, >SQLite<, PostgreSQL, Oracle
  * NoSQL: MongoDB, CouchDB
  * Foi utilizado o knex, instando o npm install sqlite3
  * E gerando um arquivo de BD com o 'npx knex init'
  */

  /**
   * Diver do banco de dados: SELECT * FROM users
   * Query Builder: table('users'.select('*').where())
   * 
   */
//#endregion

app.listen(3333);
