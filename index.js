
const express = require("express");
const app = express();
const util = require("util");

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.post("/api", (req, res) => {
    console.log(req.body);
    var userSearchMovie = req.body.movieInput;
    console.log(userSearchMovie);
    console.log(req.body.genreInput);

    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {

        var country = "United States";
        var userSearch = "Titanic";
        var startDate = "2019-01-27";
        var endDate = "2019-10-29";
        var limit = "1";
        var boxFrequency = "Daily";
        // var apiCall;

        var subGenreInput = "super"; // user input,
        // if user input for subGenre is empty, then subgenre will be emptied out
        var subGenre;
        if (subGenreInput !== null && subGenreInput !== "") {
            subGenre = "%20AND%20work_keyword_od_name%20like%20(%22" + subGenreInput + "%%22)";
        } else {
            subGenre = "";
        };
        var movieGenre = "/movie_extended_summaries?merge=movie_genre,country,work_keyword&filter=movie_genre_od_name%20like%20(%22" + userSearch + "%%22)%20AND%20country_od_name%20like%20(%22" + country + "%%22)%20AND%20release_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22" + subGenre + "&limit=" + limit;

        var movieRange = "/movie_theatrical_chart_entries?merge=country&filter=chart_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20country_od_name%20like%20(%22" + country + "%%22)";
        
        // If user selects a date range:
        var movieDateFilter = "%20AND%20chart_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22";
        // If user selects "Summary":
        var movieSummary = "/movie_financial_summaries?filter=movie_display_name%20like%20(%22" + userSearch + "%%22)";

        var movieBox = "/movie_theatrical_chart_entries?filter=movie_display_name%20like%20(%22" + userSearch + "%%22)%20AND%20movie_chart_type_od_name=%22" + boxFrequency + "%22" + movieDateFilter;

        // If user is in tab "movie", apiCall = movieBox.
        // If user is in tab "genre", apiCall = movieGenre.
        // If user is in tab "weekend", apiCall = movieRange.
        const dataURL = "http://" + response.data.server + movieBox;
        const options = {
        headers: {"Authorization": "opusdata " + response.data.session_id}
        };
        console.log(dataURL);
        axios.get(dataURL, options).then(function(data) {
            // res.json(util.inspect(data.data[0]));
            console.log(data.data.length);
            for (var i = 0; i < data.data.length; i++) {
                console.log(data.data[i]);
            }
            res.json(util.inspect(data.data));
        });
    });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});