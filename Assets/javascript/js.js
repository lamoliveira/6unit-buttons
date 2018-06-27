
      // Initial array of animals
      var animals = ["dog", "cat", "rabbit", "hamster","skunk","goldfish","bird","ferret","turtle","sugar glider","chinchilla","hedgehog","hermit crab","gerbil","pygmy goat", "chicken", "capybara","teacup pig","serval","salamander"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayAnimalInfo(thebutton) {

        var animal = $(thebutton).attr("data-name");
        console.log("animal: ");
        console.log(animal);

        //var queryURL = "https://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=trilogy"; // %%% change query
        
              // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log(queryURL);  
        $("#animals-view").empty();
        $("#animals-view").append("<br><h1>Gifs View</h1>");
               
        // Creating an AJAX call for the specific movie button being clicked
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            console.log(results);
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
              console.log("for:"+i);
              // Creating and storing a div tag
              var animalFig = $("<figure style='font-size:10px; margin-right: 10px;'><figcapture>Rating: " + results[i].rating + "<br></figcapture> </figure>" );
              // $("<div>");
  
              // Creating a paragraph tag with the result item's rating
               //animalFig.attr("figcapture", "Rating: " + results[i].rating);
  
    
              // Creating and storing an image tag
              var animalImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              console.log( "Rating: " + results[i].rating);
              animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
              animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
              animalImage.attr("src", results[i].images.fixed_height_small_still.url);
              
              animalImage.attr("data-state", "still");
              animalImage.addClass("gif");
              // Appending the paragraph and image tag to the animalDiv
              animalFig.append(animalImage);
              animalFig.append("<br>Title: " + results[i].title.substring(0,20) );
              console.log(animalFig);
              //animalDiv.append(p);
              
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#animals-view").append(animalFig);
              
            }
            
          });

      }
////begin movie



function displayMovieInfo(thebutton) {

        var animal = $(thebutton).attr("data-name");
        console.log("animal: ");
        console.log(animal);

        //var queryURL = "https://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=trilogy"; // %%% change query
        
              // Constructing a queryURL using the animal name

      var queryURL = "https://www.omdbapi.com/?s=" + animal + "&apikey=trilogy";


      console.log(queryURL);  
      //  $("#animals-view").empty();
               
        // Creating an AJAX call for the specific movie button being clicked
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.Search;
            console.log(results);
            $("#movies-view").append("<h1>Movies View</h1>");
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
              console.log("for:"+i);
              // Creating and storing a div tag
              var animalFig = $("<div style='float:left;font-size:10px; margin-right: 20px;'><div>Type: " + results[i].Type + " Year: " + results[i].Year + "<br></div> </div>" );
              // $("<div>");
  
              // Creating a paragraph tag with the result item's rating
               //animalFig.attr("figcapture", "Rating: " + results[i].rating);
  
    
              // Creating and storing an image tag
              var animalImage = $("<img style='width:100px'>");
              // Setting the src attribute of the image to a property pulled off the result item
              animalImage.attr("src", results[i].Poster);
              
              // Appending the paragraph and image tag to the animalDiv
              animalFig.append(animalImage);
              animalFig.append("<br>Title: " + results[i].Title.substring(0,20) );
              console.log(animalFig);
              //animalDiv.append(p);
              
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              if (results[i].Poster){
              $("#movies-view").append(animalFig);
              }
            }
          });

      }


      ///end movie
      function alternateGif() {
        console.log("gifclick");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }

      // Function for displaying movie data
      function renderButtons() {
        console.log("renderbutton");
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        console.log("for...");
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]); //%%% update field
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      function showSearch() {
        displayAnimalInfo(this);
       
        displayMovieInfo(this);

      }

      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function(event) {
        //event.preventDefault(event);
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        console.log("animal caption button click: "+ animal);
        // Adding animal from the textbox to our array
        animals.push(animal);
        console.log("animals");
        console.log(animals);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      })

      // Adding a click event listener to all elements with a class of "animal-btn" or "gif"
      //$(document).on("click", ".animal-btn", displayAnimalInfo)
      $(document).on("click", ".animal-btn", showSearch)
      $(document).on("click", ".gif", alternateGif)

            
      // Calling the renderButtons function to display the intial buttons
       window.onload = function () {
        renderButtons();
      }
