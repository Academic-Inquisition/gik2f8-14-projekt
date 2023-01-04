const urlValidator = new RegExp('^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$')
let isValidURL = urlValidator.test("https://www.albumartexchange.com/coverart/_tn/le/ledzeppelin_ledzeppeliniv12_crcx.jpg")
console.log(isValidURL)