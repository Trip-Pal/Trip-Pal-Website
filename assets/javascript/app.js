

function getFood() {

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

getFood();

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

    if (calculateRating > 8) {
        console.log("Excelent!");
    }
    else {
        if (calculateRating < 4) {
            console.log("Bad!");
        }
        else {
            if (calculateRating >= 4 && calculateRating <= 8) {
                console.log("Normal");
            }
        }
    }
}

function ratingFood(calculateAverageFood) {
     var progressDiv = $("<div>");
     progressDiv.addClass("progress");
 
     var progressBarDiv = $("<div>");
     progressBarDiv.attr("role", "progressbar");
     progressBarDiv.attr("aria-valuemin", "1");
     progressBarDiv.attr("aria-valuemax", "4");
     progressBarDiv.attr("style", "width: 10%");
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