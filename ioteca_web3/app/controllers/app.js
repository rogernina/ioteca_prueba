app

    .controller("AppCtrl", function($scope, $mdSidenav, $timeout, $rootScope, $window,
        $document, $log, menuService, $mdBottomSheet, $mdToast) {

    $scope.menu = menuService;
    // config
    $scope.app = {
        name: 'AppName',
        version: '1.0.1',

        setting: {
            theme: {
                primary: 'indigo',
                accent: 'purple',
                warn: 'amber'
            },
            asideFolded: false
        },
        search: {
            content: '',
            show: false
        }
    };

    $scope.setTheme = function(theme) {
        $scope.dynamicTheme = theme;
        $scope.app.setting.theme = theme;
    };



    $rootScope.$on('$stateChangeSuccess', openPage);

    function openPage() {
        $scope.closeAside();
    }

    $scope.goBack = function() {
        $window.history.back();
    };

    $scope.openAside = function() {
        console.log("open aside");
        $timeout(function() { $mdSidenav('aside').open(); });
    };
    $scope.closeAside = function() {
        console.log("close aside");
        $timeout(function() { $mdSidenav('aside').close(); });
    };




  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'app/views/partials/bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: true
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .textContent(clickedItem['name'] + ' clicked!')
              .position('top right')
              .hideDelay(1500)
          );
    });
  };


});

app
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangoutx name', icon: 'hangout' },
    { name: 'xMail name', icon: 'mail' },
    { name: 'Message name', icon: 'message' },
    { name: 'Copy name', icon: 'copy2' },
    { name: 'Facebook name', icon: 'facebook' },
    { name: 'Twitter name', icon: 'twitter' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
;
