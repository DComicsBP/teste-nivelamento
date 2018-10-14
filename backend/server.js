var application = function () {
  var express = require('express');
  var mysql = require('mysql');
  var app = express(); var cors = require('cors');
  var bodyParser = require('body-parser');
  var port = 3001;
  var router = express.Router();
  var contatos = [];
  var operadoras = [];
  app.use(cors());
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  });


  app.use(bodyParser.json({ type: 'application/*+json' }))
  app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  router.get('/', (req, res) => res.json({ message: 'Funfa' })) /
    app.use('/', router);
  app.listen(port);
  console.log('API funcionando!');


  function exe(sqlQuery, res) {

    var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'escola',
    });

    con.query(sqlQuery, function (error, results, fields) {
      if (error) res.json(error);
      else
        res.json(results);
      con.end();
      console.log('executou!');
    });

  }

  // #section alunos
  router.get('/alunos', (req, res) => {
    exe('SELECT * FROM alunos;', res);
  });

  router.get('/alunos/:id?', function (req, res) {
    var filter = '';
    if (req.params.id) filter = "WHERE ID=" + parseInt(req.params.id);
    exe('SELECT * FROM alunos ' + filter, res);

  });

  router.get('/alunosByTurma/:id?', function (req, res) {
    var filter = ' ';
    if (req.params.id) filter = "WHERE T.ID=" + parseInt(req.params.id);
    sql = "SELECT a.Nome as NOME_ALUNO, a.ID as ID_ALUNO, p.ID as ID_PROFESSOR, t.ID as ID_TURMA, p.Nome as NOME_PROFESSOR, t.Nome as TURMA FROM alunos A INNER JOIN turmas T ON T.ID = A.ID_turma INNER JOIN professores P on P.ID = T.ID_Professor ";
    exe(sql + filter, res);

  });

  router.delete('/alunos/:id?', function (req, res) {
    exe('DELETE FROM ALUNOS WHERE ID=' + parseInt(req.params.id), res);
  });

  router.post('/alunos', function (req, res, err) {
    var nome = req.body.nome;
    var turma = req.body.turma;
    exe(`INSERT INTO alunos ( Nome, ID_turma) VALUES ('${nome}', '${turma}')`, res);
  });


  // #section professores
  router.get('/professorByTurma/:id?', function (req, res) {
    var filter = '';
    if (req.params.id) filter = " WHERE p.ID=" + parseInt(req.params.id);
    exe('select p.Nome from professores as p INNER JOIN turmas as t on t.ID_Professor = p.ID  ' + filter + ' limit 1;', res)
  });

  router.get('/professores/:id?', function (req, res) {
    var filter = '';
    if (req.params.id) filter = "WHERE ID=" + parseInt(req.params.id);
    exe('SELECT * FROM professores ' + filter, res);
  });

  router.get('/professores/:id?', function (req, res) {
    var filter = '';
    if (req.params.id) filter = "WHERE ID=" + parseInt(req.params.id);
    exe('SELECT * FROM professores ' + filter, res);

  });

  router.get('/professores', (res) => {
    exe('SELECT * FROM professores ', res);
  });

  router.post('/professores', function (res) {
    console.log('Entrou no post');
    var Tom; //="Exemplo";
    var Nome;// = "grey";
    exe(`INSERT INTO professores (Nome) VALUES ('${Nome}');`, res);
  });

  //#section turmas
  router.get('/turmas', (req, res) => {
    exe('SELECT * FROM turmas', res);
  });
  router.get('/turmasA', (req, res) => {
    exe('SELECT count(A.Nome) as Alunos, T.Nome as Turma,  P.Nome as Professor, T.ID FROM ALUNOS AS A INNER JOIN TURMAS AS T ON T.ID = A.ID_Turma INNER JOIN PROFESSORES AS P ON P.ID = T.ID_Professor group by T.Nome', res);
  });
  router.get('/alunosPorTurma/:id?', (req, res) => {
    var filter = '';
    if (req.params.id) filter = "WHERE ID_turma=" + parseInt(req.params.id);
    exe('select * from alunos ' + filter, res);
  });
  router.get('/turmas/:id?', (req, res) => {
    var filter = '';
    if (req.params.id) filter = "WHERE ID=" + parseInt(req.params.id);
    exe('SELECT * FROM TURMAS ' + filter, res);

  });
}



application(); 
