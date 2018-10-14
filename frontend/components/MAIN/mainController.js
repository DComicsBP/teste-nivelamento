angular.module('myApp', []).controller('mainController', function ($scope, $http) {
    $(".show").hide();
    $scope.title = ['Lista de Alunos', 'Professor', 'Turma'];
    $scope.alunos = [];
    $scope.turmas = [];
    $scope.nomeProfTurma = [];
    $scope.idTurma = "";
    $scope.professores = null;
    $scope.all = [];
    $scope.prof = [];
    $scope.testeTurmas = 'valor'
    $scope.getAll = [];
    $scope.al = [];


    var jsonPrepare = function (a, e) {
        var prof = [];
        var alunos = [];
        $scope.alunos = []

        for (let index = 0; index < a.length; index++) {
            const element = a[index];
            var alunosAux = {
                "Selecionado": false,
                "ID_turma": e.ID,
                "Nome": element.NOME_ALUNO,
                "ID ": element.ID_ALUNO
            }
            alunos.push(alunosAux);
        }
        prof.push(
            {
                "Nome": a[0].NOME_PROFESSOR,
                "ID": e.ID_Professor
            });

        return { prof, alunos }


    }

    $scope.selectTurma = function (e) {
        $scope.alunos = [];
        $scope.prof = [];

        if (e.ID != 0)
            getAlunoProfByTurma(e);
        else getAlunos();
    }

    $scope.isAlunosSelecionado = function (e) {
        e.forEach(element => {
            if (element.Selecionado)
                return true;
        });
    }

    $scope.apagar = function (e) {
        $scope.alunos = e.filter(function (aluno) {
            if (aluno.Selecionado) { deleteAluno(aluno); return null; }
            return aluno;
        });
    };

    $scope.enviar = function (e) {
        if (e.ID != 0) {
            delete $scope.e;
            var al = {
                nome: e.nome,
                turma: e.turma.ID
            };
            postAluno(al);
            getAlunoProfByTurma(al.turma.ID);
        } else {
            getAlunos();
        }


    }

    var postAluno = function (aluno) {
        $scope.aluno = { nome: aluno.nome, turma: aluno.turma }

        $http({
            method: 'POST',
            url: 'http://localhost/alunos',
            data: $scope.aluno,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then((response) => {
            delete $scope.aluno;
            $scope.alunoForm.$setPristine();
            getAlunos();
        }).catch((response) => {
            console.log('Fiquei preso--->', response);

        });
    };

    $scope.carregarAlunos = function (param) {
        getAlunoProfByTurma(param)
       $(".hide").hide(); 
       $(".show").show(); 


      }

   

    var deleteAluno = function (data) {

        console.log('DATA ENTRADA -->', data);
        return $http({
            method: 'DELETE',
            url: 'http://localhost/alunos/' + data.ID,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {

            console.log('Json de resposta do delete ==== >>>', response);
        }).catch(function () {
            console.log("Deu ruim")
        });
    };

    var getAllInform = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/turmasA',
            headers: { 'X-Force-Content-Type': 'application/json' }

        }).then(function (response) {
            response.data.forEach(element => {
                $scope.getAll.push(element);
            });
            console.log($scope.getAll)

        }).catch(function (response) {
            console.log('Não Funfou')
        })
    }

    var getTurmas = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/turmas',
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            $scope.turmas = response.data;
            return response.data;
        }).catch(function () {
            console.log("Deu ruim")
        });
    };


    var getAlunos = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/alunos/',
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('Json de resposta ==== >>>', response);
            $scope.alunos = response.data;
            return response.data;
        }).catch(function () {
            console.log("Deu ruim")
        });
    };
    var getAlunosByTurma = function (param) {
        return $http({
            method: 'GET',
            url: 'http://localhost/alunosPorTurma/'+param,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('Json de resposta ==== >>>', response);
            response.data.forEach(element => {
                $scope.al.push(element.Nome)
            });
            console.log('Scope al', $scope.al)
            return response.data;
        }).catch(function () {
            console.log("Deu ruim")
        });
    };
    var getAlunoProfByTurma = function (e) {
        return $http({
            method: 'GET',
            url: 'http://localhost/alunosByTurma/' + e.ID,
            headers: { 'X-Force-Content-Type': 'application/json' }

        }).then(function (response) {
            var resposta = jsonPrepare(response.data, e);
            console.log('prof ==> ', response.data)

            resposta.alunos.forEach(element => {
                $scope.alunos.push(element);
            });
            $scope.turmas =[];
            $scope.turmas.push(response.data[0]);
            $scope.prof.push(resposta.prof[0].Nome[0]);
        }).catch(function (response) {
            console.log('Não Funfou')
        })
    }

    getAlunos();
    getTurmas();
    getAllInform(); 




});

// angular.module('myApp', ['ngRoute']);
