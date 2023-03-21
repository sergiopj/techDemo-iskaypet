'use strict';
import { ArithmeticCalcs } from '../../src/services/ArithmeticCalcs';

describe('ArithmeticCalcService', () => {  

  describe('calculateAgeInYears', () => {
    it('validation of whether the number of years is received correctly from a date of birth', async () => {
      const years: number = await ArithmeticCalcs.calculateAgeInYears('2000-03-15');    
      expect(typeof years).toBe('number');
      expect(years).toBeGreaterThan(0);
    });
  }); 

});
