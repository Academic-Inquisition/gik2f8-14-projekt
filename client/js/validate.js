const fileNameValidator = new RegExp('^[\\w\\-. ]+$')
const urlValidator = new RegExp('^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$')

function validateURL(input) {
    return urlValidator.test(input)
}

function validatePlaylistName(input) {
    return fileNameValidator.test(input)
}