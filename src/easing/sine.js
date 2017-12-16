const sine = (x) => 1 - Math.cos(x * Math.PI / 2)

sine.in = sine
sine.out = (x) => Math.sin(x * Math.PI / 2)
sine.inout = (x) => (1 - Math.cos(x * Math.PI)) / 2

export {
  sine,
}
