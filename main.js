let MovieArray = [];

let MovieObject = function (name, status, date, runtime) {
    this.name = name; //name of the movie
    this.status = status; //movie's watch status--Finished, Planning, Paused, Rewatching
    this.date = date; //movie's release date
    this.runtime = runtime; //movie's runtime, in minutes
}

MovieArray.push ( new MovieObject("Dune: Part Two", "Planning", "3/1/24", "165 minutes")  );
MovieArray.push ( new MovieObject("G Minus One", "Watched", "12/1/23", "125 minutes")  );
MovieArray.push ( new MovieObject("The Boy and the Heron", "Watched", "12/8/23", "124 minutes")  );

let selectedStatus = "";

// code runs immediately
//================================================================

// runs when dom is loaded
document.addEventListener("DOMContentLoaded", function (event) {

    createList();

    //each time a new movie is added
    document.getElementById("buttonAdd").addEventListener("click", function () {
        //update the MovieArray by pushing a new movie object with the following parameters
        MovieArray.push ( new MovieObject(document.getElementById("nameInput").value, selectedStatus,
        document.getElementById("dateInput").value, document.getElementById("runtimeInput").value ) );
        //Grabs the name, watch status, and release date, respectively
        
        document.getElementById("nameInput").value = ""; //reset the Add a Movie textbox
        document.getElementById("dateInput").value = ""; //reset the Add a Movie textbox
        document.getElementById("runtimeInput").value = ""; //reset the Add a Movie textbox

        createList();
    });

    //used for finding the watch status from the drop down menu on line 100 of index.html
    $(document).bind("change", "#select-status", function (event, ui) {
        selectedStatus = document.getElementById("select-status").value;
    });
});


//======================================
// creates the movielist from the MovieArray to populate the Movie Watchlist Page
function createList() {
    // clear prior data
    var myul = document.getElementById("myul");
        //^^^Line 68 of index.html
    myul.innerHTML = "";

    MovieArray.forEach(function (movie) {   // use handy array forEach method
        var li = document.createElement('li');
        var link = document.createElement('a');
        (function(movie) {
            link.href = "javascript:movieDetails(" + JSON.stringify(movie) + ");"; //pass in the movie object
        })(movie);
        li.innerHTML = movie.status + " --- " + movie.name + " (" + movie.date + ")<br>" + 
                "<span style='padding-left: 70px;'>Runtime: " + movie.runtime;
        link.appendChild(li); //wrap list element inside an <a></a>
        myul.appendChild(link); //put the <a><li></li></a> in the <ul></ul>
    });
};

//populates the movieDetails page using the passed in movie object
function movieDetails(movie){
    window.location.href = "index.html#movieDetails"; //take us to the movieDetails page
        //^^^Find this at line 128 of index.html
    document.getElementById("detailsHeader").innerHTML = movie.name; //set the movie name as the header
        //^^^Find this at line 140 of index.html
    document.getElementById("detailsStatus").innerHTML = "Watch Status: " + movie.status; //display the watch status
        //^^^Find this at line 145 of index.html
    document.getElementById("detailsDate").innerHTML = "Release Date: " + movie.date; //display the release date
        //^^^Find this at line 146 of index.html
};
