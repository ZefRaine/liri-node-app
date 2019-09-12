require("dotenv").config();
const keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
// creating a table of contents
// creating const ConcertThis
const ConcertThis = function () {
    //using our process.argv to search our Bandsintown API
    this.artistSearch = function (artist) {
        //the Bandsintown API url with our added artist input
        const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        // fullfils a promise to grab our url and grab the JSON response
        axios.get(queryUrl).then(function (response) {
            // displays a message if the band is currently not touring
            if (response.data.length < 1) {
                console.log("Band currently has no scheduled concerts")
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

// if the user types concert-this they will use the ConcertThis function
// creating const MovieThis
const MovieThis = function () {
    //using our process.argv to search our OMDB API
    this.movieSearch = function (title) {
        //the OMDB API url with our added title input
        const queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title
        // fullfils a promise to grab our url and grab the JSON response
        axios.get(queryUrl).then(function (response) {
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
const showSearch = new ConcertThis();
const filmSearch = new MovieThis();
const search = process.argv[2];
let term = process.argv[3];

function userSearch() {
    if (!search) {
        return console.log("Try 'Help'")
    }
    // if the user types concert-this they will use the ConcertThis function
    else if (search === "movie-this") {
        if (!term) {
            term = "Mr. Nobody"
        }
        filmSearch.movieSearch(term);

} else if (search === "concert-this") {
    if (!term) {
        console.log("Please provide Band/Artist name")
        return
    }
    showSearch.artistSearch(term);
}
}
userSearch();
// `do-what-it-says