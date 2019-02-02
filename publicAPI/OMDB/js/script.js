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
            console.log(result);

            if (result.Response == 'true') {

            } else {
                $('#movie-list').html(`<div class="col">
                                            <h1 class="text-center">` + result.Error + `</h1>
                                        </div>`);
            }

        }
    });

});