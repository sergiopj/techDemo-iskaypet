'use strict';
import { Request, Response } from 'express';
import { Pet } from '../database/models/pet.model';
import { getAllPetsService, getPetByIdService, getMostNumerousSpeciesService, getSpeciesAverageAgeService, addNewPetService } from '../services/Pets';
import { Logger } from '../services/Logger';
const logger = Logger.getLogger('pets.controller');

/**
  * Return all pets
  * @param req 
  * @param res 
  * @returns {Pet[]}
*/
const getAllPets = async (req: Request, res: Response) => {
    try { 
      const data: Pet[] = await getAllPetsService(); 
      logger.info('::getAllPets | Start the process begins to obtaining all pets begins');
      data 
          ? res.status(200).send({data, count: data.length})
          : res.status(404).send({msg: 'All pets not found'});
    } catch (error: unknown) {  
      logger.error(`::getAllPets | Error trying to get all pets - error : ${error}`);   
      res.status(500).send({msg: 'Error trying to get all pets'});
    }
};
  
/**
 * Returns the data of a pet by its id
 * @param req 
 * @param res 
 * @returns {Pet}
 */
  
const getPetById = async (req: Request, res: Response) => {
    const { id } = req.params ;
    try {
      const data: Pet | null = await getPetByIdService(parseInt(id));
      logger.info(`::getPetById | Start the process begins to obtaining pet by id : ${id}`);
      data?.name 
          ? res.status(200).send(data)
          : res.status(404).send({msg: 'Pet not found'}); 
    } catch (error) {     
      logger.error(`::getPetById | Error getting pet by id - error : ${error}`);
      res.status(500).send({msg: `Error getting pet by id : ${id}`});
    }
};

/**
 * Returns the most numerous species
 * @param req 
 * @param res 
 * @returns {Json}
 */
  
const getMostNumerousSpecies = async (req: Request, res: Response) => {
  try {
    const species: Pet | null = await getMostNumerousSpeciesService();
    logger.info('::getMostNumerousSpecies | Start the process begins to obtain the most numerous species');
    species 
        ? res.status(200).send(species)
        : res.status(404).send({msg: 'Most numerous species not found'}); 
  } catch (error) {     
    logger.error(`::getMostNumerousSpecies | Error getting most numerous species - error : ${error}`);
    res.status(500).send({msg: 'Error getting most numerous species'});
  }
};

/**
 * Returns species avegare age
 * @param req 
 * @param res 
 * @returns {Json}
 */
  
const getSpeciesAverageAge = async (req: Request, res: Response) => {
  try {
    const { species_name } = req.query;
    const speciesAverage: number = await getSpeciesAverageAgeService(species_name);
    logger.info('::getSpeciesAverageAge | Start the process begins to obtain the species average age');
    speciesAverage 
        ? res.status(200).send({speciesAverage})
        : res.status(404).send({msg: 'Species average afe not found'}); 
  } catch (error) {     
    logger.error(`::getSpeciesAverageAge | Error getting species average age - error : ${error}`);
    res.status(500).send({msg: 'Error getting species average age'});
  }
};

/**
 * Add a new pet to the system
 * @param req 
 * @param res 
 * @returns {Pet}
 */
const addNewPet = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result: Pet = await addNewPetService(data);
    logger.info('::addNewPet | Start the process begins to insertion of a new pet');
    result 
      ? res.status(201).send(result)
      : res.status(404).send({msg: 'Could not add new pet'}); 
  } catch (error) {
    logger.error(`::addNewPet | Error adding new pet - error : ${error}`);
    res.status(500).send({msg: 'Error adding new pet'});
  }
};

export {
    getAllPets,
    getPetById,
    getMostNumerousSpecies,
    getSpeciesAverageAge,
    addNewPet
}