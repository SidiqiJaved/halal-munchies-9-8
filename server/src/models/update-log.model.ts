import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";
import type { User } from "./user.model";

export class UpdateLog extends Model<InferAttributes<UpdateLog>, InferCreationAttributes<UpdateLog>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]> | null;
  declare modelName: string;
  declare recordId: number;
  declare fieldName: string;
  declare previousValue: string | null;
  declare newValue: string | null;
  declare enabled: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUpdateLogModel = () => {
  UpdateLog.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      modelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      fieldName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      previousValue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      newValue: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
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
      tableName: "update_logs",
      underscored: true,
    }
  );
};
