/* global angular, albumPicasso  */

(function(){
  function CollectionCtrl(Fixtures){
    this.albums = Fixtures.getCollection(18);
  }

  angular
    .module("blocJams")
    .controller("CollectionCtrl", [
      "Fixtures",
      CollectionCtrl
    ]);
})();