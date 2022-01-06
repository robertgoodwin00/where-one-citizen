$(document).ready(function(){
    
    $(".question").click( function() {
        var answer = $(this).next();
        var glyph = $(this).children("span.glyphicon");

        glyph.toggleClass('flip');  
        
        if (answer.css("display") == "none") {
            answer.slideDown();
        } else {
            answer.slideUp();

        }
        
        
            // $("#moshikomi-button").css("background-color", "lightgray");
           
        
    });
});