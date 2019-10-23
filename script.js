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

});
