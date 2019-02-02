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

            if (result.Response == 'True') {
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


$('#search-button').on('click', function () {
    search_movies();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        search_movies();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        type: 'get',
        url: 'http://www.omdbapi.com',
        data: {
            'apikey': 'aa46e00f',
            'i': $(this).data('id')
        },
        dataType: 'json',
        success: function (result) {



        }
    })
})