
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion API rest Pets iskaypet",
    description: "REST API built on Node.js and TypeScript for exposing pet data for iskaypet",
    version: "1.0.0"   
  },  
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {    
    schemas: {
      Pet: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          species: {
            type: "string",
          },
          gender: {
            type: "string",
          },
          birthdate: {
            type: "string",
          }
        },
      },
    },
  },
  paths: {
    "/pets": {
      get: {
        summary: "Get all pets",
        description: "Returns all pets",
        responses: {
          "200": {
            description: "A list of all pets",            
          },
          "404": {
            description: "All pets Not Found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/pets/{id}": {
      get: {
        summary: "Get pet by id",
        description: "Returns a pet item by id",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of pet item to return",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Pet item by id returned successfully",          
          },
          "404": {
            description: "Pet item not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/pets/": {
      post: {
        summary: "Add new Pet",
        description: "Returns a new added pet",
        requestBody: {
          description: "New pet item to be added",
          required: true,
          content: {
            "application/json": {
              schema: {
                example: {
                  name: "Rufo",
                  species: "Dog",
                  gender: "Male",
                  birthdate: "2017-02-12"
                }
              },
            },
          },
        },
        responses: {
          "201": {
            description: "New pet item returned successfully",          
          },          
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/pets/species/most_numerous_species": {
      get: {
        summary: "Get most numerous species",
        description: "Returns a most numerous data object",                
        responses: {
          "200": {
            description: "Return most numerous especies object returned successfully",            
          },   
          "404": {
            description: "Most numerous species object not found",
          },       
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/pets/species/average_age": {
      get: {
        summary: "Get species average age",
        description: "Returns a species average age object",
        parameters: [
          {
            name: "species_name",
            in: "query",
            description: "The species name",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Return species average age object successfully",
          },
          "404": {
            description: "Species average age object not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    }    
  },
};

const options: OAS3Options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
