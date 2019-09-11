import React from 'react';
import { Main } from './main';
import renderer from 'react-test-renderer';

var navigation:any

beforeEach(() => {
  navigation = jest.fn()
  console = {
    warn: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    trace: jest.fn(),
    debug: jest.fn(),
    table: jest.fn(),
    disableYellowBox: false,
    ignoredYellowBox: []
  }
})

it('renders without crashing', () => {
  const rendered = renderer.create(<Main navigation={new navigation()} />).toJSON();
  expect(rendered).toBeTruthy()
});
