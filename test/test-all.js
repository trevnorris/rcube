'use strict';

const { RubiCube } = require('../lib/rubicube.js');
const assert = require('assert');

const m = `r l d'2 f2 b' u`;

const r1 = new RubiCube();
const r2 = new RubiCube();

r1.rotate(m);
r2.rotate(RubiCube.rotate2Array(m));

assert.deepEqual(r1.build(), r2.build());
