/* global angular, albumPicasso  */

(function(){
  function AlbumCtrl(Fixtures){
    Fixtures.getAlbum();
  }

  angular
    .module("blocJams")
    .controller("AlbumCtrl", [
      "Fixtures",
      AlbumCtrl
    ]);
})();