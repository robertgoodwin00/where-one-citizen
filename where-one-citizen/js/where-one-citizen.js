$(document).ready(function () {

    // letter animation code from https://speckyboy.com/css-javascript-text-animation-snippets/ 
    /* This code is not required for the letter animation. This is only needed for the repeatation */
    function repeat_animate() {
        //var classes =  $(".six").attr('class');
        var elem = $(".six");
        elem.attr('class','animate');
        setTimeout(function(){
            elem.addClass('six');
        }, 20);
        
        //setTimeout(repeat_animate, 60000);
    }
    
    //setInterval(repeat_animate, 5000);
    
    
            
    
    
    // News-related
    
  
    var name = "news.xml";
    
    
    var more_news = "<a href='news/index.html'>MORE NEWS</a>";
    var kuwashiku;
    kuwashiku = "See " + more_news + " for details.";
    
    
    // read news from xml and insert into document
    var yohttp = new XMLHttpRequest();
    yohttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            //document.getElementById("news-date").innerHTML = "fifi";
            if (this.status === 200) {
                doitnow(this, 2); 
                //doitnow2(this); // second news item added 6/13/2019
                //document.getElementById("news-title").innerHTML = "fufu";
            }
        }
    };

    
    var url = "../news/";
    
    yohttp.open("GET", url + name, true);
    yohttp.send();

    
    

    // get news item(s) and insert it into document
    function doitnow(xml, num_news_items) {
        var xmlDoc = xml.responseXML;
        x = xmlDoc.getElementsByTagName("item");
    
        for (k = 0; k < num_news_items; k++) {
            
            document.getElementsByClassName("news-title")[k].innerHTML = "~ " + x[k].getElementsByTagName("title")[0].childNodes[0].nodeValue + " ~";
    
            document.getElementsByClassName("news-date")[k].innerHTML =
            x[k].getElementsByTagName("date")[0].childNodes[0].nodeValue;

            document.getElementsByClassName("news-desc")[k].innerHTML =
            parse_to_add_links(truncate_desc(x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue));
        
                 
        }
        
        // right now we only try to do the image for the most recent news item, but maybe improve this later so that we can do an image for any item. because right now this code produces an error if there are no images, causing the function to terminate at this point
        
        var img_src = x[0].getElementsByTagName("image")[0].childNodes[0].nodeValue;
        img_src = img_src.replace(/\s/g, '');
        if (img_src.length > 0) {
            document.getElementsByClassName("news-image")[0].innerHTML = "<img src='news/" + img_src + "' class='img-responsive'>";  
        }
        
            /*var img_src2 = x[0].getElementsByTagName("image")[1].childNodes[0].nodeValue;
            img_src2 = img_src2.replace(/\s/g, '');
            if (img_src2.length > 0) {
                document.getElementById("news-image").innerHTML += "<img src='news/" + img_src2 + "' class='img-responsive'>";  
            }*/   
        
                
    }
    
    // get the second news item and insert it into document
    function doitnow2(xml) {
        var xmlDoc = xml.responseXML;
        x = xmlDoc.getElementsByTagName("item");
    
        document.getElementsByClassName("news-title")[1].innerHTML = "~ " + x[1].getElementsByTagName("title")[0].childNodes[0].nodeValue + " ~";
    
        document.getElementsByClassName("news-date")[1].innerHTML =
        x[1].getElementsByTagName("date")[0].childNodes[0].nodeValue;

        document.getElementById("news-desc2").innerHTML =
        parse_to_add_links(truncate_desc(x[1].getElementsByTagName("description")[0].childNodes[0].nodeValue));
        
        var img_src = x[1].getElementsByTagName("image")[0].childNodes[0].nodeValue;
        img_src = img_src.replace(/\s/g, '');
        if (img_src.length > 0) {
            document.getElementsByClassName("news-image")[1].innerHTML = "<img src='news/" + img_src + "' class='img-responsive'>";  
        }
        
        /*var img_src2 = x[0].getElementsByTagName("image")[1].childNodes[0].nodeValue;
        img_src2 = img_src2.replace(/\s/g, '');
        if (img_src2.length > 0) {
            document.getElementById("news-image").innerHTML += "<img src='news/" + img_src2 + "' class='img-responsive'>";  
        }*/
                
    }
    
    
    
    // replace "less_than" with "<" and "greater_than" with ">" since the latter have special meaning in html
    // also remove begin_truncate (which is processed before this) and replace "nbsp" with non-breaking space
    // this function also appears in news.js
    function parse_to_add_links(txt) {
        var new_txt = txt.replace(/less_than/g, "<"); 
        new_txt = new_txt.replace(/greater_than/g, ">");
        new_txt = new_txt.replace(/begin_truncate/g, "");
        new_txt = new_txt.replace(/nb_sp/g, "&nbsp;");
        return new_txt;
    
    }
    
    // truncate at the first appearance of "begin_truncate" and add add More News link
    function truncate_desc(txt) {
        var begin_truncate;
        begin_truncate = txt.indexOf('begin_truncate');
        var new_txt;
        if (begin_truncate !== -1) 
        {
            new_txt = "<br><div id='no-display-on-tiny-screen'>" + txt.substring(0, begin_truncate) + "</div><span style='font-size:smaller;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + kuwashiku + "</span>";
            return new_txt;
        }
        else {
            new_txt = "<br><div id='no-display-on-tiny-screen'>" + txt + "<br><br></div><span style='font-size:smaller;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + more_news + "</span>";
            return new_txt;
        }
    }
    
    
    
    // Rotating Text (from https://freebiesupply.com/blog/css-text-effects-from-codepen/)
   
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 0;
    var i;
    for (i = 0; i < words.length; i = i + 1) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord === words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        var speed = 1000 / cw.length; // added this
        var i;
        for (i = 0; i < cw.length; i = i + 1) {
            animateLetterOut(cw, i, speed);
        }
  
        speed = 1000 / nw.length; //added this
        var i;
        for (i = 0; i < nw.length; i = i + 1) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            
            // added this to make certain letters transparent, so as to have phrases with spaces, cause otherwise the spaces are gone
            if (nw[i].innerHTML === '_') {
                nw[i].style.opacity = 0;
            }
            
            
            animateLetterIn(nw, i, speed);
        }
  
        currentWord = (currentWord === wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i, speed) {   // added speed parameter based on word length
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * speed);
    }

    function animateLetterIn(nw, i, speed) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * speed));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        var i;
        var letter;
        for (i = 0; i < content.length; i = i + 1) {
            letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            
            word.appendChild(letter);
            letters.push(letter);
        }
        
  
        wordArray.push(letters);
    }

    // the whole point of the below line is to allow the words to be invisible on android browser which cannot display the rotating text
    //document.getElementById("image-message").style.visibility = "visible";
    document.getElementById("image-message").style.display = "block";
    
    changeWord();
    setInterval(changeWord, 4000);
    
    
      
});



