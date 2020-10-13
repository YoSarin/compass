import React from 'react';
import { Main } from './main';
import renderer from 'react-test-renderer';
import { watchPositionAsync } from 'expo-location';

var navigation: any

beforeEach(() => {
  navigation = jest.fn()
  jest.useFakeTimers();
})

it('renders without crashing', async () => {
  const rendered = renderer.create(<Main navigation={new navigation()} />).toJSON();
  expect(rendered).toBeTruthy()
});
