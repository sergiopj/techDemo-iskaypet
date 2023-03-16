'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/database.sqlite',
});

// presentation layer interface
export interface IPet {
  id?: number;
  name: string;
  species: string;
  gender: string;
  birthdate: string;
}

export interface IPetWithDataValues extends IPet {
  dataValues: IPet
}


// business layer class
export class Pet extends Model {
  public id!: number;
  public name!: string;
  public species!: string;
  public gender!: string;
  public birthdate!: Date;
}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female']]
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Pet',
  }
);


