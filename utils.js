function toHash(input) {
  const inputStr = JSON.stringify(input)
  var hash = 0,
    i,
    chr
  for (i = 0; i < inputStr.length; i++) {
    chr = inputStr.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

function clone(input) {
  return JSON.parse(JSON.stringify(input))
}

module.exports = {
  toHash,
  clone,
}
