
const express = require("express");
const app = express();
const util = require("util");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.post("/api", (req, res) => {

    // ================== Variables for INDEX.HTML ================== //
    var movieInput = req.body.movieInput;
    var boxFrequency = req.body.boxFrequency;
    var movieStartDate = req.body.movieStartDate;
    var movieEndDate = req.body.movieEndDate;

    // ================== Variables for WEEKEND.HTML ================== //
    var numYearsInput = req.body.numYearsInput;
    var weekRevInput = req.body.weekRevInput;
    var week = req.body.week;
    var dayOfWeek = req.body.dayOfWeek;
    var weekendStartDate = req.body.weekendStartDate; // User-inputted start date (weekend.html)
    var weekendEndDate = req.body.weekendEndDate; // User-inputted start date (weekend.html)

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = req.body.genreInput;
    var subGenreInput = req.body.subGenreInput;
    var limitInput = req.body.limitInput;
    var genreRevInput = req.body.genreRevInput;
    var genreStartDate = req.body.genreStartDate;
    var genreEndDate = req.body.genreEndDate;  

    // ================== Variables for URIs ================== //
    var country = "United States";
    var currentYear = req.body.currentYear;
    var subGenre;
    var movieBox;
    var movieGenre;
    var movieRange;
    var movieSummary;
    var movieDateFilter;
    var movies = [];
    
    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {
        var dataURL;
        const options = {
          headers: {"Authorization": "opusdata " + response.data.session_id}
        };

        // =================== FOR THE MOVIE TAB ===================== //
        // @EDDIE add production year
        if (movieInput !== "" && movieInput != null) {
          movieInput = movieInput.toLowerCase();
          var whichMovieName = "movie_od_name";

          // If movieInput starts with "The" or "A" or "An", change "movie_od_name" to "movie_display_name"
          if (movieInput.startsWith("the ") || movieInput.startsWith("a ")) {
            whichMovieName = "movie_display_name";
          };

          // If user selects a date range (if boxFrequency === "daily," "weekend," or "weekly"), add movieDateFilter to movieBox and use movieBox
          if (movieStartDate !== "") {
            // Set the movieDateFilter using start and end date
            movieDateFilter = "%20AND%20chart_date%20between%20%22" + movieStartDate + "%22%20AND%20%22" + movieEndDate + "%22";

            // Add the movieDateFilter into the movieBox URI
            movieBox = "/movie_theatrical_chart_entries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)%20AND%20movie_chart_type_od_name=%22" + boxFrequency + "%22" + movieDateFilter;

            dataURL = "http://" + response.data.server + movieBox;

            console.log(dataURL);
            axios.get(dataURL, options).then(function(data) {
                for (var i = 0; i < data.data.length; i++) {

                  var responseInfos = [
                    daysInRelease = data.data[i].days_in_release,
                    revenue = "$" + data.data[i].revenue,
                    totalRevenue = "$" + data.data[i].total_revenue,
                    theaterCount = data.data[i].theater_count
                  ];

                  var movie = {
                    movieTitle: data.data[i].movie_display_name,
                    responseInfos: responseInfos
                  }
                  movies.push(movie);
                };
                
                res.json({
                  movies: movies,
                  colTitles: ["Movie Name", "Number of Days in Release", "Daily Revenue", "Total Revenue in Chosen Frequency", "Theater Count"]
                });
            });
          } // If boxFrequency === "Summary", use movieSummary.
          else {
            movieSummary = "/movie_financial_summaries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)";

            dataURL = "http://" + response.data.server + movieSummary;

            console.log(dataURL);
            axios.get(dataURL, options).then(function(data) {
                for (var i = 0; i < data.data.length; i++) {
                    var responseInfos = [
                      domesticBoxOffice = "$" + data.data[i].domestic_box_office,
                      internationalBoxOffice = "$" + data.data[i].international_box_office,
                      productionBudget = "$" + data.data[i].production_budget
                    ];

                    var movie = {
                      movieTitle: data.data[i].movie_display_name,
                      responseInfos: responseInfos
                    };
                    
                    // @Eddie Replace "100000" with user-inputted minimum revenue
                    if (data.data[i].domestic_box_office > 100000) {
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

        // STILL HAVE TO:
          // If date starts on Wednesday, go all the way until Sun
          // If date starts on Thursday, ...
        if (weekendStartDate !== "") {
          movieRange = "/movie_theatrical_chart_entries?merge=country&filter=chart_date%20between%20%22" + weekendStartDate + "%22%20AND%20%22" + weekendEndDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20country_od_name%20like%20(%22" + country + "%%22)";

          dataURL = "http://" + response.data.server + movieRange;

          console.log(dataURL);
          axios.get(dataURL, options).then(function(data) {
            for (var i = 0; i < data.data.length; i++) {
              var days = [];

              for (var j = 0; j < data.data.length; j++){
                if (data.data[i].odid === data.data[j].odid) {
                  var day = {
                    daysInRelease: data.data[j].days_in_release,
                    revenue: data.data[j].revenue
                  };
                  days.push(day);

                  for (var k = 0; k < days.length; k++) {
                    var responseInfos = [
                      year = currentYear,
                      daysInRelease = days[k].daysInRelease,
                      totalWeekendRevenue = days[k].revenue,
                      totalRevenue = data.data[j].total_revenue
                    ];
                  };

                  var movie = {
                    movieTitle: data.data[i].movie_display_name,
                    responseInfos: responseInfos
                  };
                };
              };
              
              if (data.data[i].total_revenue > weekRevInput) {
                movies.push(movie);
              };                  
            };

            // Send the data from server-side to client-side in JSON (because OpusData is dumb)
            res.json({
              movies: movies,
              colTitles: ["Movie Name", "Year", "Fri Revenue", "Sat Revenue", "Sun Revenue", "Total Weekend Revenue", "Total Revenue"]
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

        // If they enter a limit, add limit to URI
        if (limitInput !== "" && limitInput != null) {
          limit = "&limit=" + limitInput;
        } else {
          limit = "";
        }
        
        // If they enter a genre, use movieGenre
        if (genreInput !== "" && genreInput != null) {
          movieGenre = "/movie_extended_summaries?merge=movie_genre,country,work_keyword&filter=movie_genre_od_name%20like%20(%22" + genreInput + "%%22)%20AND%20country_od_name%20like%20(%22" + country + "%%22)%20AND%20release_date%20between%20%22" + genreStartDate + "%22%20AND%20%22" + genreEndDate + "%22" + subGenre + limit;

          dataURL = "http://" + response.data.server + movieGenre;

          console.log(dataURL);
          axios.get(dataURL, options).then(function(data) {
              for (var i = 0; i < data.data.length; i++) {
                  var responseInfos = [
                    openingWeekendRevenue = "$" + data.data[i].opening_weekend_revenue,
                    openingWeekendTheaters = data.data[i].opening_weekend_theaters,
                    releaseDate = data.data[i].release_date,
                    productionYear = data.data[i].production_year,
                    productionStudio = data.data[i]
                    .movie_theatrical_distributor_display_name
                  ];

                  var movie = {
                    movieTitle: data.data[i].movie_display_name,
                    responseInfos: responseInfos
                  };

                  if (data.data[i].opening_weekend_revenue > genreRevInput &&data.data[i].opening_weekend_revenue > 100000) {
                    movies.push(movie);
                  };
              };

              // Send the data from server-side to client-side in JSON (because OpusData is dumb)
              res.json({
                movies: movies,
                colTitles: ["Movie Name", "Opening Weekend Revenue", "Opening Weekend Theaters", "Release Date", "Production Year", "Production Studio"]
              });
          });
        };

    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});