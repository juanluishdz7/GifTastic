
//----------- variables---------------
var topics = ["Soccer", "Funny", "Celebration", "Reaction"];

//-----------function to create buttons for variables-----------
function renderButtons(){
  $("#categories").empty();
for (var i=0; i < topics.length; i++) {
  var a = $("<button>");
  a.addClass("topic");
  a.attr("data-name", topics[i]);
  a.text(topics[i]);
  $("#categories").append(a);
}
}
//------adding button to add gifs---------
$("#addbt").on("click", function(event) {
  event.preventDefault();
  var cat = $("#addgif").val().trim();
  topics.push(cat);
  renderButtons();
});

//-----function that displays gifs by making ajax call to giphy api-------
function displayGif() {
  var cat = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=eebCSSTh995Kb02gglaaQRbPpyxSvDvG&q=" + cat + "&limit=10&offset=0&rating=PG-13&lang=en";
  
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){

  var gifs = response.data;
  var mainDiv = $("<div id='fig'>");

  for (var i = 0; i < gifs.length; i++) {
  var gifDiv = $("<div class='gif'>");
  var gOne = $("<img>")
  var rating = gifs[i].rating;
  var r = $("<p>").text("Rating: " + rating);
  gOne.attr("src", gifs[i].images.fixed_height_still.url);
  gOne.attr("data-still", gifs[i].images.fixed_height_still.url);
  gOne.attr("data-animate", gifs[i].images.fixed_height.url);
  gOne.attr("data-state", "still");
  gOne.addClass("gOne");
  gifDiv.append(r);
  gifDiv.append(gOne);
  mainDiv.prepend(gifDiv);

$("#gif-view").html(mainDiv);
}
});
}

//----function to change state of gif from still to animate-------
function playGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

$(document).on("click", ".topic", displayGif);

$(document).on("click", ".gOne", playGif);

renderButtons();


