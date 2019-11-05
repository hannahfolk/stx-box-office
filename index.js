
const express = require("express");
const app = express();
const util = require("util");
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.post("/api", (req, res) => {

    // ================== Create variables ================== //

    var movieURI = req.body.movieURI;
    var whichTab = req.body.whichTab;
    var week = req.body.week;
    var dayOfWeek = req.body.dayOfWeek;
    var weekRevInput = req.body.weekRevInput;
    var genreRevInput = req.body.genreRevInput;
    var movies = [];
    
    const axios = require("axios");
    
    axios.get("https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43")
    .then(function (response) {

        const options = {
          headers: {"Authorization": "opusdata " + response.data.session_id}
        };

        var dataURL = "http://" + response.data.server + movieURI;

        // =================== FOR THE MOVIE TAB ===================== //
        // @EDDIE add production year

        if (whichTab === "movieBox") {
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
        } else if (whichTab === "movieSummary") {
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
                if (data.data[i].domestic_box_office >= 100000) {
                  movies.push(movie);
                };
            };

            // Send the data from server-side to client-side in JSON (because OpusData is dumb)
            res.json({
              movies: movies,
              colTitles: ["Movie Name", "Production Budget", "Domestic Box Office", "International Box Office"]
            });
          });
        }

        // =================== FOR THE WEEKEND TAB ===================== //

        // STILL HAVE TO:
          // If date starts on Wednesday, go all the way until Sun
          // If date starts on Thursday, ...
        else if (whichTab === "movieRange") {
          axios.get(dataURL, options).then(function(data) {
            console.log(data.data);

            for (var i = 0; i < data.data.length; i++) {
              var responseInfos = [
                productionYear = data.data[i].production_year,
                revenue = data.data[i].revenue,
                genre = data.data[i].movie_genre_display_name
              ];

              var movie = {
                movieTitle: data.data[i].movie_display_name,
                responseInfos: responseInfos
              };

              if (data.data[i].revenue >= weekRevInput) {
                movies.push(movie);
              };

            };

            var colTitles = ["Movie Name", "Production Year", "Friday Revenue", "Saturday Revenue", "Sunday Revenue", "Total Weekend Revenue", "Total Revenue", "Genre"];

            if (dayOfWeek === "Wed") {
              colTitles.splice(2, 0, "Wednesday Revenue");
              colTitles.splice(3, 0, "Thursday Revenue");
            } else if (dayOfWeek === "Thu") {
              colTitles.splice(2, 0, "Thursday Revenue");
            };

            res.json({
              movies: movies,
              colTitles: colTitles
            });

            // res.json(util.inspect(data.data));
            // for (var i = 0; i < data.data.length; i++) {
            //   var days = [];

            //   for (var j = 0; j < data.data.length; j++){
            //     if (data.data[i].odid === data.data[j].odid) {
            //       var day = {
            //         daysInRelease: data.data[j].days_in_release,
            //         revenue: data.data[j].revenue
            //       };
            //       days.push(day);

            //       for (var k = 0; k < days.length; k++) {
            //         var responseInfos = [
            //           daysInRelease = days[k].daysInRelease,
            //           totalWeekendRevenue = days[k].revenue,
            //           totalRevenue = data.data[j].total_revenue
            //         ];
            //       };

            //       var movie = {
            //         movieTitle: data.data[i].movie_display_name,
            //         responseInfos: responseInfos
            //       };
            //     };
            //   };
              
            //   if (data.data[i].total_revenue > weekRevInput) {
            //     movies.push(movie);
            //   };                  
            // };

          });
        }

        // =================== FOR THE GENRE TAB ===================== //
        else if (whichTab === "movieGenre") {
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

                if (data.data[i].opening_weekend_revenue >= genreRevInput && data.data[i].opening_weekend_revenue > 100000) {
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

app.listen(PORT, () => {
  console.log("App listening on port 3000!");
});