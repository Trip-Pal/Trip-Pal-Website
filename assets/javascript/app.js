var placeSearch, autocomplete;


var dataCity1;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

initAutocomplete();

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}


$(document).on("click", "#goCity1", function (event) {
    console.log("test");

    var queryUrlCity1 = "https://www.google.com/maps/embed/v1/place?key=AIzaSyC4EtU8sfUywgEwdnHqYpC7qVLSHGpEOfg&q=Eiffel+Tower,Paris+France";

    $('#mapCity1').attr("src", queryUrlCity1);
});





function getFoodAndRating() {

    var queryUrlCity1 = "https://api.foursquare.com/v2/venues/explore?&ll=40.723764,-73.994057&client_id=J50IQCIUKW05KX5XP24VYIU3CVBAFSBGEXG1EGIL50PEGXA5&client_secret=3G1VQAJ4JDVCZLQALXCR0RHRYY3XYI5IYR4O1G2CFWI4JAR0&query=restaurants&v=20180404";

    $.ajax({
        url: queryUrlCity1,
        method: "GET"
    }).then(function (response) {
        console.log(response.response.venues);
        console.log(response.response.groups["0"].items);

        getFoodAverage(response.response.groups["0"].items);
    });

    /*var queryUrlCity2 = "https://api.foursquare.com/v2/venues/explore?&ll=40.723764,-73.994057&client_id=J50IQCIUKW05KX5XP24VYIU3CVBAFSBGEXG1EGIL50PEGXA5&client_secret=3G1VQAJ4JDVCZLQALXCR0RHRYY3XYI5IYR4O1G2CFWI4JAR0&query=restaurants&v=20180404";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response.response.venues);
        console.log(response.response.groups["0"].items);
    });*/
}

function getFoodAverage(restauranteList) {
    var averageFood = 0;

    var rating = 0;

    for (var itemFood = 0; itemFood < restauranteList.length; itemFood++) {
        console.log(restauranteList[itemFood].venue.price.tier);
        //Food Average
        averageFood = averageFood + restauranteList[itemFood].venue.price.tier;

        //Rating Average
        rating = rating + restauranteList[itemFood].venue.rating;
        console.log(restauranteList[itemFood].venue.price);
    }

    //Calculate rating food
    var calculateAverageFood = averageFood / restauranteList.length;
    console.log("calculateAverageFood", calculateAverageFood);
    ratingFood(calculateAverageFood);

    //Calculate Rating
    var calculateRating = rating / restauranteList.length;
    ratingPlace(calculateRating);
}

function ratingFood(calculateAverageFood) {
    var progressDiv = $("<div>");
    progressDiv.addClass("progress");

    var progressBarDiv = $("<div>");
    progressBarDiv.attr("role", "progressbar");
    progressBarDiv.attr("aria-valuemin", "1");
    progressBarDiv.attr("aria-valuemax", "4");

    progressBarDiv.attr("style", "width: " + calculateAverageFood + "%");

    progressBarDiv.attr("aria-valuenow", calculateAverageFood);

    console.log("Inside the function", calculateAverageFood);

    if (calculateAverageFood <= 2) {
        progressBarDiv.addClass("progress-bar progress-bar-striped bg-success");
        console.log("the food is cheap!");
    }
    else if (calculateAverageFood >= 2.1) {
        progressBarDiv.addClass("progress-bar progress-bar-striped bg-danger");
        console.log("the food is expensive!");
    }

    progressDiv.append(progressBarDiv);
    $("#foodCity1").append(progressDiv);
}

function ratingPlace(calculateRating) {
    var progressDiv = $("<div>");
    progressDiv.addClass("progress");

    var progressBarDiv = $("<div>");
    progressBarDiv.attr("role", "progressbar");
    progressBarDiv.attr("aria-valuemin", "1");
    progressBarDiv.attr("aria-valuemax", "10");

    progressBarDiv.attr("style", "width: " + calculateRating + "%");

    progressBarDiv.attr("aria-valuenow", calculateRating);

    console.log("Inside the function", calculateRating);

    if (calculateRating > 8) {
        progressBarDiv.addClass("progress-bar progress-bar-striped bg-success");
        console.log("Excelent!");
    }
    else {
        if (calculateRating < 4) {
            progressBarDiv.addClass("progress-bar progress-bar-striped bg-danger");
            console.log("Bad!");
        }
        else {
            if (calculateRating >= 4 && calculateRating <= 8) {
                progressBarDiv.addClass("progress-bar progress-bar-striped bg-info");
                console.log("Normal");
            }
        }
    }
    progressDiv.append(progressBarDiv);
    $("#ratingCity1").append(progressDiv);

}