import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";

export class MenuItem extends Model<
  InferAttributes<MenuItem>,
  InferCreationAttributes<MenuItem>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare category: string;
  declare price: number;
  declare imageUrl: string | null;
  declare isHalal: CreationOptional<boolean>;
  declare prepTimeMinutes: number | null;
  declare servings: string | null;
  declare rating: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initMenuItemModel = () => {
  MenuItem.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isHalal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      prepTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      servings: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "menu_items",
      underscored: true,
    }
  );
};
