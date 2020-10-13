import React from 'react';
import { Compass } from './compass';
import { NavigationScreenProp } from "react-navigation"
import renderer from 'react-test-renderer';

var navigation:any

describe("Compass", () => {
  beforeEach(() => {
    navigation = jest.fn()
    jest.useFakeTimers();
  })

  it('renders without crashing', async () => {
    const rendered = await renderer.create(<Compass scale={5} direction={180} />).toJSON();
    expect(rendered).toBeTruthy()
  })

})
