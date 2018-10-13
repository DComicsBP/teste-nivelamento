angular.module('myApp', []).controller('mainController', function ($scope, $http) {

    $scope.title = ['Lista de Alunos', 'Professor', 'Turma'];
    $scope.teste = [];
    $scope.alunos = [];
    $scope.turmas = [];
    $scope.nomeProfTurma = [];
    $scope.idTurma = "";
    $scope.professores = null;
    $scope.all; 
    $scope.prof = null; 

    
    var jsonPrepare = function(a, e){
        $scope.alunos = []
        var al=[]; 
        var prof; 
        for (let index = 0; index < a.length; index++) {
            const element = a[index];
            var alunosAux = {
             "Selecionado": false,
             "ID_turma": e.ID, 
             "Nome": element.NOME_ALUNO,
             "ID ": element.ID_ALUNO
             }

             $scope.alunos.push(alunosAux); 
             $scope.professores = 
                 {"Nome": element.NOME_PROFESSOR,
                  "ID": e.ID_Professor
                 }; 
     }
     return [$scope.professores, $scope.alunos]

     
    }

    $scope.selectTurma = async function (e) {
        $scope.alunos = []; 
        console.log('E ===> ', e); 
        console.log('E ===> ',$scope.all ); 

        if (e.ID !== 0){
             getAlunoProfByTurma (e.ID);
             await console.log(jsonPrepare($scope.all, e))
    }  else {getAlunos();}
            
                  
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
        console.log('Novo array ++++>>>>>', $scope.alunos);

    };

    $scope.enviar = function (e) {

        delete $scope.e;
        var al = {
            nome: e.nome,
            turma: e.turma.ID
        };
        postAluno(al);
        

        getAlunoProfByTurma (al.turma.ID);
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

    $scope.turma = "";
    /*
    var getTurma = function (id) {
        return $http({
            method: 'GET',
            url: 'http://localhost/turmas/id',
            data: $scope.aluno,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then((response) => {
            $scope.turma = response.data;
        }).catch((response) => {
            console.log("Deu ruim!!");
        });

    }
*/
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

    var getProfByTurma = function (id) {
       
        return $http({
            method: 'GET',
            url: 'http://localhost/professorByTurma/' + id,
            async: true,
            headers: { 'X-Force-Content-Type': 'application/json' }

        }).then(async function (response) {
            console.log('Funfou')
            console.log('Response => ', response)
            return await response.data;
           
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
            console.log('Json de resposta getTurmas ==== >>>', response.data);
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

    var getAlunoProfByTurma = function (id) {
      
        return $http({
            method: 'GET',
            url: 'http://localhost/alunosByTurma/' + id,
            async: true,   
            headers: { 'X-Force-Content-Type': 'application/json' }

        }).then(function (response) {
            $scope.all = response.data;
            console.log('Funfou');
            return response.data;
        }).catch(function (response) {
            console.log('Não Funfou')
        })
    }

    getAlunos();
    getTurmas();
   


});

