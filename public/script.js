$(document).ready(function() {
    // Create variables
    var week;
    var dayOfWeek;

    function generateData(event) {
        event.preventDefault();
        
        $.post("/api", {
            week: week,
            dayOfWeek: dayOfWeek,
            blah: "potato"
        }).then(function(response) {
            console.log(response);
        });
    };

    // Opens the date range picker and stores the user-selected date range
    function createDateRange() {
        $("input[name=\"daterange\"]").daterangepicker({
          opens: "right"
        }, function(start, end, label) {
            start = start.format("MM-DD-YYYY");
            end = end.format("MM-DD-YYYY");
            week = moment(start, "MM-DD-YYYY").week().toString();
            dayOfWeek = moment(start, "MM-DD-YYYY").format("ddd").toString();
            console.log(week);
            console.log(dayOfWeek);
        });
    };

    createDateRange();
    $("#searchBtn").on("click", generateData);

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
    // Ask Omar how to grab data from client-side js and put into server-side js
    // Format data in table in browser
    // If time: create Excel export button, format data in Excel
    // Ask Marie to format the card and make it look pretty
    // Ask Marie to change icons
    // Ask Marie if she can darken the background when datepicker is open (modal maybe??)

    // Take the user-inputted-weekend
    // Store the week in a variable, like how December 25th is the 52nd or sometimes 51st week of the year
    // Subtract the year by one (two, 3, ...)
    // Return the day of each year
    var week1 = moment("10-11-2019", "MMDDYYYY").week();
    var day1 = moment("10-11-2019", "MMDDYYYY").format("dddd");
    var blah = moment(week1, "W").subtract(1, "years").format("MMDDYYYY");

    console.log(week1);
    console.log(day1);
    console.log(blah);

});
