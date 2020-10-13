import React from 'react';
import { Coords } from './coords';
import renderer from 'react-test-renderer';

var navigation:any

beforeEach(() => {
  navigation = jest.fn()
})

it('can construct', () => {
  let coords = new Coords();
});

it('calculates proper distance', () => {
  let brno = new Coords(49.195060, 16.606837);
  let praha = new Coords(50.073658, 14.418540);

  let distance = brno.DistanceTo(praha);

  expect(distance).toBeGreaterThan(185*1000);
  expect(distance).toBeLessThan(186*1000);

  console.log(distance);
});
