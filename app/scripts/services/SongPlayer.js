/* global angular buzz */

(function(){
  function SongPlayer(){
    var SongPlayer = {};

    this.SongPlayer = SongPlayer;

    /**
     * @desc Current Song
     * @type { Object }
     */
    var currentSong = null;
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
        currentSong.playing = null;
      }
  
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentSong = song;
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

    /**
     * @function SongPlayer.play
     * @description Public method that plays a selected song
     * @param { Object } song
     */
    SongPlayer.play = function(song){
      if(currentSong !== song){
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
        if(currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
     * @function SongPlayer.pause
     * @description Public method that pauses a currently playing song
     * @param { Object } song
     */
    SongPlayer.pause = function(song){
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module("blocJams")
    .factory("SongPlayer", SongPlayer);
})();