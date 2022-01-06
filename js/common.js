/* javascript used by all pages of the Channel J site, Robert Goodwin 2016 */



/*function remove_short_message(txt) {
    var begin_truncate = txt.indexOf('begin_truncate');
    if (begin_truncate != -1)
    {
        //var short_message = txt.substring(start_truncate,end_truncate);
        return txt.substring(0, begin_truncate) + txt.substring(begin_truncate + 12,txt.length);
    }
    return txt;
}*/


$(document).ready(function(){
    
    //.link-to-top visible when not at top of page
    
    /*
    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos <= 0) {
            $(".link-to-top").fadeOut();
        } else {
            $(".link-to-top").fadeIn();
        }
                
     });*/
    
    
    
    // nav link animation
    $(".nav-link").mouseenter ( function() {
        $(this).prev().toggleClass("active");
        //$(this).next().toggleClass("active");
    });
    
    $(".nav-link").mouseleave( function() {
        $(this).prev().toggleClass("active");
       //$(this).next().toggleClass("active");
    });
    

    
    // hover over logo links changes from color to bw or vice versa
    $(".top-middle-a").mouseenter ( function() {
        var imag = $(this).children("img.top-logo-img");
        var src = imag.attr("src");
        var bw_index = src.indexOf("-bw");
        if (bw_index !== -1) {
            src = src.slice(0, bw_index);
            src = src + '.png';
            imag.attr("src",src);
        }  
    });
    
    $(".top-middle-a").mouseleave ( function() {
        var imag = $(this).children("img.top-logo-img");
        var src = imag.attr("src");
        var bw_index = src.indexOf("-bw");
        if (bw_index === -1) {
            if ((window.location.href.indexOf("-marr") === -1 && src.indexOf("jservice") !== -1) || (window.location.href.indexOf("-marr") !== -1  && src.indexOf("channel-j") !== -1)) {
                src = src.replace(".png", "-bw.png");
                imag.attr("src",src);
            }    
        }  
    });
    
    
});