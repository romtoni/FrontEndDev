function search_movies() {
    $('#movie-list').html('');

    //AJAX jQuery
    //type : request method
    //url : link to API
    //data : parameter send
    //dataType : return value type
    //success : success connected to API
    //error : failed to connect to API

    $.ajax({
        type: 'get',
        url: 'http://www.omdbapi.com',
        data: {
            'apikey': 'aa46e00f',
            's': $('#search-input').val()
        },
        dataType: 'json',
        success: function (result) {
            //console.log(result);

            if (result.Response === 'True') {
                let listmovies = result.Search;
                $.each(listmovies, function (i, data) {
                    $('#movie-list').append(` <div class="col-md-4">
                                                    <div class="card mb-3">
                                                        <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                                        <div class="card-body">
                                                            <h5 class = "card-title" > ` + data.Title + ` </h5>
                                                           <h6 class = "card-subtitle mb-2 text-muted" > ` + data.Year + ` </h6>
                                                            <a href = "#"
                                                            class = "card-link see-detail"
                                                            data-toggle = "modal"
                                                            data-target = "#exampleModal"
                                                            data-id = "` + data.imdbID + `"
                                                            > See Details... </a>
                                                        </div>
                                                    </div>
                                                </div> `);

                });

                $('#search-input').val('');
            } else {
                $('#movie-list').html(`<div class="col">
                                            <h1 class="text-center">` + result.Error + `</h1>
                                        </div>`);
            }

        }
    });
}


function detail_movies() {
    $.ajax({
        type: 'get',
        url: 'http://www.omdbapi.com',
        data: {
            'apikey': 'aa46e00f',
            'i': $('.see-detail').data('id')
        },
        dataType: 'json',
        success: function (movie) {
            console.log(movie);
            if (movie.Response === 'True') {
                $('.modal-body').html(`
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img src="` + movie.Poster + `" class="img-fluid">
                                            </div>

                                            <div class="row-md-8">
                                                <ul class = "list-group" >
                                                    <li class = "list-group-item" ><h3> ` + movie.Title + `</h3></li>
                                                    <li class = "list-group-item" >Released : ` + movie.Released + `</li> 
                                                    <li class = "list-group-item" >Genre : ` + movie.Genre + `</li> 
                                                    <li class = "list-group-item" >Director : ` + movie.Director + `</li> 
                                                    <li class = "list-group-item" >Actors : ` + movie.Actors + `</li> 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                `);
            }
        }
    });
}


$('#search-button').on('click', function () {
    search_movies();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        search_movies();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $('.modal-body').html('');

    $.ajax({
        type: 'get',
        url: 'http://www.omdbapi.com',
        data: {
            'apikey': 'aa46e00f',
            'i': $(this).data('id')
        },
        dataType: 'json',
        success: function (movie) {
            console.log(movie);
            if (movie.Response === 'True') {
                $('.modal-body').html(`
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <img src="` + movie.Poster + `" class="img-fluid">
                                            </div>

                                            <div class="col-md-8">
                                                <ul class = "list-group" >
                                                    <li class = "list-group-item" ><h3> ` + movie.Title + `</h3></li>
                                                    <li class = "list-group-item" >Released : ` + movie.Released + `</li> 
                                                    <li class = "list-group-item" >Genre : ` + movie.Genre + `</li> 
                                                    <li class = "list-group-item" >Director : ` + movie.Director + `</li> 
                                                    <li class = "list-group-item" >Actors : ` + movie.Actors + `</li> 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                `);
            }
        }
    });
})