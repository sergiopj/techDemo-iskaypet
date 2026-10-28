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
      const petDataToInsert: any = {
        ...INSERT_PET_OBJECT,
        birthdate: new Date(INSERT_PET_OBJECT.birthdate),
      };
      const dbQueriesMock = jest.spyOn(DbQueries, 'insertData'); 
      dbQueriesMock.mockImplementationOnce(async () => petDataToInsert);
      const result: any = await addNewPetService(petDataToInsert); 
      expectValidatorInsertPetsObject(result);
    });
  });

  describe('getPetByIdService', () => {
    it('Validating that a pet object meets some requirements', async () => {
      const petId = '641a2b3c4d5e6f7g8h9i0j1k';
      const dbPetObject: any = { ...PET_OBJECT_DB, id: petId };
      const dbQueriesMock = jest.spyOn(DbQueries, 'findElemById'); 
      dbQueriesMock.mockImplementationOnce(async () => dbPetObject);
      const pet: any = await getPetByIdService(petId);
      expectValidatorPetsObject(pet);
    });
  });

  describe('getAllPetsService', () => {
    it('Validating that the list of pets meets certain requirements', async () => {
      const dbPetsListObject: any = PET_OBJECT_LIST.map((pet) => ({
        ...pet,
        id: pet._id,
      }));
      const dbQueriesMock = jest.spyOn(DbQueries, 'getAllElems'); 
      dbQueriesMock.mockImplementationOnce(async () => dbPetsListObject);
      const pets: any = await getAllPetsService();
      expect(Array.isArray(pets)).toBe(true);      
      pets.forEach(expectValidatorPetsObject);
    });
  }); 

});
