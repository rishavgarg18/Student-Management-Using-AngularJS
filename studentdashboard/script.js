var login_check=sessionStorage.getItem("login_student");
var api=sessionStorage.getItem('backend_api')
var id=sessionStorage.getItem('student_id');
console.log(id);
var app= angular.module("student_dash",['ui.router'])
				.config(function ($stateProvider, $urlRouterProvider) {
					$stateProvider
								.state("profile",{
									url: '/profile',
									templateUrl: "profile.html",
									controller: "profilecontroller"
								})
								.state("your_query",{
									url: '/yourquery',
									templateUrl: "student_query.html",
									controller: "studentquerycontroller"
								})
								.state("addquery",{
									url: '/addquery',
									templateUrl: "add_query.html",
									controller: "addquerycontroller"
								})
								.state('root', {
									url: '/',
									templateUrl: "profile.html",
									controller :'profilecontroller'
							
								})
								$urlRouterProvider.otherwise('/');
						})
								.controller("profilecontroller",function($scope,$http){
					
					
            			 					$scope.student_data=function()
                         												{console.log('ok');
                           												 $http({
							                                                    method: 'POST',
							                                                    url: api+'/students/this_student/',
							                                                    data: {
							                                                            'student_id': id
							                                        
							                                                          }

                                                								})                 			

			
										            			         .then(
										      					                function (response){
										        				                $scope.studentdata = response.data;
										        				                console.log($scope.studentdata);
										        				                $scope.Name=$scope.studentdata[0].Name;
										        				                $scope.phone_no=$scope.studentdata[0].phone_no;
										        				                // $scope.mail_id=$scope.studentdata[0].mail_id;
										        				                $scope.course=$scope.studentdata[0].course;
										        				                $scope.Branch=$scope.studentdata[0].Branch;
										        				                $scope.Roll_no=$scope.studentdata[0].Roll_no;

										        				                console.log($scope.Name);
										        				                                   }
										            			              )}

                            			$scope.student_data();
                            				})
								.controller("studentquerycontroller",function($scope,$http){
                    
                    
					                         $scope.allquery=function()
					                         {
					                            $http({
					                            	method: 'POST',
                                                    url: api+'/query/student_viewquery/',
                                                    data: {
                                                            'student_id': id
                                                            
                 
                                        
                                                          }

                                                })
					            
					                                 .then(
					                                        function (response){
					                                        $scope.querys = response.data;
					                                        console.log($scope.querys);
					                                                           }
					                                      )}

					                            $scope.allquery();
											})
								.controller("addquerycontroller",function($scope,$http){
                    
                    
					                         $scope.addquery=function()
					                         {var id= sessionStorage.getItem('student_id');
					                            $http({
					                            	method: 'POST',
                                                    url: api+'/query/addquery/',
                                                    data: {
                                                            'student_id': id,
                                                            'query' : $scope.query
                                                            
                 
                                        
                                                          }

                                                })
					            
					                                 .then(
					                                        function (response){
					                                        $scope.queryresponse = response.data;
					                                        if ($scope.queryresponse=='success')
                                                    {
                                                        alert('Query Added Sucessfully');
                                                        window.location.href='welcome.html';

                                                    }
					                                                           }
					                                      )}

					                            
											})											