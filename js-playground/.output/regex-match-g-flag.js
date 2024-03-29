// ### ".match [g flag]" examples ###

/*
- Return: ["all matches"] | ["the first complete match but no its related capturing groups"] | null
- Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match#return_value
*/

// {\: (backslash) to escape special characters}
const regex1 = /a\.b/;
console.log("123 a.b 123".match(/a\.b/g)); // ✅ | ["a.b"]
console.log("a.b c a.b".match(/a\.b/g)); // ✅ | ["a.b","a.b"]
console.log("a.b".match(/a\.b/g)); // ✅ | ["a.b"]
console.log("aa.bb".match(/a\.b/g)); // ✅ | ["a.b"]
console.log("".match(/a\.b/g)); // ✅ | null
console.log(" a*b ".match(/a\.b/g)); // ✅ | null
console.log("ab".match(/a\.b/g)); // ✅ | null
console.log(".".match(/a\.b/g)); // ✅ | null

// {\d: any digit between 0 and 9 | \d = [0-9]}
const regex2 = /\d/;
console.log("1a2a3".match(/\d/g)); // ✅ | ["1","2","3"]
console.log("a 3".match(/\d/g)); // ✅ | ["3"]
console.log("3".match(/\d/g)); // ✅ | ["3"]
console.log("".match(/\d/g)); // ✅ | null
console.log(" ".match(/\d/g)); // ✅ | null
console.log("r".match(/\d/g)); // ✅ | null

// {\w: (All word characters => [a-z], [A-Z], [0-9], [_]}
const regex3 = /^[\w]+$/;
console.log("5jhdAe2".match(/^[\w]+$/g)); // ✅ | ["5jhdAe2"]
console.log("_".match(/^[\w]+$/g)); // ✅ | ["_"]
console.log("2".match(/^[\w]+$/g)); // ✅ | ["2"]
console.log("sferwf".match(/^[\w]+$/g)); // ✅ | ["sferwf"]
console.log("123_ddDE_Ad".match(/^[\w]+$/g)); // ✅ | ["123_ddDE_Ad"]
console.log("123AAd frfr DFD".match(/^[\w]+$/g)); // ✅ | null
console.log("1A{][]}".match(/^[\w]+$/g)); // ✅ | null
console.log("b--$$$3".match(/^[\w]+$/g)); // ✅ | null
console.log("".match(/^[\w]+$/g)); // ✅ | null
console.log(" ".match(/^[\w]+$/g)); // ✅ | null
console.log("~!@#$%^&*()+".match(/^[\w]+$/g)); // ✅ | null

// {\s: (whitespaces)}
const regex4 = /\s/;

// {\n: (line-breaks)}
const regex5 = /\n/;

// {.: any single character}
const regex6 = /./;

// {.*: any single character (Zero or more of a, input has to start with a, it takes all)}
const regex7 = /\d*/;

// {.+: any single character (One or more of a, input does not have to start with a, it takes all)}
const regex8 = /\d+/;

// {.?: any single character (Zero or one of a, input has to start with a, it takes only one match [smallest possible])}
const regex9 = /\d?/;

// {.splice}
const regex10 = /\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/;
console.log(
  ".splice(1)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(1)"]
console.log(
  ".splice(1, 1)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(1, 1)"]
console.log(
  ".splice(1, 3)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(1, 3)"]
console.log(
  ".splice(2, 0, 'b.a')".match(
    /\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g
  )
); // ✅ | [".splice(2, 0, \"b.a\")"]
console.log(
  ".splice(3, 0, 'c.a', 'c.b')".match(
    /\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g
  )
); // ✅ | [".splice(3, 0, \"c.a\", \"c.b\")"]
console.log(
  ".splice(-1, 3)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(-1, 3)"]
console.log(
  ".splice(-1, -3)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(-1, -3)"]
console.log(
  ".splice(1, -3)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(1, -3)"]
console.log(
  ".splice(-1)".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ✅ | [".splice(-1)"]
console.log(
  ".splice()".match(/\.([a-z]{1,15})\((-?\d(, -?\d){0,1}(, ".*"){0,})\)/g)
); // ❌ | null

// {{exact}: [Example => Colombian phone number]}
const regex11 = /^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/;
console.log("3113728898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | ["3113728898"]
console.log("311-372-8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | ["311-372-8898"]
console.log("311 372 8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | ["311 372 8898"]
console.log("+57 3113728898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | ["+57 3113728898"]
console.log(
  "+57 311-372-8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)
); // ✅ | ["+57 311-372-8898"]
console.log(
  "+57 311 372 8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)
); // ✅ | ["+57 311 372 8898"]
console.log("311372 8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ❌ | ["311372 8898"]
console.log("311372-8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ❌ | ["311372-8898"]
console.log("311372889".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | null
console.log("4113728898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | null
console.log("3113728898s".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | null
console.log("311-372-8898-".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | null
console.log("+57311-372-8898".match(/^(\+57 )?3\d{2}[-, ]?\d{3}[-, ]?\d{4}$/g)); // ✅ | null

// {{min,max}: [Example => Zip code with numbers and its length between 3 and 6]}
const regex12 = /^\d{3,6}$/;
console.log("123456".match(/^\d{3,6}$/g)); // ✅ | ["123456"]
console.log("12345".match(/^\d{3,6}$/g)); // ✅ | ["12345"]
console.log("1234".match(/^\d{3,6}$/g)); // ✅ | ["1234"]
console.log("123".match(/^\d{3,6}$/g)); // ✅ | ["123"]
console.log("1234567".match(/^\d{3,6}$/g)); // ✅ | null
console.log("12345c".match(/^\d{3,6}$/g)); // ✅ | null
console.log("12".match(/^\d{3,6}$/g)); // ✅ | null

// {{min,}: Length equals or greater than min}
const regex13 = /^\d{3,}$/;
console.log("12345".match(/^\d{3,}$/g)); // ✅ | ["12345"]
console.log("1234".match(/^\d{3,}$/g)); // ✅ | ["1234"]
console.log("123".match(/^\d{3,}$/g)); // ✅ | ["123"]
console.log("123c".match(/^\d{3,}$/g)); // ✅ | null
console.log("12".match(/^\d{3,}$/g)); // ✅ | null

// {{min,max}: [Example => Password with digits, lowercase and uppercase letters and some special characters]}
const regex14 = /([A-Z]+[a-z]+\d+)/;
console.log("Diego123".match(/([A-Z]+[a-z]+\d+)/g)); // ✅ | ["Diego123"]
console.log("123diegoRayo".match(/([A-Z]+[a-z]+\d+)/g)); // ✅ | null
