(function () {
    angular.module('pdProva')
        .controller('UserController',UserController);

    UserController.$inject = ['$scope','AlertService'];

    function UserController($scope, AlertService) {
        $scope.titulo = 'Prodata Informática';
        $scope.entidade = {};
        $scope.listaUsers = [];

        $scope.salvar = salvar;
        $scope.limpar = limpar;
        $scope.excluir = excluir;

        $scope.gridOptions = {
            columnDefs: [
                {name:'nome', field:'nome', minWidth:230},
                {name:'login', field:'login', minWidth:230},
                {name:'email', field:'email', minWidth:230},
                //{name:'password', field:'password'},
                //{name:'confirmPassword', field:'confirmPassword'},
                {name:'', field:'excluir',
                    cellTemplate:'app/template/grid/cell-template-excluir.html'
                    , minWidth:230}
            ],
            data:'listaUsers',
            enableColumnMenus: false
        };

        function salvar() {
            if($scope.userForm.$invalid){
                $scope.userForm.nome.$setTouched();
                $scope.userForm.login.$setTouched();
                $scope.userForm.email.$setTouched();
                $scope.userForm.password.$setTouched();
                $scope.userForm.confirmPassword.$setTouched();

                AlertService.error('Formulário inválido');
                return;
            }

            $scope.listaUsers.push($scope.entidade);
            console.log($scope.listaUsers)
            AlertService.success('Registro salvo com sucesso!');
            limpar();
        }

        function limpar() {
            $scope.entidade = {};
            $scope.userForm.$setUntouched();

            angular.element('#nome').focus();
        }

        function excluir(linha) {
            var index = $scope.listaUsers.indexOf(linha);

            $scope.listaUsers.splice(index, 1)
        }
    }
})();

