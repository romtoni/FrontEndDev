$('#search-button').on('click', function () {

    //AJAX JQUERY
    //type : request method
    //url : link to API
    //data : parameter send
    //dataType : return value
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
                    $('#movie-list').append(` <div class="col">
                                                    <div class="card" style="width: 18rem;">
                                                        <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                                        <div class="card-body">
                                                            <h5 class = "card-title" > ` + data.Title + ` </h5>
                                                           <h6 class = "card-subtitle mb-2 text-muted" > ` + data.Year + ` </h6>
                                                            <a href = "#"
                                                            class = "card-link"> See Details... </a>
                                                        </div>
                                                    </div>
                                                </div> `);

                });
            } else {
                $('#movie-list').html(`<div class="col">
                                            <h1 class="text-center">` + result.Error + `</h1>
                                        </div>`);
            }

        }
    });

});