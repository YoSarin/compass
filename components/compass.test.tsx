import React from 'react';
import { Compass } from './compass';
import { NavigationScreenProp } from "react-navigation"
import renderer from 'react-test-renderer';

var navigation:any

describe("Compass", () => {
  beforeEach(() => {
    navigation = jest.fn<NavigationScreenProp<any>>()
  })

  it('renders without crashing', () => {
    const rendered = renderer.create(<Compass scale={5} direction={180} />).toJSON();
    expect(rendered).toBeTruthy()
  })

})
