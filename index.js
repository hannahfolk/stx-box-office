
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
    var country = "United States";
    var week = req.body.week;
    var dayOfWeek = req.body.dayOfWeek;
    var startDate = "2019-01-27";
    var endDate = "2019-10-29";
    var movieInput = req.body.movieInput;
    var boxFrequency = req.body.boxFrequency;
    var numYearsInput = req.body.numYearsInput;
    var weekRevInput = req.body.weekRevInput;
    var genreInput = req.body.genreInput;
    var subGenre;
    var subGenreInput = req.body.subGenreInput;
    var limitInput = req.body.limitInput;
    var genreRevInput = req.body.genreRevInput;

    var movieBox;
    var movieGenre;
    var movieRange;
    var movieSummary;
    var movieDateFilter;

    console.log(week);
    console.log(dayOfWeek);
    console.log(movieInput);
    console.log(boxFrequency);
    console.log(numYearsInput);
    console.log(weekRevInput);
    console.log(genreInput);
    console.log(subGenreInput);
    console.log(limitInput);
    console.log(genreRevInput);
    
    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {
        var dataURL;
        // var apiCall;
        if (subGenreInput !== "") {
            subGenre = "%20AND%20work_keyword_od_name%20like%20(%22" + subGenreInput + "%%22)";
        } else {
            subGenre = "";
        };

        var movieGenre = "/movie_extended_summaries?merge=movie_genre,country,work_keyword&filter=movie_genre_od_name%20like%20(%22" + genreInput + "%%22)%20AND%20country_od_name%20like%20(%22" + country + "%%22)%20AND%20release_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22" + subGenre + "&limit=" + limitInput;

        var movieRange = "/movie_theatrical_chart_entries?merge=country&filter=chart_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20country_od_name%20like%20(%22" + country + "%%22)";

        // =================== FOR THE MOVIE TAB ===================== //
        if (movieInput !== "") {
          // If user selects a date range (if boxFrequency === "daily," "weekend," or "weekly"), add movieDateFilter to movieBox and use movieBox
          if (startDate !== "") {
            // Set the movieDateFilter using start and end date
            movieDateFilter = "%20AND%20chart_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22";

            // Add the movieDateFilter into the movieBox URI
            movieBox = "/movie_theatrical_chart_entries?filter=movie_display_name%20like%20(%22" + movieInput + "%%22)%20AND%20movie_chart_type_od_name=%22" + boxFrequency + "%22" + movieDateFilter;

            dataURL = "http://" + response.data.server + movieBox;
          } // If boxFrequency === "Total", use movieSummary.
          else {
            movieSummary = "/movie_financial_summaries?filter=movie_display_name%20like%20(%22" + movieInput + "%%22)";

            dataURL = "http://" + response.data.server + movieSummary;
          };
        };

        // =================== FOR THE WEEKEND TAB ===================== //
        
        // If user is in tab "genre", apiCall = movieGenre.


        // If user is in tab "weekend", apiCall = movieRange.
        
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