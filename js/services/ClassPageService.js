appServices.factory("ClassDetails", function($http){
	return{
		getData: function(){
			console.log("called getData()");
			$http({
			    url: "/tmp", 
			    method: "GET",
			    params: {user_id: 2}
			 }).success(function(data, status, headers, config){
					console.log("got data");
					console.log("DATA:" + data);
					console.log(config.params);
				});

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