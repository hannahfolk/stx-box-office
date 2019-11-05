$(document).ready(function() {

    // ================== CREATE VARIABLES ================== //

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
    var weekendRange =""; // Range selected by the user for weekend
    var weekendStartDate = ""; // Start date for the weekend selected
    var weekendEndDate = ""; // End date for the weekend selected
    var yesNoChecked = ""; // Toggle button for weekend

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = ""; // User-inputted genre
    var subGenreInput = ""; // User-inputted sub-genre
    var limitInput = ""; // User-inputted number of movies they would like back with that genre
    var genreRevInput = ""; // The minimum amount of revenue in movies returned to the user
    var genreDateRange = ""; // Range selected by user for genre
    var genreStartDate = ""; // Start date for the genre tab
    var genreEndDate = ""; // End date for the genre tab

    //==================== Other Variables ==================// 

    var today = moment().format("MM/DD/YYYY"); // grabs today's date
    var currentYear = moment().format("YYYY"); // grabs current year
    $(".datepicker").attr("placeholder", today + " to " + today); // puts today's date in the datepicker

   //==================== MAIN CODE BODY BELOW THIS LINE ================== //  

    function generateData(event) {
        event.preventDefault();

        // ================== Stores input values referencing INDEX.HTML ================== //
        // Stores the user-inputted movie title
        if ($("#movie-input").val() !== null && $("#movie-input").val() !== "") {
            movieInput = $("#movie-input").val();
            $("#movie-input").val("");
        };

        // Stores the box office frequency
        if ($("#daily").is(":checked")) {
            boxFrequency = $("#daily").val();
        } else if ($("#weekend").is(":checked")) {
            boxFrequency = $("#weekend").val();
        } else if ($("#weekly").is(":checked")) {
            boxFrequency = $("#weekly").val();
        };
        
        if ($("#movie-date-range").val() != null && $("#movie-date-range").val() !== "") {
            movieDateRange = $("#movie-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            movieStartDate = movieDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            movieEndDate = movieDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
        };

        // ================ Stores input values referencing WEEKEND.HTML ================== //
        // Stores the user-inputted number of years they want to look back on
        if ($("#num-years-input").val() !== null && $("#num-years-input").val() !== "" && isNaN($("#num-years-input").val()) === false) {
            numYearsInput = $("#num-years-input").val();
            $("#num-years-input").val("");
        };

        if ($("#weekend-date-range").val() != null && $("#weekend-date-range").val() !== "") {
            weekendRange = $("#weekend-date-range").val(); // Returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            weekendStartDate = weekendRange.substring(0, 10); // Gets start date as "YYYY-MM-DD"
            weekendEndDate = weekendRange.substring(14, 24); // Gets end date as "YYYY-MM-DD"
            week = moment(weekendStartDate, "YYYY-MM-DD").week().toString(); // Gets what number of the week it is in the given year 
            dayOfWeek = moment(weekendStartDate, "YYYY-MM-DD").format("ddd").toString(); // Gets what day of the week it is
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#weekend-revenue-input").val() !== null && $("#weekend-revenue-input").val() !== "" && isNaN($("#weekend-revenue-input").val()) === false) {

            weekRevInput = $("#weekend-revenue-input").val();
            $("#weekend-revenue-input").val("");
        };

        // Stores whether or not the user wants to only see movies that were released in the chosen weekend
        if ($("#toggle-yes-no").is(":checked")) {
            yesNoChecked = "Yes";
        } else {
            yesNoChecked = "No";
        };

        // =================== Stores input values referencing GENRE.HTML ================== //
        // Stores the user-inputted genre
        if ($("#genre-input").val() !== null && $("#genre-input").val() !== "") {
            genreInput = $("#genre-input").val();
        };

        // Stores the user-inputted sub-genre
        if ($("#sub-genre-input").val() !== null && $("#sub-genre-input").val() !== "") {
            subGenreInput = $("#sub-genre-input").val();
        };

        // Stores the user-inputted number of movies they would like returned
        if ($("#limit-input").val() !== null && $("#limit-input").val() !== "" && isNaN($("#limit-input").val()) === false) {
            limitInput = $("#limit-input").val();
            $("#limit-input").val("");
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#genre-revenue-input").val() !== null && $("#genre-revenue-input").val() !== "" && isNaN($("#genre-revenue-input").val()) === false) {
            genreRevInput = $("#genre-revenue-input").val();
            $("#genre-revenue-input").val("");
        };

        if ($("#genre-date-range").val() != null && $("#genre-date-range").val() !== "") {
            genreDateRange = $("#genre-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            genreStartDate = genreDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            genreEndDate = genreDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
        };

        // Passing all the variables from user input into the server-side js
        $.post("/api", {
            movieStartDate: movieStartDate,
            movieEndDate: movieEndDate,
            movieInput: movieInput,
            boxFrequency: boxFrequency,
            numYearsInput: numYearsInput,
            weekRevInput: weekRevInput,
            weekendStartDate: weekendStartDate,
            weekendEndDate: weekendEndDate,
            week: week,
            dayOfWeek: dayOfWeek,
            yesNoChecked: yesNoChecked,
            genreInput: genreInput,
            subGenreInput: subGenreInput,
            limitInput: limitInput,
            genreRevInput: genreRevInput,
            currentYear: currentYear,
            genreStartDate: genreStartDate,
            genreEndDate: genreEndDate,
        }).then(function(response) {

            console.log(response);
            console.log(JSON.parse(response));
            // Empty the responseCard
            $(".responseCard").empty();

            // Create the necessary elements for the responseCard
            var responseCardDiv = $("<div>");
            var responseCardBody = $("<div>");
            var tableEl = $("<table>");
            var tHeadEl = $("<thead>");
            var tBodyEl = $("<tbody>");
            var headTrEl = $("<tr>");
            
            for (var i = 0; i < response.colTitles.length; i++) {
                var headThEl = $("<th>");
                headTrEl.attr("scope", "col");
                headThEl.text(response.colTitles[i]);
                headTrEl.append(headThEl);
            };

            for (var i = 0; i < response.movies.length; i++) {
                var bodyTrEl = $("<tr>");
                var bodyThEl = $("<th>");

                bodyThEl.attr("scope", "row");

                bodyThEl.text(response.movies[i].movieTitle);

                tBodyEl.append(bodyTrEl);
                bodyTrEl.append(bodyThEl);

                for (var j = 0; j < response.movies[i].responseInfos.length; j++) {
                    var tdEl = $("<td>");
                    tdEl.text(response.movies[i].responseInfos[j]);
                    bodyTrEl.append(tdEl);
                };

            };

            responseCardDiv.attr("class", "card col-12");
            responseCardBody.attr("class", "card-body");
            tableEl.attr("class", "table");

            $(".responseCard").append(responseCardDiv);
            responseCardDiv.append(responseCardBody);
            responseCardBody.append(tableEl);
            tableEl.append(tHeadEl);
            tableEl.append(tBodyEl);
            tHeadEl.append(headTrEl);

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
});
