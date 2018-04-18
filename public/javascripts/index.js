
$(document).ready(()=> {
    $(".scrape-new").on("click", function(event) {
        // // event.preventDefault();
        // console.log("button clicked");
        // $.ajax({
        //     method: "GET", 
        //     url: "/article/scrape"
        // }).done(function(data) {
        //     console.log(data)
        //     window.location = "/"
        // })
        $.get("/article/scrape").then(data => {
            if (data.title) {
                $("#alert-content").text("Articles added");
            } else {
                $("#alert-content").text("No new articles");
            }
        }).fail(function() {
            $("#alert-content").text("No new articles");
        });
    })

    $('.modal-footer button').on('click', function(event) {
        location.reload();
    });
});