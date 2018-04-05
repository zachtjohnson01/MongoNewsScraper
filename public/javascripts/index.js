$(document).ready(function() {

    $('.scrape-new').on('click', function() {
        $.get('/article/scrape', function(data){
            console.log(data);
        });
        console.log('button press');
    });

});