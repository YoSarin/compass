import React from 'react';
import { Main } from './main';
import { NavigationScreenProp } from "react-navigation"
import renderer from 'react-test-renderer';

var navigation:any

beforeEach(() => {
  navigation = jest.fn<NavigationScreenProp<any>>()
})

it('renders without crashing', () => {
  const rendered = renderer.create(<Main navigation={new navigation()} />).toJSON();
  expect(rendered).toBeTruthy()
});
