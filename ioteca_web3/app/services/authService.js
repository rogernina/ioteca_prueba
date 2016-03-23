app.factory('authService', function($q) {
    var _authentication = {
        isAuth: true,
        userName: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: ['User']
    };

    return {
        fillAuthData: function() {
            return $q.when(true);
        },

        authentication: _authentication,
    };
});





function checkSecurity(authService, $q, $location, security) {
    var settings = this.settings;
    var deferred = $q.defer();
    authService.fillAuthData().then(function() {
        if (settings) {
            var loginRequired = settings.loginRequired || false;
            var roles = settings.roles || [];
            if (settings.loginRequired) {
                if (!authService.authentication.isAuth) {

                    $location.path('/login');
                } else {
                    if (roles.length > 0) {
                        if (!security.checkRole(authService.authentication.roles, roles)) {
                            $location.path('/notauthorized').replace();
                        }
                    }
                }
            }
        }
        deferred.resolve(true); //We want to return just true even if we have to re-route. 
        //If we returned an reject, the the global handler will re-route us to home  
    }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
}



/*
backendApp.factory('authService', ['$http', '$q', 'localStorageService', 'config', function ($http, $q, localStorageService, config) {

    var serviceBase = config.baseUrl;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    };


    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=" + config.grant_type + "&client_id=" + 
        config.client_id + "&client_secret=" + config.client_secret + "&username=" + 
        loginData.userName + "&password=" + loginData.password;


        var deferred = $q.defer();

        $http.post(serviceBase + 'o/token/', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.userRetreived = false;
            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.userRetreived = false;
        _authentication.firstName = '';
        _authentication.lastName = '';
        _authentication.email = '';
        _authentication.roles.slice(0, _authentication.roles.length);

    };

    function getUserInfo() {
        return $http.get(serviceBase + 'configs/users/1/');
    }

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            if (!_authentication.userRetreived) {
                return getUserInfo().then(function (result) {
                    _authentication.userRetreived = true;
                    var userData = result.data;
                    console.log("eee");
                    console.log(userData);
                    _authentication.email = userData.email;
                    _authentication.roles = []; //userData.roles;
                    _authentication.firstName = userData.firstName;
                    _authentication.lastName = userData.lastName;
                });
            }

        }
        return $q.when(true);
    };



    var _saveRegistrationxxx = function (registration) {


        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };


    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);


*/
