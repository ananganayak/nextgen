import { WriteonlyPipe } from './writeonly.pipe';

describe('WriteonlyPipe', () => {
  it('create an instance', () => {
    const pipe = new WriteonlyPipe();
    expect(pipe).toBeTruthy();
  });
});
