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
				})
				.controller("studentLoginController",function($scope,$http){
					$scope.error="";	
					$scope.submit=function(){
						let email = $scope.email;
            			let Password = $scope.password;
            			// let url =  window.backend__url+"patient_login/login/"
            			$http({
                    			method: 'POST',
                    			url: 'http://5ef75fe8c045.ngrok.io/student/login/',
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
        					window.location.href="studentdashboard/welcome.html";
        				}
        				else
        				{
        					$scope.error=$scope.myWelcome;
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
                    			url: 'http://5ef75fe8c045.ngrok.io/teacher/login/',
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
        				}
        				else
        				{
        					$scope.error=$scope.myWelcome;
        				}
            			},
            			function (reason){
        				$scope.myWelcome = reason.data;
        				console.log($scope.myWelcome);
            		},
            		

            		)

        			}
            		})

            	