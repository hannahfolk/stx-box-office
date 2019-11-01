$(document).ready(function() {
    // Create variables

    // ================== Variables for INDEX.HTML ================== //
    var movieInput = ""; // User-inputted movie title
    var boxFrequency = ""; // If user decides to search by time period

    // ================== Variables for WEEKEND.HTML ================== //
    var numYearsInput = ""; // How many years back the user wants to look for a given week in the year
    var weekRevInput = ""; // The minimum amount of revenue in movies returned to the user
    var week = ""; // To store which week in the year the user is looking at, so we can look back 5, 10 years in the past
    var dayOfWeek = ""; // To store which day of the week they chose, aka Thurs, Fri, Sat, Sun

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = ""; // User-inputted genre
    var subGenreInput = ""; // User-inputted sub-genre
    var limitInput = ""; // User-inputted number of movies they would like back with that genre
    var genreRevInput = ""; // The minimum amount of revenue in movies returned to the user

    var today = moment().format("MM/DD/YYYY"); // grabs today's date
    $(".datepicker").attr("placeholder", today + " to " + today); // puts today's date in the datepicker
    $(".datepicker").attr("value", ""); // sets the value of the datepicker to an empty string in case user doesn't use the date range

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
        } else if ($("#total").is(":checked")) {
            boxFrequency = $("#total").val();
        };
        
        // ================ stores input values referencing WEEKEND.HTML ================== //
        // Stores the user-inputted number of years they want to look back on
        if ($("#num-years-input").val() !== null && $("#num-years-input").val() !== "" && isNaN($("#num-years-input").val()) === false) {
            numYearsInput = $("#num-years-input").val();
            $("#num-years-input").val("");
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#weekend-revenue-input").val() !== null && $("#weekend-revenue-input").val() !== "" && isNaN($("#weekend-revenue-input").val()) === false) {
            weekRevInput = $("#weekend-revenue-input").val();
            $("#weekend-revenue-input").val("");
        };

        console.log($(".datepicker").val());
        // if ($(""))
        // week = moment(, "MM-DD-YYYY").week().toString();
        // dayOfWeek = moment(start, "MM-DD-YYYY").format("ddd").toString();
        
        //@Eddie store on/off toggle button for movies released that weekend
        
        // =================== stores input values referenceing GENRE.HTML ================== //
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

        // On off toggle button for movies released that weekend
        $.post("/api", {
            movieInput: movieInput,
            boxFrequency: boxFrequency,
            numYearsInput: numYearsInput,
            weekRevInput: weekRevInput,
            genreInput: genreInput,
            subGenreInput: subGenreInput,
            limitInput: limitInput,
            genreRevInput: genreRevInput,
            week: week,
            dayOfWeek: dayOfWeek
        }).then(function(response) {
            console.log(response);
        });

        console.log($(".datepicker").val());
    };

    // Opens the date range picker and stores the user-selected date range
    function createDateRange() {
        $(".datepicker").flatpickr({
            mode: "range",
            dateFormat: "m/d/Y"
        });
    };
    
    // Add the date range if the user selects daily, weekend, or week
    $(".form-check-input").on("click", function() {

        // Empty the div so that you don't end up multiple datepickers
        $("#movieDateDiv").empty();

        if ($(this).val() === "Daily" || $(this).val() === "Weekend" || $(this).val() === "Weekly") {
            var pEl = $("<p>");
            var datepickerEl = $("<input>");

            datepickerEl.attr("type", "text");
            datepickerEl.attr("class", "datepicker form-control");
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
    var week1 = moment("10-11-2019", "MMDDYYYY").week();
    var day1 = moment("10-11-2019", "MMDDYYYY").format("dddd");
    var blah = moment(week1, "W").subtract(1, "years").format("MMDDYYYY");

    // console.log(week1);
    // console.log(day1);
    // console.log(blah);

});
