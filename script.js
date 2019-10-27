$(document).ready(function() {

    function writeForm(event) {
        event.preventDefault();

        var divEl = $("#divEl");
        $("#input-value").empty();
        divEl.empty();
        var divElLabel = $("<label>");
        var formInput = $("<input>");
        var formSubmit = $("<button>");

        divEl.attr("class", "form-group col-md-6");
        divElLabel.attr("for", "searchBar");
        formInput.attr("type", "text");
        formInput.attr("class", "form-control");
        formInput.attr("id", "form-input");
        formSubmit.attr("type", "submit");

        divElLabel.text("Please enter " + $(this).val() + ":");
        formSubmit.text("Submit");

        $("#input-value").append(divEl);
        divEl.append(divElLabel);
        divEl.append(formInput);
        $("#input-value").append(formSubmit);

        formSubmit.on("click", function(event) {
            event.preventDefault();
            console.log(formInput.val());

            formInput.val("");
        });
    };

    $(function() {
        $('input[name="daterange"]').daterangepicker({
          opens: 'left'
        }, function(start, end, label) {
          console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
    });

    $(document).on("click", ".dropdown-item", writeForm);
    // ==================REVENUE DATA================= //
    // Create variables

    // if ($(this).val() === "movie title" || $(this).val() === "Zip Code" || $(this).val() === "actor name" || $(this).val() === "Directors") {
    // };
    // If genre is selected, return all movie titles.
    // Make a looped AJAX call to OPUS and return revenue data.

    // ==================GENRE======================== //

    // ==================YEAR========================= //

    // ==================YEAR RANGE=================== //

    // ==================ACTORS======================= //

    // ==================THEATER CHAINS=============== //

    // ==================RATED======================== //

    // ==================RATINGS====================== //

    // ==================BOX OFFICE HARD DOLLARS====== //
        // OPUS

    // ==================BOX OFFICE RANGE============= //
        // OPUS

    // ==================DMA========================== //

    // ==================SCREEN COUNT================= //
        // OPUS

    // ==================ZIP CODE===================== //

// var data;
// $.ajax({
//   type: "GET",
//   url: "js-tutorials.com_sample_file.csv",
//   dataType: "text",  
//   success: function(response)  
//   {
//     data = $.csv.toArrays(response);
//     generateHtmlTable(data);
//   }   
// });

// function generateHtmlTable(data) {
//     var html = '<table  class="table table-condensed table-hover table-striped">';

//       if(typeof(data[0]) === 'undefined') {
//         return null;
//       } else {
// 		$.each(data, function( index, row ) {
// 		  //bind header
// 		  if(index == 0) {
// 			html += '<thead>';
// 			html += '<tr>';
// 			$.each(row, function( index, colData ) {
// 				html += '<th>';
// 				html += colData;
// 				html += '</th>';
// 			});
// 			html += '</tr>';
// 			html += '</thead>';
// 			html += '<tbody>';
// 		  } else {
// 			html += '<tr>';
// 			$.each(row, function( index, colData ) {
// 				html += '<td>';
// 				html += colData;
// 				html += '</td>';
// 			});
// 			html += '</tr>';
// 		  }
// 		});
// 		html += '</tbody>';
// 		html += '</table>';
// 		alert(html);
// 		$('#csv-display').append(html);
// 	  }
//     }

    var proxyURL = 'https://cors-anywhere.herokuapp.com/';
    var targetURL = 'https://access.opusdata.com/session/create?email=hfolk25@gmail.com&password=opusdatat43';

    $.ajax({
        url: proxyURL + targetURL,
        method: "GET"
    })
    .then(response => JSON.parse(response))
    .then(function(response) {
        console.log(response);
        console.log(response.session_id);
    });

});
