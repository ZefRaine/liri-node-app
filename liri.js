require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

// creating const ConcertThis
const ConcertThis = function () {
    //using our process.argv to search our Bandsintown API
    this.artistSearch = function (artist) {
        //the Bandsintown API url with our added artist input
        const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        // fullfils a promise to grab our url and grab the JSON response
        axios.get(queryUrl).then(function (response) {
            // displays a message if the band is currently not touring
            if (response.length === undefined) {
                console.log("Sorry, try another band");
                return
            }
            // creating several const to hold our response data
            const venue = response.data[0].venue.name;
            //formatting the time of the event using moment.js
            const time = moment(response.data[0].datetime).format("MM/DD/YYYY");
            const city = response.data[0].venue.city;
            const country = response.data[0].venue.country;
            // logging our information with special formating
            // allows for readability
            console.log("------------",
                "\nVenue: " + venue,
                "\n\nLocation: " + city + ", " + country,
                "\n\nTime: " + time,
                "\n------------")
        })
    }
};

const SpotifyThis = function (term) {
    spotify.search({
        type: 'track',
        query: term
    }, function (err, data) {
        if (err) {
            return console.log('Sorry, try another song');
        }
        const song = data.tracks.items[0].name;
        const band = data.tracks.items[0].album.artists[0].name;
        const link = data.tracks.items[0].external_urls.spotify;
        const album = data.tracks.items[0].album.name;
        console.log("------------",
            "\nSong: " + song,
            "\n\nBand/Artist: " + band,
            "\n\nAlbum: " + album,
            "\n\nLink: " + link,
            "\n------------")
    })
};

// creating const MovieThis
const MovieThis = function () {
    //using our process.argv to search our OMDB API
    this.movieSearch = function (title) {
        //the OMDB API url with our added title input
        const queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title
        // fullfils a promise to grab our url and grab the JSON response
        axios.get(queryUrl).then(function (response) {
            if (response.length === undefined) {
                console.log("Sorry, try another title")
                return
            };
            // creating several const to hold our response data
            const Title = response.data.Title;
            const Released = response.data.Released;
            const imdbRatings = response.data.Ratings[0].Value;
            const IMDB = response.data.Ratings[0].Source;
            const rottenRatings = response.data.Ratings[1].Value;
            const rottenTomatoes = response.data.Ratings[1].Source;
            const Country = response.data.Country;
            const Language = response.data.Language;
            const Plot = response.data.Plot;
            const Actors = response.data.Actors;
            console.log("------------",
                "\nTitle: " + Title,
                "\n\nRelease: " + Released,
                "\n\nRatings: " + imdbRatings + ", " + IMDB,
                "\n\nRatings: " + rottenRatings + ", " + rottenTomatoes,
                "\n\nCountry: " + Country,
                "\n\nLanguage: " + Language,
                "\n\nPlot: " + Plot,
                "\n\nStarring: " + Actors,
                "\n------------")
        })
    }
};

function doThis(command, instructions) {
    if (command === "do-what-it-says") {
        console.log(instructions);
    } else {
        console.log(SpotifyThis(instructions));
    }
}

fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    const command = data.split(" ")[0];
    const instructions = data
        .split(" ")
        .slice(1)
        .join(" ");
    doThis(command, instructions);
});

const showSearch = new ConcertThis();
const filmSearch = new MovieThis();
const searching = process.argv[2];
let term = process.argv.slice(3).join(" ");

function userSearch(searching, term) {
    if (!searching) {
        return console.log("\n------------",
            "\nTry one of these:",
            "\n\nconcert-this 'Band/Artist'",
            "\nProvides info on the artist's next concert",
            "\n\nspotify-this-song 'Song Title'",
            "\nProvides info on  the song choosen",
            "\n\nmovie-this 'Movie Title'",
            "\nProvides info on the movie choosen",
            "\n\ndo-what-it-says",
            "\nTry it and find out",
            "\n------------")
    }
    // if the user types concert-this they will use the ConcertThis function
    else if (searching === "movie-this") {
        if (!term) {
            term = "Mr. Nobody"
        }
        filmSearch.movieSearch(term);

    } else if (searching === "concert-this") {
        if (!term) {
            console.log("Please provide Band/Artist name")
            return
        }
        showSearch.artistSearch(term);
    } else if (searching === "spotify-this-song") {
        if (!term) {
            term = "Dare to Be Stupid"
        }
        SpotifyThis(term);
    }
}
userSearch(searching, term);
// `do-what-it-says