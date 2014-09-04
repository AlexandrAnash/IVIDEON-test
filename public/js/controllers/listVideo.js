var videoControllers = angular.module('videoControllers', []);

videoControllers.controller('listVideoCtrl', ['$scope', '$http', '$resource', 'videoXHRService', 
  function ($scope, $http, $resource, videoXHRService) {

  	$scope.xhrData = {};
    $scope.data = {};
    $scope.isFullCamera = false;
    $scope.chooseCamera = {};
	$scope.chooseCameraKey = -1;
	$scope.videoList = {};
	function loadCamera (next) {
		var url = "http://api.ivideon.com/tv/cameras?jsonp=JSON_CALLBACK";
		console.log("DA",next);

		if (next){
			console.log("DA");
			url += "&seed" + next;
		}

	    videoXHRService.getData(url).then(function(data) {
	        var xhrData = angular.fromJson(data);
	        var videoList = [];
	        _.each(xhrData.response.cameras, function (value, key) {
	        	value.img = "img/Avatar.jpg";
				value.count = 1;
				value.bookmark = false;

	        	console.log('test',xhrData.response.seeds.next);
	        })
	        $scope.videoListNext = xhrData.response.seeds.next;
	        (next) ? $scope.videoList = $scope.videoList.concat(xhrData.response.cameras) : $scope.videoList = xhrData.response.cameras;
	    });

	}
    loadCamera();
    $scope.$watch('videoList', function () {	
	    console.log("videoList", $scope.videoList );
    })
    $scope.editBookmark = function (data, key) {
    	console.log("key",key);
    	data.bookmark = !data.bookmark;
		$scope.getUrlImgCamera(data);
		// $scope.$apply();

    }
    function getQuery(server_id, camera_id) {
		var query =  "https://streaming.ivideon.com/preview/live?server=" 
		+ server_id + "&camera=" + camera_id; 
		return query;
    }
    $scope.getUrlImgCamera = function (data, key) {
		if (key) {
			data.img = getQuery(data.server, data.camera);
		} else {
			_.each($scope.videoList, function (val,index) {
				val.img = getQuery(val.server, val.camera);
			})
		}

    	// if ($scope.videoList[key].count % 2 == 1)
    	// else
    		// $scope.videoList[key].img = "img/Avatar.jpg";
    	// videoXHRService.getData(query).then(function(data) {
	    //     console.log('data',data);
	    // });
		// return query;
    	
    }
    setInterval(function () {
		if ($scope.isFullCamera) {
			$scope.getUrlImgCamera($scope.chooseCamera, $scope.chooseCameraKey)
			$scope.$apply();
		}
    }, 2000);
    $scope.showFullCamera = function (data, key) {
    	if (Object.getOwnPropertyNames($scope.chooseCamera).length > 0) {
	    	if ($scope.chooseCamera == data) {
	    		$scope.isFullCamera = !$scope.isFullCamera
	    		$scope.chooseCameraKey = -1;
	    		$scope.chooseCamera = {};
	    	} else {
	    		$scope.chooseCameraKey = key;
	    		$scope.chooseCamera = data;
	    	}
		} else {
			$scope.isFullCamera = !$scope.isFullCamera
    		$scope.chooseCameraKey = key;
    		$scope.chooseCamera = data;
		}
    }
	$scope.bookmarksite = function (title,url){
		if (window.sidebar) {
			window.sidebar.addPanel(title, url, "");
		} else if(window.opera && window.print){ // opera
			var elem = document.createElement('a');
			elem.setAttribute('href',url);
			elem.setAttribute('title',title);
			elem.setAttribute('rel','sidebar');
			elem.click();
		} 
		else if(document.all) {
			console.log('test');
			window.external.AddFavorite(url, title);
		}
	}
	$scope.checkShowDetails = function () {
	}
	$scope.toggleOpen = function () {
	}

	$scope.getMoreCamera = function () {
		console.log($scope.videoListNext);
		loadCamera($scope.videoListNext);
	}

 //    $scope.bookmark = function (title, href) {
 //    	href = "http://www" + href;
	//     if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
	//         window.sidebar.addPanel(title,href,'');
	//     } else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
	//         window.external.AddFavorite(href,title); 
	//     } else if(window.opera && window.print) { // Opera Hotlist
	//         this.title=title;
	//         return true;
	//     } else { // webkit - safari/chrome
	//         alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
	//     }
	// }
	//  = function (title, url) {
 //    	console.log('test');
 //    	url = "http://www" + url;
	//     if(document.all) { // ie
	//         window.external.AddFavorite(url, title);
	//     }
	//     else if(window.sidebar) { // firefox
	//         window.sidebar.addPanel(title, url, "");
	//     }
	//     else if(window.opera && window.print) { // opera
	//         var elem = document.createElement('a');
	//         elem.setAttribute('href',url);
	//         elem.setAttribute('title',title);
	//         elem.setAttribute('rel','sidebar');
	//         elem.click(); // this.title=document.title;
	//     }
	// }



  }]);
