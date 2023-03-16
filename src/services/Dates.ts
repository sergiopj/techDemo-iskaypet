'use strict';
import moment from 'moment';

export class Dates {

  /** receives the date of birth and returns the age based on the current date 
   * @param birthdate
   * @returns {number}
  */  
  
  static calculateAgeInYears(birthdate: string): number {
    const now = moment();    
    return now.diff(birthdate, 'years');
  }
  
}

