$(document).ready(function() {

// Start your code from here
var temas = ["Plants", "Books", "Clouds"]

/*for (var i = 0; i < temas.length; i++) {
    var btn = $("<button>")
    btn.text(temas[i])
    btn.addClass("animal-button")
    btn.attr("data-type",temas[i])
    $("#animal-buttons").append(btn)
}
*/

// La función debe a fuerza borrar todos los botones y re-generarlos, o está bien si sólo agrega el botón correspondiente?
function generateButtons(arr,classToAdd,placeHolder) {
    $(placeHolder).empty()
    
    for (var i = 0; i < arr.length; i++) {
        var btn = $("<button>")
        btn.addClass(classToAdd)
        btn.attr("data-type",arr[i])
        btn.text(arr[i])
        $(placeHolder).append(btn)
    }
}

generateButtons(temas, "animal-button", "#animal-buttons")

$("#add-animal").on('click', function(btn) {
    btn.preventDefault()
    temas.push($("#animal-input").val())
    generateButtons(temas, "animal-button", "#animal-buttons")
    //generateButton($("#animal-input").val())
})

/*
function generateButton(btnText) {
    var btn = $("<button>")
    btn.text(btnText)
    $("#animal-buttons").append(btn)
}
*/

$("#animal-buttons").on('click',".animal-button",function() {
    $("#animals").empty()
    var search = $(this).attr("data-type")
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=9zTBpyDAij2g0LJutdkDUkf6bBVJKxBj&limit=10"

    $.ajax({url:queryUrl})
    .then(function(response) {
        var results = response.data

        for (var i=0;i<results.length;i++) { 
            var animalDiv = $("<div class=\"animal-item\">") 
            var rating = results[i].rating
            var p = $("<p>").text("Rating: "+rating)

            var animated = results[i].images.fixed_height.url
            var still = results[i].images.fixed_height_still.url

            var animalImage = $("<img>")
            animalImage.attr("src",still)
            animalImage.attr("data-still",still)
            animalImage.attr("data-animate",animated)
            animalImage.attr("data-isAnimated","false")
            animalImage.addClass("animal-image")

            animalDiv.append(p)
            animalDiv.append(animalImage)

            $("#animals").append(animalDiv)
        }
    })
})

$("#animals").on('click',".animal-image",function() {
    // Registro del evento para la imagen
    if ($(this).attr("data-isAnimated") == "false") {
        $(this).attr("src",$(this).attr("data-animate"))
        $(this).attr("data-isAnimated","true")
    }
    else {
        $(this).attr("src",$(this).attr("data-still"))
        $(this).attr("data-isAnimated","false")
    }
})

});
