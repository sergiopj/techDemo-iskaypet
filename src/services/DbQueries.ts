'use strict';

import { IPet, Pet } from '../database/models/pet.model';


/**
 * Function that get all elems
 * @returns {Promise<Pet[]>} db elements obtained
 */
const getAllElems = (): Promise<Pet[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const pets: Pet[] = await Pet.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        order: [['id', 'ASC']]
      });      
      resolve(pets);
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string'
        ? error 
        : 'An error occurred - error: unknow';
      reject(new Error(errorMessage));
    }     
  });
};

/**
 * Function that gets a elem by id
 * @param id id value
 * @returns {Promise<Pet | null>} db element obtained by its id
 */
const findElemById = (id: number): Promise<Pet | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet: Pet | null = await Pet.findByPk(id, {
        attributes: { exclude: ['updatedAt', 'createdAt'] }
      });
      resolve(pet);
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string'
        ? error 
        : 'An error occurred - error: unknow';
      reject(new Error(errorMessage));
    } 
  });
};

/**
 * Function that obtains results based on a query
 * @param querie querie object
 * @returns {Promise<Pet[]>} obtained db elements
 */
const findElemsByQuerie = (querie: Object): Promise<Pet[]> => {   
  return new Promise(async (resolve, reject) => {
    try {
      const elements: Pet[] = await Pet.findAll(querie);
      resolve(elements);
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string'
        ? error 
        : 'An error occurred - error: unknow';
      reject(new Error(errorMessage));
    }      
  });
}

/**
 * Function that obtains only one result based on a query
 * @param querie querie object
 * @returns {Promise<Pet | null>} obtained db elements
 */
const findOneByQuerie = (querie: Object): Promise<Pet | null> => {   
  return new Promise(async (resolve, reject) => {
    try {
      const elements: Pet | null = await Pet.findOne(querie);
      resolve(elements);
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string'
        ? error 
        : 'An error occurred - error: unknow';
      reject(new Error(errorMessage));
    }       
  });
}


/**
 * Function that saves an element in db
 * @param data element data to insert
 * @returns {Promise<Pet>} result of inserted element
 */
const insertData = (data: IPet): Promise<Pet> => {
    return new Promise(async (resolve, reject) => {
      try {
        const newPet: Pet = Pet.build({...data});
        const savedStatus = await newPet.save();
        resolve(savedStatus)
      } catch (error: unknown) {
        const errorMessage = typeof error === 'string'
          ? error 
          : 'An error occurred - error: unknow';
        reject(new Error(errorMessage));
      } 
    });
  }

export = {
  getAllElems,
  findElemById,
  findElemsByQuerie,
  insertData,
  findOneByQuerie
};
