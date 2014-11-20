'use strict';

angular.module('icmApp')
	.service('NavigationService', [function service(){
		var _path = ['Main', 'Test', 'Breadcrumb'];

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

	}]);