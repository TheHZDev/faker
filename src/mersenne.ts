const Gen = require('../vendor/mersenne').MersenneTwister19937;

export class Mersenne {
  private gen = new Gen();

  constructor() {
    this.gen.init_genrand(new Date().getTime() % 1000000000);
  }

  rand(max?: number, min?: number) {
    // TODO @Shinigami92 2022-01-11: This is buggy, cause if min is not passed but only max,
    // then min will be undefined and this result in NaN for the whole function
    if (max === undefined) {
      min = 0;
      max = 32768;
    }

    return Math.floor(this.gen.genrand_real2() * (max - min) + min);
  }

  seed(S: number) {
    if (typeof S != 'number') {
      throw new Error('seed(S) must take numeric argument; is ' + typeof S);
    }

    this.gen.init_genrand(S);
  }

  seed_array(A) {
    if (typeof A != 'object') {
      throw new Error(
        'seed_array(A) must take array of numbers; is ' + typeof A
      );
    }

    this.gen.init_by_array(A, A.length);
  }
}
