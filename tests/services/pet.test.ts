'use strict';
import { IPetWithDataValues } from '../../src/database/models/pet.model';
import {
  addNewPetService,
  getAllPetsService,
  getMostNumerousSpeciesService,
  getPetByIdService,
  getSpeciesAverageAgeService,
} from '../../src/services/Pets';
import { INSERT_PET_OBJECT } from '../common/mocks/pet.mock';
import { expectValidatorPetsObject, expectValidatorMostNumObject } from '../common/utils.test';

describe('PetsService', () => {

  let petId: any;

  describe('addNewPetService', () => {
    it('Validating that a pet has been inserted into the database', async () => {
      const result: any = await addNewPetService(INSERT_PET_OBJECT); 
      const insertResult: IPetWithDataValues = result.dataValues;
      const { birthdate, id } = insertResult;
      petId = id;
      // que las fechas sean de tipo Date      
      expect(birthdate).toBeInstanceOf(Date);
      // resto de validaciones
      expectValidatorPetsObject(insertResult);
    });
  });

  describe('getPetByIdService', () => {
    it('Validating that a pet object meets some requirements', async () => {
      const pet: any = await getPetByIdService(petId);    
      // que las fechas sean de tipo Date
      expect(pet.birthdate).toBeInstanceOf(Date);      
      // resto de validaciones
      expectValidatorPetsObject(pet);
    });
  });

  describe('getAllPetsService', () => {
    it('Validating that the list of pets meets certain requirements', async () => {
      const pets: any = await getAllPetsService();
      expect(Array.isArray(pets)).toBe(true);      
      pets.forEach(expectValidatorPetsObject);
    });
  });  

  describe('getMostNumerousSpeciesService', () => {
    it('Validating that the most numerous species is correctly received', async () => {
      const pet: any = await getMostNumerousSpeciesService();    
      expectValidatorMostNumObject(pet);
    });
  });

  describe('getSpeciesAverageAgeService', () => {
    it('Validating that the average age by species is correctly received', async () => {
      const species = 'dog';
      const average: number = await getSpeciesAverageAgeService(species);  
      expect(typeof average).toBe('number');
      expect(average).toBeGreaterThan(0);
    });
  });

});
