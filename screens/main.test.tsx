import React from 'react';
import { Main } from './main';
import renderer from 'react-test-renderer';

var navigation:any

beforeEach(() => {
  navigation = jest.fn()
})

it('renders without crashing', () => {
  const rendered = renderer.create(<Main navigation={new navigation()} />).toJSON();
  expect(rendered).toBeTruthy()
});
