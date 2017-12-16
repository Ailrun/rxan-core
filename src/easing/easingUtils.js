const buildRangeError = (name) => {
  const errorMessage =
    `input of ${name} should be smaller than 1, and larger than 0`

  return new RangeError(errorMessage)
}
const withDomainChecker = (f) => (x) => {
  if (x < 0 || x > 1) {
    throw buildRangeError(f.name)
  }

  return f(x)
}

const asEaseOut = (f) => (x) => 1 - f(1 - x)
const asEaseInOut = (f) => (x) => x < 0.5 ?
  f(2 * x) / 2 :
  1 - f(2 * (1 - x)) / 2

export {
  asEaseOut,
  asEaseInOut,
  withDomainChecker,
}
