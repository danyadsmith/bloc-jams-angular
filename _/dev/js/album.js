var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [ 
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21' },
    { title: 'Magenta', duration: '2:15' }
  ]
};

var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21' },
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

var albumPurpleRain = {
  title: 'Purple Rain',
  artist: 'Prince',
  label: 'Warner Bros.',
  year: '1984',
  albumArtUrl: 'assets/images/album_covers/22.jpg',
  songs: [
    { title: 'Let\'s Go Crazy', duration: '4:39' },
    { title: 'Take Me With U', duration: '3:54' },
    { title: 'The Beautiful Ones', duration: '5:14' },
    { title: 'Computer Blue', duration: '4:00' },
    { title: 'Darling Nikki', duration: '4:15' },
    { title: 'When Doves Cry', duration: '5:54' },
    { title: 'I Would Die 4 U', duration: '2:49' },
    { title: 'Baby I\'m A Star', duration: '4:25' },
    { title: 'Purple Rain', duration: '8:42' }
  ]
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;
var albumList = [albumPicasso, albumMarconi, albumPurpleRain];
var counter = 0;

var createSongRow = function(songNumber, songName, songLength){
  var template = 
      '<tr class="album-view-song-item">' + 
      '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + 
      '  <td class="song-item-title">' + songName + '</td>' + 
      '  <td class="song-item-duration">' + songLength + '</td>' + 
      '</tr>';

  var $row = $(template);

  var clickHandler = function(){
    var songNumber = $(this).attr('.data-song-number');

    if(currentlyPlayingSong){
      var currentlyPlayingContainer = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingContainer.html(currentlyPlayingSong);
    }
    if(currentlyPlayingSong !== songNumber){
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
    } else if (currentlyPlayingSong === songNumber){
      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
    }
  };

  var onHover = function(event){
    var songNumberContainer = $(this).find('.song-item-number');
    var songNumber = songNumberContainer.attr('data-song-number');

    if(songNumber !== currentlyPlayingSong){
      songNumberContainer.html(playButtonTemplate);
    }
  };

  var offHover = function(event){
    var songNumberContainer = $(this).find('.song-item-number');
    var songNumber = songNumberContainer.attr('data-song-number');

    if(songNumber !== currentlyPlayingSong){
      songNumberContainer.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  // #1
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  // #2
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  // #3
  $albumSongList.empty();

  // #4
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

$(document).ready(function() { 
  setCurrentAlbum(albumPicasso);
  albumCover = document.getElementById('album-cover'); 
});