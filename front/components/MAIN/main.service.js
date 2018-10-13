
/*angular.module('myApp', []).service('mainService', function ($scope, $http) {

    var getCor = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/cores',
            headers: { 'X-Force-Content-Type': 'application/json' }
        })
            .then(function (response) {
                $scope.cor = response.data;
            }).catch(function () {
                console.log("Deu Ruim");
            });
    };



    var postContato = function (contato) {

        $http({
            method: 'POST',
            url: 'http://localhost/contatos',
            data: contato,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then((response) => {
            console.log('Enviou');
        }).catch((response) => {
            console.log('Fiquei preso--->', response);

        });
    };


    var putContato = function (ID) {
        return $http({
            method: 'PUT',
            url: 'http://localhost/contatos/' + ID,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('Json de resposta ==== >>>', response.data)
            $scope.contatos = response.data;

        }).catch(function () {
            console.log("Deu ruim")
        });
    };

    var deleteContato = function (data) {
        console.log('DATA ENTRADA -->', data);
        return $http({
            method: 'DELETE',
            url: 'http://localhost/contatos/' + data.ID,
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('Json de resposta do delete ==== >>>', response);
        }).catch(function () {
            console.log("Deu ruim")
        });
    };

    var getUltimoContato = () => {

        return $http({
            method: 'GET',
            url: 'http://localhost/ultimo-contato',
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then((response) => {
            $scope.res = response.data;
        }).catch(() => {
            console.log('nao peguei o valor');

        });


    };
    var getContatos = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/contatos',
            headers: { 'X-Force-Content-Type': 'application/json' }
        }).then(function (response) {
            console.log('Json de resposta ==== >>>', response.data);
            $scope.contatos = response.data;
        }).catch(function () {
            console.log("Deu ruim")
        });
    };
    var getOperadoras = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost/operadoras',
            headers: { 'X-Force-Content-Type': 'application/json' }
        })
            .then(function (response) {
                $scope.operadora = response.data;
            }).catch(function () {
                console.log("Deu Ruim");
            });
    };
    $scope.title = 'Lista Telefonica';
    $scope.zeraCampos ={}
    $scope.contatos = [];
    $scope.operadora = [];
    $scope.cor = [];
    $scope.res = []; 

    $scope.isContatoSelecionado = function (e) {
        e.forEach(element => { 
            if (element.Selecionado)
            return true;  
        });
    }

    $scope.apagar = function (e) {
        $scope.contatos = e.filter(function (contato) {
            if (contato.Selecionado) { deleteContato(contato); return null;}
            return contato;
        }); 
        console.log('Novo array ++++>>>>>', $scope.contatos); 

    }   
   

    $scope.enviar = function (e) {
        debugger; 
        var cont = {
            Nome:e.Nome, 
            Telefone:e.Telefone, 
            Selecionado:0, 
            Cor:parseInt(e.Cor.ID), 
            Operadora:parseInt(e.Operadora.ID)
        };


        console.log(cont);
        postContato(cont);
        var ultimo = getUltimoContato(); 
        console.log('Resposta do ultimo contato ===>',ultimo);
        $scope.contatos.push(cont);
        delete $scope.e;
    }

   
    // cor 
    return {
        getCor: getCor(),
        getOperadoras: getOperadoras(),
        getContatos: getContatos()
    };


});*/