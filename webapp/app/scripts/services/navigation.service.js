'use strict';

angular.module('icmApp')
	.service('NavigationService', ['$location', 'UserService', function service($location, $user){
		var _path = [
			{
				name:'Home',
				icon:'glyphicon glyphicon-th-large',
				url:'/'
			}
		];

		var _viewingCompany = {};

		this.getPath = function getPath(){
			return _path;
		};

		this.addPath = function addPath(item){
			return _path.push(item);
		};

		this.pathRmvLast = function pathRmvLast(){
			return _path.pop();
		};

		this.setPath = function setPath(path){
			_path = path;
		};

		this.resetPath = function resetPath(){
			_path = [_path[0]];
		}
		this.setViewingCompany = function setViewingCompany(company){
			_viewingCompany = company;
			console.log('Company was Set!', _viewingCompany);
		};

		this.go = function go(route){
			$location.path('/'+route);
		};

	}]);