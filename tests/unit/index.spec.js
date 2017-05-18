import Queue from '../../src';

describe('functions-queue Library', () => {
  describe('constructor', () => {
    it('throws for no event', () => {
      expect(() => new Queue()).to.throw('event is required');
    });
    it('throws for no config', () => {
      expect(() => new Queue({})).to.throw('functions config is required');
    });
  });
});
