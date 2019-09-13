# liri-node-app
## Developed by Zeph Tambornino
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. This app is designed to pull the most important bits of information from several APIs and log it into the console using Node.JS. This is for self-educational purposes and also serving a practical function.

### The Overview
The APIs utilized in this application are from Bands in Town, Spotify, and OMDB. Their usage is to give the following information for each search:

1. `Bands in Town`
     * Name of the venue

     * Venue location

     * `Date` of the Event (uses `moment.js` to format as "MM/DD YYYY")


2. `Spotify`
     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from


3. `OMDB`
     * Title of the movie.

     * Year the movie came out.

     * IMDB Rating of the movie.

     * Rotten Tomatoes Rating of the movie.

     * Country where the movie was produced.

     * Language of the movie.

     * Plot of the movie.

     * Actors in the movie.


4. `Output Log`
     * In addition to logging the data to your terminal/bash window, outputs the data to a .txt file called `log.txt`.

### Instructions
1. `Meet LIRI`
     * _Language_ Interpretation and Recognition Interface

     * type Node Liri to see different search fields and information on what they do

     * after Node Liri add `concert-this`, `spotify-this-song`, `movie-this`, or `do-what-it-says` plus your search term to search for information

### Screenshots & Gifs

### Technologies Used
*
     * `Node.js`
     * `dotenv` package
     * `axios` package
     * `moment.js` package
     * `Bandsintown`, `Spotify`, & `OMDB` APIs/Packages

