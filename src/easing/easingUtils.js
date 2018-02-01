const buildRangeError = (name) => {
  const errorMessage =
    `input of ${name} should be smaller than 1, and larger than 0`

  return new RangeError(errorMessage)
}
const buildTypeError = () => {
  const errorMessage =
    `input of withDomainChecker should have in, out, inout property.`

  return new TypeError(errorMessage)
}

const withDomainCheckerImpl = (f) => (x) => {
  if (x < 0 || x > 1) {
    throw buildRangeError(f.name)
  }

  return f(x)
}
const withDomainChecker = (f) => {
  if (!f.in || !f.out || !f.inout) {
    throw buildTypeError()
  }

  const newF = withDomainCheckerImpl(f)
  newF.in = withDomainCheckerImpl(f.in)
  newF.out = withDomainCheckerImpl(f.out)
  newF.inout = withDomainCheckerImpl(f.inout)

  return newF
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
