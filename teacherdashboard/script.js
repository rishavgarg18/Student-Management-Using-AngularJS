var login_check=sessionStorage.getItem("login_teacher");
var api=sessionStorage.getItem('backend_api')
var app= angular.module("teacher_dash",['ui.router'])
				.config(function ($stateProvider, $urlRouterProvider) {
					$stateProvider
								.state("all_student",{
									url: '/allstudent',
									templateUrl: "allstudent.html",
									controller: "allstudentcontroller"
								})
								.state("add_student",{
									url: '/addstudent',
									templateUrl: "addstudent.html",
									controller: "addstudentcontroller"
								})
                                .state("query",{
                                    url: '/query',
                                    templateUrl: "query.html",
                                    controller: "querycontroller"
                                })
                                .state('root', {
                                    url: '/',
                                    templateUrl: "default.html"
                                
                            
                                })
                                $urlRouterProvider.otherwise('/');
                                
				})
				.controller("allstudentcontroller",function($scope,$http){
					
					
            			 $scope.allstudent=function()
                         {
                            $http.get(api+'/students/viewStudents/')                 			

			
            			         .then(
      					                function (response){
        				                $scope.students = response.data;
        				                console.log($scope.students);
        				                                   }
            			              )}
                            $scope.allstudent();
                    $scope.deletestudent= function(id)
                                        {
                                            console.log(id);
                                            $http({
                                                    method: 'POST',
                                                    url: api+'/students/delet_student/',
                                                    data: {
                                                            'student_id': id
                                        
                                                          }

                                                })
                                            .then(
                                                    function (response){
                                                    $scope.message = response.data;
                                                    console.log($scope.message);


                        
                                                })
                                        }
                    $scope.editstudentid=function(editid)
                                                        {
                                                        sessionStorage.setItem('editid',editid)
                                                        console.log(editid)
                                                        }
                    })
                .controller("editstudentcontroller",function($scope,$http){
                    
                    $scope.getstudentdata= function()
                                           {
                                            var id=sessionStorage.getItem('editid');
                                            console.log(id);
                                            $http({
                                                    method: 'POST',
                                                    url: api+'/students/this_student/',
                                                    data: {
                                                            'student_id': id,
                                                            
                                        
                                                          }

                                                })
                                            .then(
                                                    function (response){
                                                    $scope.message = response.data;
                                                    console.log($scope.message);
                                                    console.log($scope.message[0].Name);
                                                    $scope.Name=$scope.message[0].Name;
                                                    $scope.phone_no=$scope.message[0].phone_no;
                                                    $scope.mail_id=$scope.message[0].mail_id;
                                                    $scope.password=$scope.message[0].password;
                                                    $scope.Branch=$scope.message[0].Branch;
                                                    $scope.course=$scope.message[0].course;
                                                    $scope.Roll_no=$scope.message[0].Roll_no;
                                                    console.log($scope.Name);



                        
                                                })}
                                            $scope.getstudentdata();
                                            
                            
                    $scope.sendupdate=function()
                    {var id =sessionStorage.getItem('editid');
                        $http({
                                                    method: 'POST',
                                                    url: api+'/students/edit_student/',
                                                    data: {
                                                            'student_id': id,
                                                            'Name': $scope.Name,
                                                            'phone_no': $scope.phone_no,
                                                            'mail_id': $scope.mail_id,
                                                            'password': $scope.password,
                                                            'Branch': $scope.Branch,
                                                            'course': $scope.course,
                                                            'Roll_no':$scope.Roll_no
                                        
                                                          }

                                                })
                                            .then(
                                                    function (response){
                                                    $scope.message = response.data;
                                                    console.log($scope.message);
                                                    if ($scope.message=='OK')
                                                    {
                                                        alert('Updated Sucessfully');
                                                        window.location.href='welcome.html';

                                                    }


                        
                                                })}})
                                            
                .controller('addstudentcontroller',function($scope,$http){
                    
                    $scope.add_student=function () {

                                                $http({
                                                        method: 'POST',
                                                        url: api+'/students/add/',
                                                        data: {
                                                                'Name': $scope.Name,
                                                                'phone_no': $scope.phone_no,
                                                                'mail_id': $scope.mail_id,
                                                                'password': $scope.password,
                                                                'Branch': $scope.Branch,
                                                                'course': $scope.course,
                                                                'Roll_no':$scope.Roll_no
                                             
                                                                }

                                                    })
                                                .then(
                                                function (response){
                                                $scope.message = response.data;
                                                console.log($scope.message);
                                                if($scope.message=='OK')
                                                {
                                                    alert('Student Added Sucessfully')
                                                    location.reload();

                                                }
                                        
                                                })



                                                    }
                                                                        })
                .controller("querycontroller",function($scope,$http){
                    
                    
                         $scope.allquery=function()
                         {
                            $http.get(api+'/query/teacher_viewquery/')                            

            
                                 .then(
                                        function (response){
                                        $scope.querys = response.data;
                                        console.log($scope.querys);
                                                           }
                                      )}

                            $scope.allquery();
             $scope.queryid=function(queryid)
                                                        {
                                                        sessionStorage.setItem('queryid',queryid)
                                                        console.log(queryid)
                                                        }
            $scope.sendanswer=function()
                    {var id =sessionStorage.getItem('queryid');
                        $http({
                                                    method: 'POST',
                                                    url: api+'/query/teacher_answer_viewquery/',
                                                    data: {
                                                            'id': id,
                                                            
                                                            'answer':$scope.answer
                                        
                                                          }

                                                })
                                            .then(
                                                    function (response){
                                                    $scope.message = response.data;
                                                    console.log($scope.message);
                                                    if ($scope.message=='success')
                                                    {
                                                        alert('Updated Sucessfully');
                                                        window.location.href='welcome.html';

                                                    }


                                                    })
                                        }})

            		
					

				
			


