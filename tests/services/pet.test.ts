'use strict';
import DbQueries from '../../src/services/DbQueries';
import {
  addNewPetService,
  getAllPetsService,
  getPetByIdService,
} from '../../src/services/Pets';
import { INSERT_PET_OBJECT, PET_OBJECT_DB, PET_OBJECT_LIST } from '../common/mocks/pet.mock';
import { expectValidatorPetsObject, expectValidatorInsertPetsObject } from '../common/utils.test';

describe('PetsService', () => {  

  describe('addNewPetService', () => {
    it('Validating that a pet has been inserted into the database', async () => {
      const petDataToInsert: any = INSERT_PET_OBJECT;
      const dbQueriesMock = jest.spyOn(DbQueries, 'insertData'); 
      dbQueriesMock.mockImplementationOnce(async () => petDataToInsert);
      const result: any = await addNewPetService(INSERT_PET_OBJECT); 
      expectValidatorInsertPetsObject(result);
    });
  });

  describe('getPetByIdService', () => {
    it('Validating that a pet object meets some requirements', async () => {
      const petId = 1;
      const dbPetObject: any = PET_OBJECT_DB;
      const dbQueriesMock = jest.spyOn(DbQueries, 'findElemById'); 
      dbQueriesMock.mockImplementationOnce(async () => dbPetObject);
      const pet: any = await getPetByIdService(petId);
      expectValidatorPetsObject(pet);
    });
  });

  describe('getAllPetsService', () => {
    it('Validating that the list of pets meets certain requirements', async () => {
      const dbPetsListObject: any = PET_OBJECT_LIST;
      const dbQueriesMock = jest.spyOn(DbQueries, 'getAllElems'); 
      dbQueriesMock.mockImplementationOnce(async () => dbPetsListObject);
      const pets: any = await getAllPetsService();
      expect(Array.isArray(pets)).toBe(true);      
      pets.forEach(expectValidatorPetsObject);
    });
  }); 

});
