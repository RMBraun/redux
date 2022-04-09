module.exports = function pick(...keys) {
  return target =>
    [...keys].reduce((acc, key) => {
      if (typeof key === 'string') {
        acc[key] = target[key]
      } else if (typeof key === 'function') {
        acc = Object.assign(acc, key(acc))
      } else if (typeof key === 'object') {
        acc = Object.assign(acc, key)
      }

      return acc
    }, {})
}
