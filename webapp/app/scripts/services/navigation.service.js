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

		var _viewingCompany = undefined;
		var _redirection = undefined;
		var _companies = [
			{
				"id" : "EMP1",
				"name" : "FOObin"
			},
			{
				"id" : "EMP2",
				"name" : "PixFlag"
			},
			{
				"id" : "EMP3",
				"name" : "SINFTech"
			},
			{
				"id" : "EMP4",
				"name" : "botNET"
			},
			{
				"id" : "EMP5",
				"name" : "Bragaboard"
			}
		];

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
		};

		this.setViewingCompany = function setViewingCompany(company){
			_viewingCompany = company;
			console.log('Company was Set!', _viewingCompany);
		};

		this.getViewingCompany = function getViewingCompany(){
			return _viewingCompany;
		};

		this.go = function go(route){
			$location.path('/'+route);
		};

		this.setRedirection = function setRedirection(route){
			_redirection = route;
		};

		this.redirect = function redirect(){
			if(_redirection){
				var tmpRoute = _redirection;
				_redirection = undefined;
				this.go(tmpRoute);
			}	
		};

		this.getCompanies = function(){
			return _companies;
		}
	}]);
