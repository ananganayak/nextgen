import { DeleteonlyPipe } from './deleteonly.pipe';

describe('DeleteonlyPipe', () => {
  it('create an instance', () => {
    const pipe = new DeleteonlyPipe();
    expect(pipe).toBeTruthy();
  });
});
