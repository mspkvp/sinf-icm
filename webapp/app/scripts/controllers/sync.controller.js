'use strict';

angular.module('icmApp')
	.controller('SyncCtrl', ['$scope', '$http', 'NavigationService', function($scope, $http, $nav){

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

		$scope.items = [
			{
				id:1,
				description:'Kebab Remover'
			},
			{
				id:2,
				description:'Look at what the cat dragged in'
			},
			{
				id:3,
				description:'What are noob?'
			},
			{
				id:4,
				description:'Does the carpet match the drapes?'
			},
			{
				id:5,
				description:'Filthy Casuals'
			}];
	}]);