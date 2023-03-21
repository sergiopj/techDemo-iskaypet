'use strict';
import { IPet, Pet } from '../database/models/pet.model';
import { Sequelize } from 'sequelize';
import DbQueries from './DbQueries';
import { ArithmeticCalcs } from './ArithmeticCalcs';

/**
 * Function to get all pets
 * @returns {Promise<Pet[]>}
 */
const getAllPetsService = async (): Promise<Pet[]> => {
  try {    
    const pets: Pet[] = await DbQueries.getAllElems();
    return pets.length > 0 
      ? pets 
      : [];
  } catch (error: unknown) {
    const message: string = error instanceof Error 
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Failed to get all pets - error: ${message}`);
  }
};

/**
 * Function to get a pet by id
 * @param id - pet id
 * @returns {Promise<Pet | null>}
 */
const getPetByIdService = async (id: number): Promise<Pet | null> => {
  try {
    const pet: Pet | null = await DbQueries.findElemById(id);
    return pet
      ? pet.dataValues
      : {id: 0, name: '', species: '', gender: '', birthdate: ''};
  } catch (error: unknown) {
    const message: string = error instanceof Error
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error getting pet by id - error: ${message}`);
  }
};

/**
 * Function to obtain the most numerous species
 * @returns {Promise<Pet | null>}
 */
const getMostNumerousSpeciesService = async (): Promise<Pet | null> => {
  try {
    const querie = {
      attributes: ['species', [Sequelize.fn('COUNT', Sequelize.col('species')), 'count']],
      group: ['species'],
      order: [[Sequelize.literal('count'), 'DESC']],
    }
    const pet: Pet | null = await DbQueries.findOneByQuerie(querie);
    return pet;
  } catch (error: unknown) {
    const message: string = error instanceof Error
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error getting most numerous species - error: ${message}`);
  }
};

/**
 * Function to obtain the average age among all pets
 * @returns {Promise<number>}
 */
const getSpeciesAverageAgeService = async (species: string): Promise<number> => {
  try {
    const querie: object = {
      where: {
        species
      }
    };
    const pets: Pet[] = await DbQueries.findElemsByQuerie(querie); 
    const averageAge: number = parseFloat(ArithmeticCalcs.calculateAverageAge(pets).toFixed(2));   
    return averageAge;      
  } catch (error: unknown) {
    const message: string = error instanceof Error
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error getting species average age - error: ${message}`);
  }
};

/**
 * Function to obtain the standar deviation among all pets
 * @returns {Promise<number>}
 */
const getSpeciesStandarDeviationService = async (species: string): Promise<number> => {
  try {
    const querie: object = {
      where: {
        species
      }
    };
    const pets: Pet[] = await DbQueries.findElemsByQuerie(querie);
    const standarDeviation: number = ArithmeticCalcs.calculateStandarDeviation(pets);    
    return standarDeviation;  
  } catch (error: unknown) {
    const message: string = error instanceof Error
        ? error.message 
        : 'Unknown Error';
    throw new Error(`Error getting species standar deviation - error: ${message}`);
  }
};

/**
 * Function to add a pet
 * @param data - Pet data to add
 * @returns {Promise<Pet>}
 */
const addNewPetService = async (data: IPet): Promise<Pet> => {
  try {
    const { species, gender } = data;
    data.species = species?.toLocaleLowerCase();
    data.gender = gender?.toLocaleLowerCase();
    const result: Pet = await DbQueries.insertData(data);
    delete result?.dataValues?.updatedAt;
    delete result?.dataValues?.createdAt;
    return result;
  } catch (error) {
    const message: string = error instanceof Error 
      ? error.message
      : 'Unknown Error';   
    throw new Error(`Error adding new pet- error: ${message}`);
  }
};

export {
  getAllPetsService,
  getPetByIdService,
  getMostNumerousSpeciesService,
  getSpeciesAverageAgeService,
  getSpeciesStandarDeviationService,
  addNewPetService,
};
