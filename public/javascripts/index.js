$(document).ready(function() {

    $('.scrape-new').on('click', function() {
        $.get('/api/articles', function(data){
            console.log(data);
        });
        console.log('button press');
    });

});