var statuss = 0;
var text_input;
var IDF = [];
var IDF_no_stopwords = [];
var TFIDF;
var TFIDF_no_stopwords;
var number_d_contain_word_t = [];
var dictionary = new Set();
var dictionary_no_stopwords = new Set();
var num_word_dictionary;
var num_word_dictionary_no_stopwords;
var num_documentts = 0;
var documentt = [];
var clean_documentt = [];
var num_word_clean_documentt = [];
var clean_documentt_no_stopwords = [];
var num_word_clean_documentt_no_stopwords = [];
var total_word;

var max_TFIDF_dictionary = [];
var max_TFIDF_dictionary_no_stopwords = [];

var word_rank = [];
var id_word_rank = [];

var word_rank_no_stopwords = [];
var id_word_rank_no_stopwords = [];

var frequency_rank = [];
var id_frequency_rank = [];
var frequency_rank_no_stopwords = [];
var id_frequency_rank_no_stopwords = [];

var stop_words = new Set([
  "a",
  "but",
  "during",
  "hows",
  "it's",
  "said",
  "about",
  "by",
  "each",
  "however",
  "it’s",
  "says",
  "above",
  "can",
  "either",
  "i",
  "its",
  "see",
  "across",
  "can't",
  "for",
  "i'd",
  "let's",
  "she",
  "after",
  "can’t",
  "from",
  "i’d",
  "let’s",
  "she'd",
  "all",
  "cant",
  "given",
  "i'll",
  "lets",
  "she’d",
  "along",
  "cannot",
  "had",
  "i’ll",
  "may",
  "shed",
  "also",
  "could",
  "has",
  "i'm",
  "me",
  "she'll",
  "am",
  "couldn't",
  "have",
  "i’m",
  "more",
  "she’ll",
  "an",
  "couldn’t",
  "having",
  "im",
  "most",
  "shell",
  "and",
  "couldnt",
  "he",
  "i've",
  "much",
  "should",
  "any",
  "did",
  "he'd",
  "i’ve",
  "must",
  "since",
  "are",
  "didn't",
  "he’d",
  "ive",
  "my",
  "so",
  "aren't",
  "didn’t",
  "hed",
  "if",
  "no",
  "some",
  "aren’t",
  "didnt",
  "he'll",
  "in",
  "not",
  "such",
  "arent",
  "do",
  "he’ll",
  "instead",
  "now",
  "than",
  "as",
  "does",
  "her",
  "into",
  "of",
  "that",
  "at",
  "doesn't",
  "here",
  "is",
  "on",
  "the",
  "be",
  "doesn’t",
  "hers",
  "isn't",
  "one",
  "their",
  "because",
  "doesnt",
  "him",
  "isn’t",
  "only",
  "them",
  "been",
  "doing",
  "himself",
  "isnt",
  "or",
  "then",
  "before",
  "done",
  "his",
  "it",
  "other",
  "there",
  "being",
  "don't",
  "how",
  "it'll",
  "our",
  "therefore",
  "between",
  "don’t",
  "how's",
  "it’ll",
  "out",
  "these",
  "both",
  "dont",
  "how’s",
  "itll",
  "over",
  "they",
  "this",
  "we’re",
  "who’ve",
  "those",
  "we've",
  "whove",
  "through",
  "we’ve",
  "will",
  "to",
  "weve",
  "with",
  "too",
  "were",
  "within",
  "towards",
  "what",
  "without",
  "under",
  "what's",
  "won't",
  "until",
  "what’s",
  "won’t",
  "us",
  "whats",
  "would",
  "use",
  "when",
  "wouldn't",
  "used",
  "when's",
  "wouldn’t",
  "uses",
  "when’s",
  "you",
  "using",
  "whens",
  "you'd",
  "very",
  "where",
  "you’d",
  "want",
  "whether",
  "youd",
  "was",
  "which",
  "you'll",
  "wasn't",
  "while",
  "you’ll",
  "wasn’t",
  "who",
  "youll",
  "wasnt",
  "who'll",
  "you're",
  "we",
  "who’ll",
  "you’re",
  "we'd",
  "wholl",
  "youre",
  "we’d",
  "who's",
  "you've",
  "we'll",
  "who’s",
  "you’ve",
  "we’ll",
  "’s",
  "’d",
  "whos",
  "youve",
  "we're",
  "who've",
  "your",
  "mrs",
  "mr",
  "miss",
  "s",
  "d",
]);

function CountFrequency(frequency_rank, documentt, dictionary) {
  var i = 0;
  var num = documentt.length;
  for (const word of dictionary) {
    frequency_rank[i] = 0;

    for (var j = 0; j < num; j++) {
      frequency_rank[i] = frequency_rank[i] + Frequency(word, documentt[j]);
    }
    i++;
  }
}

function SortFrequency() {
  CountFrequency(frequency_rank, clean_documentt, dictionary);
  CountFrequency(
    frequency_rank_no_stopwords,
    clean_documentt_no_stopwords,
    dictionary_no_stopwords
  );
  for (var i = 0; i < dictionary.size; i++) id_frequency_rank[i] = i;
  for (var i = 0; i < dictionary_no_stopwords.size; i++)
    id_frequency_rank_no_stopwords[i] = i;
  SelectionSort(frequency_rank, id_frequency_rank);
  SelectionSort(frequency_rank_no_stopwords, id_frequency_rank_no_stopwords);
}

function Frequency(word, documentt) {
  documentt = " " + documentt + " ";
  var k = documentt.indexOf(" " + word + " ");
  res = 0;
  while (k >= 0) {
    res++;
    documentt = documentt.replace(" " + word + " ", " ");
    k = documentt.indexOf(" " + word + " ");
  }
  return res;
}

function ClearData(s) {
  var len = s.length;
  var str = s;
  var ii = 0;

  while (ii < str.length) {
    code = str.charCodeAt(ii);

    if ((code > 47 && code < 58) || (code > 96 && code < 123) || code === 32)
      ii++;
    else str = str.replace(str[ii], "");
  }
  return str;
}

function RemoveStopwords(s) {
  const iterator1 = stop_words.values();
  for (var i = 0; i < stop_words.size; i++) {
    var x = iterator1.next().value;
    var k = s.indexOf(x);
    if (k >= 0) s = s.replace(x, "");
  }
  return s;
}

function AddWordToDictionary(word, dictionary) {
  if (dictionary.has(word) === false) dictionary.add(word);
  return dictionary;
}

function SplitTheVocabulary() {
  for (var i = 0; i < num_documentts; i++) {
    var doc = " " + clean_documentt[i] + " ";
    var len = doc.length;
    num_word_clean_documentt[i] = 0;
    num_word_clean_documentt_no_stopwords[i] = 0;
    while (len > 0) {
      if (doc[0] === " ") {
        var s = doc.slice(1, doc.length);
        doc = s;
        continue;
      }
      k = doc.indexOf(" ");
      var word = doc.substr(0, k);
      if (word !== "") {
        num_word_clean_documentt[i]++;
        total_word++;
        dictionary = AddWordToDictionary(word, dictionary);
        if (stop_words.has(word))
          clean_documentt_no_stopwords[i] = clean_documentt_no_stopwords[
            i
          ].replace(" " + word + " ", " ");
        else {
          dictionary_no_stopwords = AddWordToDictionary(
            word,
            dictionary_no_stopwords
          );
          num_word_clean_documentt_no_stopwords[i]++;
        }
      }
      var s = doc.slice(k + 1, doc.length);
      doc = s;
      len = doc.length;
    }
  }
}

function DivideDocumentt() {
  //xoa ky tu xuong hong cuoi van ban dau vao
  var len = text_input.length;
  while (text_input.charCodeAt(len - 1) === 10) {
    var s = text_input.substring(0, len - 1);
    text_input = s;
    len = text_input.length;
  }
  len = text_input.length;
  while (text_input.charCodeAt(len - 1) === 32) {
    var s = text_input.substring(0, len - 1);
    text_input = s;
    len = text_input.length;
  }

  while (text_input.indexOf(String.fromCharCode(10)) >= 0) {
    text_input = text_input.replace(String.fromCharCode(10), ".");
  }

  var k = text_input.indexOf(".");

  while (k >= 0) {
    if (k != 0) {
      var original = text_input.substring(0, k);
      var clean = ClearData(original);
      if (clean !== "") {
        documentt[num_documentts] = original;
        clean_documentt[num_documentts] = clean.toLowerCase();
        clean_documentt_no_stopwords[num_documentts] =
          clean_documentt[num_documentts];
        num_documentts++;
      }
    }
    text_input = text_input.slice(k + 1, text_input.length);
    k = text_input.indexOf(".");
  }

  if (text_input !== "") {
    var original = text_input;
    var clean = ClearData(original);
    if (clean !== "") {
      documentt[num_documentts] = original;
      clean_documentt[num_documentts] = clean.toLowerCase();
      clean_documentt_no_stopwords[num_documentts] =
        clean_documentt[num_documentts];
      num_documentts++;
    }
  }
}

function BuildDictionary() {
  DivideDocumentt();
  SplitTheVocabulary();
}

function PrintDictionary(_dictionary, IDF, id1_list_word, id2_amount_word) {
  var num_word = _dictionary.size;
  var s = "";
  const iterator1 = _dictionary.values();
  for (i = 0; i < num_word; i++) {
    s =
      s +
      "<tr> <th scope = 'row' width='10%'> " +
      (i + 1).toString() +
      "</th> <td width='60%'>" +
      iterator1.next().value.toString() +
      "</th> <td width='30%'>" +
      IDF[i].toFixed(3).toString() +
      "</td> </tr>";
  }

  document.getElementById(id1_list_word).innerHTML = s;
  document.getElementById(id2_amount_word).innerHTML =
    "Vocabulary " +
    "<span class='badge badge-warning'>" +
    num_word.toString() +
    "/" +
    total_word.toString() +
    "</span>";
}

function PrintRank(word_rank, dictionary, id_word_rank, id, limit_decimal) {
  var num_word = word_rank.length;

  var s = "";
  for (var i = 0; i < num_word; i++) {
    s =
      s +
      "<tr> <th scope = 'row' width='10%'> " +
      (i + 1).toString() +
      "</th> <td width='60%'>" +
      Array.from(dictionary)[id_word_rank[i]] +
      "</th> <td width='30%'>" +
      word_rank[i].toFixed(limit_decimal).toString() +
      "</td> </tr>";
  }

  document.getElementById(id).innerHTML = s;
}

function CalIDF(dictionary, documentt) {
  var _IDF = [];
  var num_word = dictionary.size;
  const iterator = dictionary.values();
  for (var i = 0; i < num_word; i++) {
    var t = 0;
    var x = iterator.next().value;
    for (var j = 0; j < num_documentts; j++) {
      if (documentt[j].indexOf(x) >= 0) t++;
    }
    _IDF[i] = Math.log10(num_documentts / t);
  }
  return _IDF;
}

function TFIDFid(documentt, IDF, dictionary, num_word, TFIDF) {
  for (var i = 0; i < num_documentts; i++) {
    dim = 0;
    for (const word of dictionary) {
      TFIDF[i][dim] = IDF[dim] * (Frequency(word, documentt[i]) / num_word[i]);
      dim++;
    }
  }
  return TFIDF;
}

function CalTFIDF() {
  //init dimentsion for vector
  TFIDF = [];
  for (var i = 0; i < num_documentts; i++) TFIDF[i] = [];
  TFIDF_no_stopwords = [];
  for (var i = 0; i < num_documentts; i++) TFIDF_no_stopwords[i] = [];
  TFIDF = TFIDFid(
    clean_documentt,
    IDF,
    dictionary,
    num_word_clean_documentt,
    TFIDF
  );
  TFIDF_no_stopwords = TFIDFid(
    clean_documentt_no_stopwords,
    IDF_no_stopwords,
    dictionary_no_stopwords,
    num_word_clean_documentt_no_stopwords,
    TFIDF_no_stopwords
  );
}

function SelectionSort(value, id) {
  for (var i = 0; i < value.length - 1; i++) {
    for (var j = i + 1; j < value.length; j++) {
      if (value[j] > value[i]) {
        var temp = value[j];
        value[j] = value[i];
        value[i] = temp;
        temp = id[i];
        id[i] = id[j];
        id[j] = temp;
      }
    }
  }
}



function SortRankTFIDF() {
  // set rank for dictionary
  for (var i = 0; i < num_word_dictionary; i++) max_TFIDF_dictionary[i] = 0;
  for (var i = 0; i < num_word_dictionary_no_stopwords; i++)
    max_TFIDF_dictionary_no_stopwords[i] = 0;
  for (var i = 0; i < num_documentts; i++) {
    for (var j = 0; j < dictionary.size; j++) {
      if (TFIDF[i][j] > max_TFIDF_dictionary[j])
        max_TFIDF_dictionary[j] = TFIDF[i][j];
    }
  }
  for (var i = 0; i < num_documentts; i++) {
    for (var j = 0; j < dictionary_no_stopwords.size; j++) {
      if (TFIDF_no_stopwords[i][j] > max_TFIDF_dictionary_no_stopwords[j])
        max_TFIDF_dictionary_no_stopwords[j] = TFIDF_no_stopwords[i][j];
    }
  }

  word_rank = max_TFIDF_dictionary;
  for (var i = 0; i < dictionary.size; i++) id_word_rank[i] = i;

  word_rank_no_stopwords = max_TFIDF_dictionary_no_stopwords;
  for (var i = 0; i < dictionary_no_stopwords.size; i++)
    id_word_rank_no_stopwords[i] = i;

  SelectionSort(word_rank, id_word_rank);
  SelectionSort(word_rank_no_stopwords, id_word_rank_no_stopwords);
}

function PrintVector() {
  var s = "<th></th><th></th>";

  for (const word of dictionary) s = s + "<th>" + word + "</th>";
  document.getElementById("list_word_vector").innerHTML = s;
  s = "";
  for (var i = 0; i < num_documentts; i++) {
    s = s + "<tr><th>" + (i + 1).toString() + "</th>";
    s = s + "<td nowrap>" + documentt[i] + "</td>";
    for (var j = 0; j < dictionary.size; j++)
      s = s + "<td>" + TFIDF[i][j].toFixed(2).toString() + "</td>";
    s = s + "</tr>";
  }
  document.getElementById("list_word_tfidf").innerHTML = s;
}

function OnclickButtonResult() {
  statuss = 1;
  total_word = 0;
  frequency_rank_no_stopwords = [];
  frequency_rank = [];
  dictionary = new Set();
  dictionary_no_stopwords = new Set();
  num_word_dictionary = 0;
  num_documentts = 0;
  text_input = document.getElementById("input-area").value;
  BuildDictionary();

  num_word_dictionary = dictionary.size;
  num_word_dictionary_no_stopwords = dictionary_no_stopwords.size;
  IDF = CalIDF(dictionary, clean_documentt);
  IDF_no_stopwords = CalIDF(
    dictionary_no_stopwords,
    clean_documentt_no_stopwords
  );
  PrintDictionary(dictionary, IDF, "list_word", "amount_word");
  PrintDictionary(
    dictionary_no_stopwords,
    IDF_no_stopwords,
    "list_word_no_stopwords",
    "amount_word_no_stopwords"
  );

  //beside textarea-----
  document.getElementById("total_words_label").innerHTML = total_word;
  document.getElementById("num_documents_label").innerHTML = num_documentts;
  //beside textarea-----
}

function Control(request) {
  if (text_input !== document.getElementById("input-area").value) statuss = 0;



  for (var i = statuss + 1; i <= request; i++) {

    switch (i) {
      case 1:
        OnclickButtonResult();
        break;
      case 2:
        OnclickButtonTFIDFRank();
        break;
      case 3:
        OnclickButtonFrequencyRank();
        break;
      case 4:
        ButtonTransformVector();
        break;
    }
  }
}

function ButtonTransformVector() {
  statuss = 4;
  PrintVector();
  window.scrollBy(0, 600);
}

function OnclickButtonTFIDFRank() {
  statuss = 2;
  CalTFIDF();
  SortRankTFIDF();
  PrintRank(word_rank, dictionary, id_word_rank, "word_rank", 3);
  PrintRank(
    word_rank_no_stopwords,
    dictionary_no_stopwords,
    id_word_rank_no_stopwords,
    "word_rank_no_stopwords",
    3
  );
}

function OnclickButtonFrequencyRank() {
  statuss = 3;
  SortFrequency();
  PrintRank(frequency_rank, dictionary, id_frequency_rank, "frequency_rank", 0);
  PrintRank(
    frequency_rank_no_stopwords,
    dictionary_no_stopwords,
    id_frequency_rank_no_stopwords,
    "frequency_rank_no_stopwords",
    0
  );
}