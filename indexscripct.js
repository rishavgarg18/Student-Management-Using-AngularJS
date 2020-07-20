    sessionStorage.setItem("login_teacher", "0");
sessionStorage.setItem("login_student", "0");
var api=sessionStorage.getItem('backend_api');
console.log(api);
var app= angular.module("LoginView",['ui.router'])
				.config(function ($stateProvider, $urlRouterProvider) {
					$stateProvider
								.state("studentLogin",{
									url: '/studentlogin',
									templateUrl: "login/studentLogin.html",
									controller: "studentLoginController"
								})
								.state("teacherLogin",{
									url: '/teacherlogin',
									templateUrl: "login/teacherLogin.html",
									controller: "teacherLoginController"
								})
                                .state('root', {
                                    url: '/',
                                    templateUrl: "default.html"
                                
                            
                                })
                                $urlRouterProvider.otherwise('/');			
				})
				.controller("studentLoginController",function($scope,$http){
					$scope.error="";	
					$scope.submit=function(){
						let email = $scope.email;
            			let Password = $scope.password;
            			// let url =  window.backend__url+"patient_login/login/"
            			$http({
                    			method: 'POST',
                    			url: api+'/students/login/',
                    			data: {
                        				'mail_id': email,
                        				'password': Password,
                     
                    					}

				})
            			.then(
      					function (response){
        				$scope.myWelcome = response.data;
        				console.log($scope.myWelcome);
        				if ($scope.myWelcome=="Invalid Credentials")
        				{   
                            $scope.error=$scope.myWelcome;
                            sessionStorage.setItem("login_student", "0");
        				}
        				else

        				{


                            sessionStorage.setItem('student_id', $scope.myWelcome[0].id);

                            window.location.href="studentdashboard/welcome.html";
                            sessionStorage.setItem("login_student", "1");
        					
        				}
            			},
            			function (reason){
        				$scope.myWelcome = reason.data;
        				console.log($scope.myWelcome);
            		},
            		

            		)

        			}
                })
					

				
				.controller("teacherLoginController",function($scope,$http){
					$scope.error="";	
					$scope.submit=function(){
						let email = $scope.email;
            			let Password = $scope.password;
            			// let url =  window.backend__url+"patient_login/login/"
            			$http({
                    			method: 'POST',
                    			url: api+'/teacher/login/',
                    			data: {
                        				'mailId': email,
                        				'password': Password,
                     
                    					}

				})
            			.then(
      					function (response){
        				$scope.myWelcome = response.data;
        				console.log($scope.myWelcome);
        				if ($scope.myWelcome=="OK")
        				{
        					window.location.href="teacherdashboard/welcome.html";
                            sessionStorage.setItem("login_teacher", "1");
        				}
        				else
        				{
        					$scope.error=$scope.myWelcome;
                            sessionStorage.setItem("login_teacher", "0");
        				}
            			},
            			function (reason){
        				$scope.myWelcome = reason.data;
        				console.log($scope.myWelcome);
            		},
            		

            		)

        			}
            		})

            	