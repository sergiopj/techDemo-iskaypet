'use strict';

export const INSERT_PET_OBJECT = {
  name: "rufo",
  species: "dog",
  gender: "male",
  birthdate: "2007-03-15"
};

export const INSERT_PET_OBJECT_INCOMPLETE = {
  species: "dog",
  gender: "male",
  birthdate: "2007-03-15"
};

export const PET_OBJECT = {
  id: 1,
  name: "rufo",
  species: "dog",
  gender: "male",
  birthdate: "2007-03-15"    
};

export const PET_OBJECT_DB = {
  dataValues: {
    id: 1,
    name: "rufo",
    species: "dog",
    gender: "male",
    birthdate: "2007-03-15"
  }  
};

export const PET_OBJECT_LIST = [
  {
    id: 1,
    name: "rufo",
    species: "dog",
    gender: "male",
    birthdate: "2007-03-15",
  },
  {
    id: 2,
    name: "lila",
    species: "dog",
    gender: "female",
    birthdate: "20019-03-15",
  },
  {
    id: 3,
    name: "mico",
    species: "pelican",
    gender: "male",
    birthdate: "2021-03-15",
  },
]; 

export const PET_OBJECT_DB_LIST = [
  {
    dataValues: {
      id: 1,
      name: "rufo",
      species: "dog",
      gender: "male",
      birthdate: "2007-03-15",
    },
  },
  {
    dataValues: {
      id: 2,
      name: "rogi",
      species: "dog",
      gender: "female",
      birthdate: "2020-03-15",
    },
  },
  {
    dataValues: {
      id: 3,
      name: "cati",
      species: "dog",
      gender: "male",
      birthdate: "2018-03-15",
    },
  },
]; 


export const MOST_NUM_SPECIES_OBJECT = {
  species: "dog",
  count: 1
};

export const AVERAGE_AGE_SPECIES_OBJECT = {
  "speciesAverage": 3.5,
  "standarDeviation": 1.5
}




