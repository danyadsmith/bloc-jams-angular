var buildCollectionItemTemplate = function(){
  var template = '  <div class="collection-album-container">' +
    '<img src="assets/images/album_covers/01.png" alt="Album Cover">' +
    '<div class="collection-album-info caption">' +
    '<p>' +
    '<a href="album.html" class="album-name">The Colors</a>' +
    '<br>' +
    '<a href="album.html">Pablo Picasso</a>' +
    '<br />' +
    'X songs' +
    '<br />' +
    '</p>' +
    '</div>' +
    '</div>';
  return $(template);
};

$(window).load(function(){
  var $collectionContainer = $('.album-covers');
  $collectionContainer.empty();
  for(var i = 0; i < 12; i++){
    var $newThumbnail = buildCollectionItemTemplate();
    $collectionContainer.append($newThumbnail);
  }
});