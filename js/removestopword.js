var res = "[";
console.log(text_input);
k = text_input.indexOf('\"');
console.log(k);
while (k !== -1) {
  var s = text_input.slice(k + 1, text_input.length);

  m = s.indexOf('\"');

  res = res + text_input.substr(k, m + 2) + ',';

  text_input = s.slice(m + 1, text_input.length);

  k = text_input.indexOf('\"');
}
console.log(res);