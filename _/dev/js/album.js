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

var createSongRow = function(songNumber, songName, songLength){
  var template = 
      '<tr class="album-view-song-item">' + 
      '  <td class="song-item-number">' + songNumber + '</td>' + 
      '  <td class="song-item-title">' + songName + '</td>' + 
      '  <td class="song-item-duration">' + songLength + '</td>' + 
      '</tr>';

  return template;
};

var setCurrentAlbum = function(album) {
  // #1
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

  // #2
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  // #3
  albumSongList.innerHTML = '';

  // #4
  for (var i = 0; i < album.songs.length; i++) {
     albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

var albumList = [albumPicasso, albumMarconi, albumPurpleRain];
var counter = 0;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
    albumCover = document.getElementById('album-cover');
    albumCover.addEventListener("click", function(event){   
      //console.log(event);
      setCurrentAlbum(albumList[counter]);
      counter++;
      if(counter >= albumList.length){ counter = 0; }
  }, false);
};