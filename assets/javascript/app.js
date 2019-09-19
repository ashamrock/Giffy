var topics =['Donald Trump','Barack Obama','George W. Bush','Bill Clinton','George H. W. Bush'];   

function populate() {
  $("#buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.addClass("name");
    btn.attr("info-name", topics[i]);
    btn.text(topics[i]);
    $("#buttons").append(btn);
    console.log (i)
  }
}

function addGif() {

  var info = $(this).attr("info-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + info + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(gather) {
    $("#person-view").empty();
    var results = gather.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height.url);
      gifDiv.append(p);
      gifDiv.prepend(personImage);
      $("#person-view").prepend(gifDiv);
    }
  });

}

$("#add-name").on("click", function(event) {
  event.preventDefault();
  var fullName = $("#name-input").val().trim();
  topics.push(fullName);
  populate();
});

$(document).on("click", ".name", addGif);