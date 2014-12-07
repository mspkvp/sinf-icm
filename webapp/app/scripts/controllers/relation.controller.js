'use strict';

angular.module('icmApp')
	.controller('RelationCtrl', ['$scope', '$http', 'NavigationService', function($scope, $http, $nav){

		$nav.setPath([
			$nav.getPath()[0],
			{
				name: 'Gestão',
				icon:'',
				url: '/'
			},
			{
				name: 'Empresas',
				icon: '',
				url: ''
			}
		]);

		$scope.companies = [
			{
				id: 1,
				name: 'Empresa 1',
			},
			{
				id: 2,
				name: 'Empresa 2',
			},
			{
				id: 3,
				name: 'Empresa 3',
			},
			{
				id: 4,
				name: 'Empresa 4',
			},
			{
				id: 5,
				name: 'Empresa 5',
			},
			{
				id: 6,
				name: 'Empresa 6',
			}
		];

	}]);