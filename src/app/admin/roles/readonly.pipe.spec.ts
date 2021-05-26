import { ReadonlyPipe } from './readonly.pipe';

describe('ReadonlyPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadonlyPipe();
    expect(pipe).toBeTruthy();
  });
});
