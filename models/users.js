// models/Users.js
'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js'; // Certifique-se de ajustar o caminho conforme necessário

class Users extends Model {}

Users.init(
  {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      type: DataTypes.UUID,
    },
    apelido: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    stack: {
      type: DataTypes.JSON(DataTypes.STRING(32)),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    modelName: 'Users',
  }
);

export default Users;
