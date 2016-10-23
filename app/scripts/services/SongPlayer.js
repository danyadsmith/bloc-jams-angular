/* global angular buzz */

(function(){
  function SongPlayer($rootScope, Fixtures){
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    this.SongPlayer = SongPlayer;

    /**
     * @description Buzz object audio file
     * @type { Object }
     */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @description Stops currently playing song and loads new audio file as currentBuzzObject
     * @param { Object } song
     */
    var setSong = function(song){
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
  
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentBuzzObject.bind("timeupdate", function(){
        $rootScope.$apply(function(){
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
     * @function getSongIndex
     * @description Gets the index of a given song in an album array.
     * @param { Object } song
     */
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    };

    /**
     * @function playSong
     * @description Plays selected song
     * @param  { Object } song 
     */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    var stopSong = function(song){
      currentBuzzObject.stop();
      song.playing = null;
    };

    /** 
     * @description  Active song object from list of songs
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /**
     * @description  Current playback time (in seconds) of currently playing song
     * @type { Number }
     */
    SongPlayer.currentTime = null;

    /**
     * @function SongPlayer.play
     * @description  Play the selected song
     * @param  {Object} song
     */
    SongPlayer.play = function(song){
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if(currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
     * @function SongPlayer.pause
     * @description Pause the currently playing song
     * @param { Object } song
     */
    SongPlayer.pause = function(song){
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function SongPlayer.previous
     * @description  Play the previous track
     */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0){
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length){
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
     * @function setCurrentTime
     * @description Set current time (in seconds) of currently playing song.
     * @param { Number} time
     */
    SongPlayer.setCurrentTime = function(time){
      if(currentBuzzObject){
        currentBuzzObject.setTime(time);
      }
    };

    return SongPlayer;
  }

  angular
    .module("blocJams")
    .factory("SongPlayer", [
      "$rootScope",
      "Fixtures",
      SongPlayer
    ]);
})();