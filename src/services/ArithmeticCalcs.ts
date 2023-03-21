'use strict';
import moment from 'moment';
import { Pet } from '../database/models/pet.model';

export class ArithmeticCalcs {

  /** receives the date of birth and returns the age based on the current date 
   * @param birthdate
   * @returns {number}
   */    
  static calculateAgeInYears(birthdate: string): number {
    const now = moment();    
    return now.diff(birthdate, 'years');
  }

  /** receives an age with the ages of the pets and calculates its standard deviation 
   * @param pets
   * @returns {number}
   */  
  static calculateStandarDeviation(pets: Pet[]): number {
    // square root of arithmetic mean
    const averageAge: any = this.calculateAverageAge(pets)
    // subtract each year from the average number of years
    const ageAverageDif = pets.map((pet: any) => {
      return this.calculateAgeInYears(pet.dataValues.birthdate) - averageAge;
    });
    // square each difference
    const squaredDiff = ageAverageDif.map(age => {
      return Math.pow(age, 2);
    });
    // calculate the arithmetic mean of the squared differences
    const arithmeticAvg = squaredDiff.reduce((sum, diff) => {
      return sum + diff;
    }, 0) / pets.length;
    // square root of arithmetic mean
    const standarDeviation = parseFloat(Math.sqrt(arithmeticAvg).toFixed(2));
    return standarDeviation;
  }

  /** calculates the average age of a list of pets
   * @param pets
   * @returns {number}
   */    
  static calculateAverageAge(pets: Pet[]): number {
    const averageAge = pets.reduce((sum, pet) => {
      return sum + this.calculateAgeInYears(pet.dataValues.birthdate);
    }, 0) / pets.length;
    return averageAge;
  }

  
}

