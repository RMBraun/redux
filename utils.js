function clone(input) {
  return JSON.parse(JSON.stringify(input))
}

module.exports = {
  clone,
}
