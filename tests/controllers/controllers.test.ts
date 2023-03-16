'use strict';
import request from 'supertest';
import app from '../../src/app';
import { IPet } from '../../src/database/models/pet.model';
import { IParamsValidator } from '../../src/database/models/responses.model';
import { INSERT_PET_OBJECT, INSERT_PET_OBJECT_INCOMPLETE } from '../common/mocks/pet.mock';
import { expectValidatorPetsObject, expectValidatorResponses } from '../common/utils.test';

describe('Tests the responses of all controllers', () => {

  let petId: any;

  it('POST /pets add a new pet | 201 status code', async () => {
    const response = await request(app).post('/pets').send(INSERT_PET_OBJECT);
    expect(response.status).toBe(201);
    const addedPet: IPet = response.body;
    petId = response.body?.id;
    expectValidatorPetsObject(addedPet);
  });

  it('POST /pets could not add a new pet | 404 status code', async () => {
    const response = await request(app).post('/pets').send(INSERT_PET_OBJECT_INCOMPLETE);
    expect(response.status).toBe(400);
    const result: IParamsValidator[] = response.body?.errors;  
    expect(Array.isArray(result)).toBe(true);
    result.forEach(expectValidatorResponses);    
  });  

  it('GET /pets returned an array of objects of type pet | 200 status code', async () => {
    const response = await request(app).get('/pets');
    expect(response.status).toBe(200);
    const {data, count} = response.body;
    expect(Array.isArray(data)).toBe(true);
    expect(typeof count).toBe('number');
    data.forEach(expectValidatorPetsObject);   
  });

  it('GET /pets/:id could get a pet by id successfully | 200 status code', async () => {
    const petId = 1;
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.status).toBe(200);
    const result: IPet = response.body;  
    expectValidatorPetsObject(result);   
  });

  it('GET /pets/:id could not get a pet by id | 404 status code', async () => {
    const petId = 0;
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.status).toBe(404);
    const result: IParamsValidator = response.body;  
    expect(result).toHaveProperty('msg');
    expect(result.msg).toBe('Pet not found');    
  });

});

describe('Swagger api-docs verificación hmtl 200 status code', () => {
  it('GET /api-docs debe de retornar un html con la doc para probar los endpoints', async () => {
    const response = await request(app).get('/api-docs').redirects(1);
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text.includes('<title>Swagger UI</title>')).toBe(true);
  });
});