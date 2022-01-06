
// read news from xml and insert into document
const MAX_NEWS_ITEMS = 8;

var yohttp = new XMLHttpRequest();
yohttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    doitnow(this);
    }
};



//var name = "news.xml";


yohttp.open("GET", "news.xml", true);
yohttp.send();

function doitnow(xml) {
    var xmlDoc = xml.responseXML;
    
    x = xmlDoc.getElementsByTagName("item");
    var txt = "";
    var len = x.length;
    if (len > MAX_NEWS_ITEMS) {
        len = MAX_NEWS_ITEMS;
    }

    for (i = 0; i < len; i++) {
        dat = x[i].getElementsByTagName("date");
        tit = x[i].getElementsByTagName("title");
        des = x[i].getElementsByTagName("description");
        img = x[i].getElementsByTagName("image");
        
        txt += "<br><br><div>";
        txt += "<span class='news-date'>";
        txt += dat[0].childNodes[0].nodeValue;
        txt += "</span> <span class='news-title'>~ ";
        txt += tit[0].childNodes[0].nodeValue;
        txt += "<\span> ~";
        
        if (img.length > 0) {
            txt += "<br><p class='news-image'><a href='";
            txt += img[0].childNodes[0].nodeValue;
            txt += "'><img src='";
            txt += img[0].childNodes[0].nodeValue;
            txt += "' style='float:right;display:block;max-width:100%;' class='img-responsive'></a></p>";  
            // the display and max-width bit overrides the hiding of the image on small screens for the front page
        }
   
        txt += "<p class='news-desc' class='more-margin'>";
        txt += parse_to_add_links(des[0].childNodes[0].nodeValue);
           
        
        txt += "</div><br>";
    }
    txt += "<br><br>";
    document.getElementById("all-news").innerHTML = txt;
    
}

// replace "less_than" with "<" and "greater_than" with ">" since the latter have special meaning in html
// also remove begin_truncate (which is processed before this) and replace "nbsp" with non-breaking space
// this function also appears in index.js
function parse_to_add_links(txt) {
    var new_txt = txt.replace(/less_than/g, "<"); 
    new_txt = new_txt.replace(/greater_than/g, ">");
    new_txt = new_txt.replace(/begin_truncate/g, "");
    new_txt = new_txt.replace(/nb_sp/g, "&nbsp;");
    return new_txt;
    
}



