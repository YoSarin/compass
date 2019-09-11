import React from 'react';
import { Location } from './location';

var navigation:any

beforeEach(() => {
  navigation = jest.fn()
})

it('creates heading watcher properly', async () => {
  var watcher = await Location.WatchHeading((heading) => {})
  expect(watcher).toBeDefined()
});
