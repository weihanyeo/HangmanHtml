// Retreiving word from Dictionary APIS
// Using 2 web apis for word and definition
// Slightly slower than using the inital data-stored dictionary
let flag = true;

while (flag) {
  var xhttp1 = new XMLHttpRequest();
  xhttp1.open("GET", "https://random-word-api.herokuapp.com/word", false);
  xhttp1.send();
  let wordRes = xhttp1.responseText;
  let wordParsedRes = JSON.parse(wordRes);

  var xhttp2 = new XMLHttpRequest();
  xhttp2.open(
    "GET",
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + wordParsedRes[0],
    false
  );
  xhttp2.send();
  let defRes = xhttp2.responseText;
  let defParsedRes = JSON.parse(defRes);

  if (defParsedRes.title == "No Definitions Found") {
    console.log(
      "No Definitions Found for current word, to look for new word again"
    );
  } else {
    let res = {
      word: wordParsedRes[0],
      hint:
        defParsedRes[0].meanings[0].definitions[0].definition +
        " (" +
        defParsedRes[0].meanings[0].partOfSpeech +
        ")",
    };
    flag = false;
    this.postMessage(res);
  }
}
