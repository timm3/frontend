appDir.directive("myCarousel", function(){
	return{
		restrict:"E",
		controller: function($scope){
			  $scope.myInterval = 5000;
			  var slides = $scope.slides = [];
			  $scope.addSlide = function() {
			    var newWidth = 5 + slides.length;
			    slides.push({
			      image: '/static/img/back' + newWidth + '.jpg',
			      text: [['Registration','Regnow makes the class registration process simplefied.', 'Sign up today'],
			      	['Class Information', 'Easier way to get information about classes','Browse classes'],
			      	['Professor Rating','Easier way to get information about professors','Learn more']]
			      	[slides.length % 3]});
			  };
			  for (var i=0; i<3; i++) {
			    $scope.addSlide();
			  }
			  
		},
		templateUrl:"/static/partials/Carousel.html"
	};
});