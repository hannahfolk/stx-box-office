$(document).ready(function() {
    var queryURL = "https://app.ticketmaster.com/discovery/v1/events.json?apikey=stYbjS0YJC8P0IGe0x2ihjPsWAQpASOr&callback=myFunction";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
});
