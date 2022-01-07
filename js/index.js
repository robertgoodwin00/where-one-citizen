$(document).ready(function () {


    
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



