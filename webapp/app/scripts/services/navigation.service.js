'use strict';

angular.module('icmApp')
	.service('NavigationService', [function service(){
		var _path = [
			{
				name:'Main',
				icon:'glyphicon glyphicon-th-large',
				url:'#'
			},
			{
				name:'Test',
				icon:'',
				url:'#'
			},
			{
				name:'Breadcrumb',
				icon:''
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

	}]);