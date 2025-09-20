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

export class UserLog extends Model<InferAttributes<UserLog>, InferCreationAttributes<UserLog>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]> | null;
  declare category: string;
  declare action: string;
  declare responseCode: number;
  declare responseSnippet: string | null;
  declare errorMessage: string | null;
  declare responseTimeMs: number | null;
  declare metadata: Record<string, unknown> | null;
  declare enabled: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserLogModel = () => {
  UserLog.init(
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responseCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 200,
      },
      responseSnippet: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      errorMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      responseTimeMs: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
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
      tableName: "user_logs",
      underscored: true,
    }
  );
};
