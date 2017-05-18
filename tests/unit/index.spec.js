import Queue from '../../src';
import * as admin from 'firebase-admin'

var serviceAccount = require("../../serviceAccount.json");
/* global describe, it, expect */
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
