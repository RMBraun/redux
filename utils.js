function clone(input) {
  return JSON.parse(JSON.stringify(input))
}

//based off of https://github.com/dashed/shallowequal/blob/master/index.js
function shallowCompare(a, b) {
  if (Object.is(a, b)) {
    return true
  }

  if (typeof a !== 'object' || !a || typeof b !== 'object' || !b) {
    return false
  }

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  const isInB = Object.prototype.hasOwnProperty.bind(b)
  const aKeysLength = aKeys.length

  let key
  for (let i = 0; i < aKeysLength; i++) {
    key = aKeys[i]

    if (!isInB(key)) {
      return false
    }

    if (!Object.is(a[key], b[key])) {
      return false
    }
  }

  return true
}

module.exports = {
  clone,
  shallowCompare,
}
