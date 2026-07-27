// =========================
// NeoEnglish Translator
// script.js
// =========================

const englishBox = document.getElementById("english");
const neoenglishBox = document.getElementById("neoenglish");

const translateButton = document.getElementById("translateButton");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");

const speaker = document.getElementById("speaker");

translateButton.addEventListener("click", translate);
copyButton.addEventListener("click", copyTranslation);
clearButton.addEventListener("click", clearAll);

function translate(){

    let text = englishBox.value.trim();

    if(text.length === 0){
        neoenglishBox.value = "";
        return;
    }

    let ending = "-en";

    if(text.endsWith("?")){
        ending = "-qu";
        text = text.slice(0,-1);
    }

    else if(text.endsWith("!")){
        ending = "-ex";
        text = text.slice(0,-1);
    }

    else if(text.endsWith(".")){
        ending = "-en";
        text = text.slice(0,-1);
    }

    let words = text.split(/\s+/);

    for(let i=0;i<words.length;i++){

        words[i] = translateWord(words[i]);

    }

    neoenglishBox.value = words.join(" ") + ending;

}

function translateWord(word){

    let w = word.toLowerCase();

    //=========================
    // Pronouns
    //=========================

    if(w==="my"){

        if(speaker.value==="male")
            return "hy";

        return "sy";

    }

    if(w==="myself"){

        if(speaker.value==="male")
            return "hyself";

        return "syself";

    }

    //=========================
    // Articles
    //=========================

    if(w==="the")
        return "The";

    //=========================
    // Suffixes
    //=========================

    if(w.endsWith("ed")){

        w=w.slice(0,-2)+"ʖ";

    }

    if(w.endsWith("er")){

        w=w.slice(0,-2)+"ɻ";

    }

    //=========================
    // Digraphs
    //=========================

    w=w.replaceAll("sh","ʃ");
    w=w.replaceAll("ch","ƹ");
    w=w.replaceAll("th","Ꝛ");
    w=w.replaceAll("ng","Ŋ");

    //=========================
    // Q
    //=========================

    w=w.replaceAll("q","kw");

    // remove first vowel after kw
    w=w.replace(/^kw([aeiou])/,"kw");

    //=========================
    // C
    //=========================

    // soft c
    w=w.replace(/c(?=[eiy])/g,"s");

    // hard c
    w=w.replace(/c/g,"k");

    //=========================
    // remove x
    //=========================

    w=w.replaceAll("x","");

    //=========================
    // H <-> F
    //=========================

    w=w.replaceAll("h","¤");
    w=w.replaceAll("f","h");
    w=w.replaceAll("¤","f");

    //=========================
    // S <-> Z
    //=========================

    w=w.replaceAll("s","¤");
    w=w.replaceAll("z","s");
    w=w.replaceAll("¤","z");

    //=========================
    // Double vowels
    //=========================

    w=w.replaceAll("aa","ā");
    w=w.replaceAll("ee","ē");
    w=w.replaceAll("ii","ī");
    w=w.replaceAll("oo","ō");
    w=w.replaceAll("uu","ū");

    //=========================
    // Double consonants
    //=========================

    const doubles=[
        "bb","cc","dd","ff","gg","hh",
        "jj","kk","ll","mm","nn","pp",
        "rr","ss","tt","vv","ww","yy","zz"
    ];

    for(let d of doubles){

        let replacement=d[0]+"\u0304";

        w=w.replaceAll(d,replacement);

    }

    return w;

}

function copyTranslation(){

    navigator.clipboard.writeText(
        neoenglishBox.value
    );

}

function clearAll(){

    englishBox.value="";
    neoenglishBox.value="";

}
