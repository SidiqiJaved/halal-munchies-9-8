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

export class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string | null;
  declare addressLine1: string;
  declare addressLine2: string | null;
  declare city: string;
  declare state: string;
  declare postalCode: string;
  declare country: string;
  declare phone: string | null;
  declare email: string | null;
  declare timezone: string | null;
  declare hours: Record<string, string> | null;
  declare ownerId: ForeignKey<User["id"]> | null;
  declare enabled: CreationOptional<boolean>;
  declare latitude: number | null;
  declare longitude: number | null;
  declare isCorporate: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initLocationModel = () => {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USA",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hours: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      ownerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      isCorporate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      tableName: "locations",
      underscored: true,
    }
  );
};
