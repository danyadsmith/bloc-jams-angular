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

var findParentByClassName = function(element, parentClassName){
  var parentElement;
  if(element){
    parentElement = element.parentElement || null;
    if(parentElement === null){ console.log("No parent found for " + element + "."); 
    } else {
      while(parentElement.className !== parentClassName && parentElement.className !== null){
        parentElement = parentElement.parentElement;
      }
      if(parentElement.className !== parentClassName){ console.log("No parent found with the class name " + parentClassName + "."); 
        return parentElement;
      } else {
        console.log("No " + element + " element found.");
      }
    }
  }
};

var getSongItem = function(element){
  switch (element.className) {
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
          return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
          return element.querySelector('.song-item-number');
      case 'song-item-title':
      case 'song-item-duration':
          return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      case 'song-item-number':
          return element;
      default:
          return;
  }  
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } 
  else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  }
  else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  albumCover = document.getElementById('album-cover');
  songListContainer = document.getElementsByClassName('album-view-song-list')[0];
  songRows = document.getElementsByClassName('album-view-song-item');

  albumCover.addEventListener("click", function(event){   
    //console.log(event);
    setCurrentAlbum(albumList[counter]);
    counter++;
    if(counter >= albumList.length){ counter = 0; }
  }, false);

  songListContainer.addEventListener('mouseover', function(event){
    //console.log(event.target);
    if(event.target.parentElement.className === 'album-view-song-item'){
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      var songItem = getSongItem(event.target);
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }      
    }
  });

  for(var i = 0; i < songRows.length; i++){
    songRows[i].addEventListener('mouseleave', function(event){
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
         songItem.innerHTML = songItemNumber;
      }
    });

    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });    
  }
};