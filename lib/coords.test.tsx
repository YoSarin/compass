import { ICoords, DistanceBetween } from './coords';

var navigation:any

beforeEach(() => {
  navigation = jest.fn()
})

it('calculates proper distance', () => {
  let brno: ICoords = { latitude: 49.195060, longitude: 16.606837 };
  let praha: ICoords = { latitude: 50.073658, longitude: 14.418540 };

  let distance = DistanceBetween(brno, praha);

  expect(distance).toBeGreaterThan(185*1000);
  expect(distance).toBeLessThan(186*1000);

  console.log(distance);
});
