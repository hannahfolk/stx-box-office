$(document).ready(function() {

    // Create variables

    // ================== Variables for INDEX.HTML ================== //
    var movieInput = ""; // User-inputted movie title
    var boxFrequency = ""; // If user decides to search by time period
    var movieDateRange = "";
    var movieStartDate = "";
    var movieEndDate = ""; 

    // ================== Variables for WEEKEND.HTML ================== //
    var numYearsInput = ""; // How many years back the user wants to look for a given week in the year
    var weekRevInput = ""; // The minimum amount of revenue in movies returned to the user
    var week = ""; // To store which week in the year the user is looking at, so we can look back 5, 10 years in the past
    var dayOfWeek = ""; // To store which day of the week they chose, aka Thurs, Fri, Sat, Sun
    var weekendRange =""; // range selected by the user
    var weekendStartDate = ""; // start date for the weekend selected
    var weekendEndDate = ""; // end date for the weekend selected

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = ""; // User-inputted genre
    var subGenreInput = ""; // User-inputted sub-genre
    var limitInput = ""; // User-inputted number of movies they would like back with that genre
    var genreRevInput = ""; // The minimum amount of revenue in movies returned to the user
    var genreDateRange = "";
    var genreStartDate = "";
    var genreEndDate = ""; 

    //==================== Other Variables ==================// 

    var today = moment().format("MM/DD/YYYY"); // grabs today's date
    $(".datepicker").attr("placeholder", today + " to " + today); // puts today's date in the datepicker

   //==================== MAIN CODE BODY BELOW THIS LINE ================== //  

    function generateData(event) {
        event.preventDefault();

        // ================== stores input values referencing INDEX.HTML ================== //
        // Stores the user-inputted movie title
        if ($("#movie-input").val() !== null && $("#movie-input").val() !== "") {
            movieInput = $("#movie-input").val();
            $("#movie-input").val("");
        }

        // Stores the box office frequency
        if ($("#daily").is(":checked")) {
            boxFrequency = $("#daily").val();
        } else if ($("#weekend").is(":checked")) {
            boxFrequency = $("#weekend").val();
        } else if ($("#weekly").is(":checked")) {
            boxFrequency= $("#weekly").val();
        };
        
        if ($("#movie-date-range").val() != null && $("#movie-date-range").val() !== "") {
            console.log("hello");
            movieDateRange = $("#movie-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            movieStartDate = movieDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            movieEndDate = movieDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
            $("#movie-date-range").val("");
            console.log(movieStartDate + "#movie-date-range");
            console.log(movieEndDate + "#movie-date-range");
        };

        // ================ stores input values referencing WEEKEND.HTML ================== //
        // Stores the user-inputted number of years they want to look back on
        if ($("#num-years-input").val() !== null && $("#num-years-input").val() !== "" && isNaN($("#num-years-input").val()) === false) {
            numYearsInput = $("#num-years-input").val();
            $("#num-years-input").val("");
        };

        if ($("#weekend-date-range").val() != null && $("#weekend-date-range").val() !== "") {
            weekendRange = $("#weekend-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            weekendStartDate = weekendRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            weekendEndDate = weekendRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
            $("#weekend-date-range").val("");
            console.log(weekendStartDate + "weekend-date-range")
            console.log(weekendEndDate + "weekend-date-range")
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#weekend-revenue-input").val() !== null && $("#weekend-revenue-input").val() !== "" && isNaN($("#weekend-revenue-input").val()) === false) {

            weekRevInput = $("#weekend-revenue-input").val();
            $("#weekend-revenue-input").val("");
        };

        // if ($(""))
        // week = moment(start, "MM-DD-YYYY").week().toString();
        // dayOfWeek = moment(start, "MM-DD-YYYY").format("ddd").toString();
        
        //@Eddie store on/off toggle button for movies released that weekend
        
        // =================== stores input values referencing GENRE.HTML ================== //
        // Stores the user-inputted genre
        if ($("#genre-input").val() !== null && $("#genre-input").val() !== "") {
            genreInput = $("#genre-input").val();
            $("#genre-input").val("");
        };

        // Stores the user-inputted sub-genre
        if ($("#sub-genre-input").val() !== null && $("#sub-genre-input").val() !== "") {
            subGenreInput = $("#sub-genre-input").val();
            $("#sub-genre-input").val("");
        };

        // Stores the user-inputted number of movies they would like returned
        if ($("#limit-input").val() !== null && $("#limit-input").val() !== "") {
            limitInput = $("#limit-input").val();
            $("#limit-input").val("");
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#genre-revenue-input").val() !== null && $("#genre-revenue-input").val() !== "" && isNaN($("#genre-revenue-input").val()) === false) {
            genreRevInput = $("#genre-revenue-input").val();
            $("#genre-revenue-input").val("");
        };

        if ($("#genre-date-range").val() != null && $("#genre-date-range").val() !== "") {
            console.log("hello");
            genreDateRange = $("#genre-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            genreStartDate = genreDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            genreEndDate = genreDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
            $("#genre-date-range").val("");
            console.log(genreStartDate + "genre-date-range");
            console.log(genreEndDate + "genre-date-range");
        };

        // @Eddie: On off toggle button for movies released that weekend

        $.post("/api", {
            week: week,
            dayOfWeek: dayOfWeek,
            movieStartDate: movieStartDate,
            movieEndDate: movieEndDate,
            weekendStartDate: weekendStartDate,
            weekendEndDate: weekendEndDate,
            genreStartDate: genreStartDate,
            genreEndDate: genreEndDate,
            movieInput: movieInput,
            boxFrequency: boxFrequency,
            numYearsInput: numYearsInput,
            weekRevInput: weekRevInput,
            genreInput: genreInput,
            subGenreInput: subGenreInput,
            limitInput: limitInput,
            genreRevInput: genreRevInput,
            
        }).then(function(response) {
            console.log(response);
        });

    };

    // Opens the date range picker and stores the user-selected date range
    function createDateRange() {
        $(".datepicker").flatpickr({
            mode: "range",
            dateFormat: "Y-m-d"
        });
    };
    
    // Add the date range if the user selects daily, weekend, or week
    $(".form-check-input").on("click", function() {

        // Empty the div so that you don't end up multiple datepickers
        $("#movieDateDiv").empty();

        if ($(this).val() === "Daily" || $(this).val() === "Weekend" || $(this).val() === "Week") {
            
            var pEl = $("<p>");
            var datepickerEl = $("<input>");

            datepickerEl.attr("type", "text");
            datepickerEl.attr("class", "datepicker form-control");
            datepickerEl.attr("id", "movie-date-range");
            datepickerEl.attr("placeholder", today + " to " + today);
            datepickerEl.attr("data-input", "");
            pEl.text("Please select your date range: ");

            $("#movieDateDiv").append(pEl);
            $("#movieDateDiv").append(datepickerEl);

            createDateRange();
        };
    });

    createDateRange();
    $(".searchBtn").on("click", generateData);


    // For movie range:
        // User inputs the weekend that they want using the datepicker
        // On our side, we find out which weekend in the year it is, using moment.js
        // Return the last (user-inputted-number) of years of movies that were in theaters on that weekend
        // If the movie's number of days_in_release is less than 5,
            // that movie was released that weekend
            // highlight or bold it
        // otherwise, movie is in chase
    // Ask Omar how to host privately without paying on GitHub
    // Ask Omar how to host in general lol
        // Does the user need to install node? probably not
    // Ask Omar how to grab data from client-side js and put into server-side js
    // Format data in table in browser
    // If time: create Excel export button, format data in Excel
    // Ask Marie to format the card and make it look pretty
    // Ask Marie to change icons

    // If it is opening weekend or not

    // Take the user-inputted-weekend
    // Store the week in a variable, like how December 25th is the 52nd or sometimes 51st week of the year
    // Subtract the year by one (two, 3, ...)
    // Return the day of each year
    // console.log(week1);
    // console.log(day1);
    // console.log(blah);

});


// name depend weeker. 
