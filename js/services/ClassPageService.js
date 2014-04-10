appServices.factory("ClassDetails", function($http){
	return{
		getData: function(){
			// console.log("called getData()");
			$http.get('/todoRetrieve')
				.success(function(data, status, headers, config){
					if(data.success){
						console.log(data);
					}
					else{
						console.log("Retrieval failed");
					}
				})
				.error(function(data, status, headers, config){
					console.log("error func: retrieval failed");
				});

		},
		postData: function(){
			// console.log("called postData()");
			// $http('/todoAdd', {
			// 	item:"idk if this can be used"
			// }).success(function(data, status, headers, config){
			// 		if(data.success){

			// 		}
			// 	});
		},
		examplePost: function(){
			console.log("post called");
			var data = {msg:"hi", num: 2};
			$http.post('/tmp', data).success(function(){
				console.log("post success called");
			});
		}
	}
});