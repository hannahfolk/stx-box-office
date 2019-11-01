
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
    var country = "United States"; // Default country
    var startDate = ""; // User-inputted start date (index.html and genre.html)
    var endDate = ""; // User-inputted end date (index.html and genre.html)
    var movies = []; // Store movies in here once data is retrieved

    // ================== Variables for INDEX.HTML ================== //
    var movieInput = req.body.movieInput;
    var boxFrequency = req.body.boxFrequency;

    // ================== Variables for WEEKEND.HTML ================== //
    var numYearsInput = req.body.numYearsInput;
    var weekRevInput = req.body.weekRevInput;
    var week = req.body.week;
    var dayOfWeek = req.body.dayOfWeek;
    var weekendStartDate = ""; // User-inputted start date (weekend.html)
    var weekendEndDate = ""; // User-inputted start date (weekend.html)

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = req.body.genreInput;
    var subGenre;
    var subGenreInput = req.body.subGenreInput;
    var limitInput = req.body.limitInput;
    var genreRevInput = req.body.genreRevInput;

    // ================== Variables for URIs ================== //
    var movieBox;
    var movieGenre;
    var movieRange;
    var movieSummary;
    var movieDateFilter;

    console.log("MovieInput: " + movieInput);
    console.log("BoxFreqeuncy: " + boxFrequency);
    console.log("NumYearsInput: " + numYearsInput);
    console.log("WeekRevInput: " + weekRevInput);
    console.log("Week: " + week);
    console.log("DayOfWeek: " + dayOfWeek);
    console.log("GenreInput: " + genreInput);
    console.log("Sub-genre: " + subGenreInput);
    console.log("LimitInput: " + limitInput);
    console.log("GenreRevInput: " + genreRevInput);
    
    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {
        var dataURL;
        const options = {
          headers: {"Authorization": "opusdata " + response.data.session_id}
        };

        // =================== FOR THE MOVIE TAB ===================== //
        if (movieInput !== "" && movieInput != null) {
          movieInput = movieInput.toLowerCase();
          var whichMovieName = "movie_od_name";

          // If movieInput starts with "The" or "A" or "An", change "movie_od_name" to "movie_display_name"
          if (movieInput.startsWith("the ") || movieInput.startsWith("a ")) {
            whichMovieName = "movie_display_name";
          };

          // If user selects a date range (if boxFrequency === "daily," "weekend," or "weekly"), add movieDateFilter to movieBox and use movieBox
          if (startDate !== "") {
            // Set the movieDateFilter using start and end date
            movieDateFilter = "%20AND%20chart_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22";

            // Add the movieDateFilter into the movieBox URI
            movieBox = "/movie_theatrical_chart_entries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)%20AND%20movie_chart_type_od_name=%22" + boxFrequency + "%22" + movieDateFilter;

            dataURL = "http://" + response.data.server + movieBox;

            console.log(dataURL);
            axios.get(dataURL, options).then(function(data) {
                res.json(util.inspect(data.data));
                console.log(data.data.length);
                for (var i = 0; i < data.data.length; i++) {
                    console.log(data.data[i].od_name);
                    console.log(data.data[i].domestic_box_office);
                    console.log(data.data)
                };
                // res.json(util.inspect(data.data));
            });
          } // If boxFrequency === "Summary", use movieSummary.
          else {
            movieSummary = "/movie_financial_summaries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)";

            dataURL = "http://" + response.data.server + movieSummary;

            console.log(dataURL);
            axios.get(dataURL, options).then(function(data) {
                console.log(data.data);
                for (var i = 0; i < data.data.length; i++) {
                    var movie = {
                      movieTitle: data.data[i].od_name,
                      domesticBoxOffice: data.data[i].domestic_box_office,
                      internationalBoxOffice: data.data[i].international_box_office,
                      productionBudget: data.data[i].production_budget
                    };
                    
                    // @Eddie Replace "100000" with user-inputted minimum revenue
                    if (movie.domesticBoxOffice > 100000) {
                      movies.push(movie);
                    };
                };

                // Send the data from server-side to client-side in JSON (because OpusData is dumb)
                res.json({
                  movies: movies,
                  colTitles: ["Movie Name", "Production Budget", "Domestic Box Office", "International Box Office"]
                });
            });
          };
        };

        // =================== FOR THE WEEKEND TAB ===================== //
        // HANNAH: default number of years they would like returned is 1
        if (weekendStartDate !== "") {
          movieRange = "/movie_theatrical_chart_entries?merge=country&filter=chart_date%20between%20%22" + weekendStartDate + "%22%20AND%20%22" + weekendEndDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20country_od_name%20like%20(%22" + country + "%%22)";

          dataURL = "http://" + response.data.server + movieRange;

            console.log(dataURL);
            axios.get(dataURL, options).then(function(data) {
              console.log(data.data);
              for (var i = 0; i < data.data.length; i++) {
                  var movie = {
                    movieTitle: data.data[i].od_name,
                    domesticBoxOffice: data.data[i].domestic_box_office,
                    internationalBoxOffice: data.data[i].international_box_office,
                    productionBudget: data.data[i].production_budget
                  };
                  
                  // @Eddie Replace "100000" with user-inputted minimum revenue
                  if (movie.domesticBoxOffice > 100000) {
                    movies.push(movie);
                  };
              };

              // Send the data from server-side to client-side in JSON (because OpusData is dumb)
              res.json({
                movies: movies,
                colTitles: ["Movie Name", "Production Budget", "Domestic Box Office", "International Box Office"]
              });
          });
        };

        // =================== FOR THE GENRE TAB ===================== //
        // If they enter a sub-genre, add sub-genre to URI
        if (subGenreInput !== "" && subGenreInput != null) {
            subGenre = "%20AND%20work_keyword_od_name%20like%20(%22" + subGenreInput + "%%22)";
        } else {
            subGenre = "";
        };
        
        // If they enter a genre, use movieGenre
        if (genreInput !== "" && genreInput != null) {
          movieGenre = "/movie_extended_summaries?merge=movie_genre,country,work_keyword&filter=movie_genre_od_name%20like%20(%22" + genreInput + "%%22)%20AND%20country_od_name%20like%20(%22" + country + "%%22)%20AND%20release_date%20between%20%22" + startDate + "%22%20AND%20%22" + endDate + "%22" + subGenre + "&limit=" + limitInput;

          dataURL = "http://" + response.data.server + movieGenre;
        };

        // console.log(dataURL);
        // axios.get(dataURL, options).then(function(data) {
        //     res.json(util.inspect(data.data));
        //     console.log(data.data.length);
        //     for (var i = 0; i < data.data.length; i++) {
        //         // console.log(data.data[i]);
        //         console.log(data.data[i].od_name);
        //         console.log(data.data[i].domestic_box_office);
        //         console.log(data.data)
        //     };
        //     // res.json(util.inspect(data.data));
        // });
    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});