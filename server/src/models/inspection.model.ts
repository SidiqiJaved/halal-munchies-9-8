import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";
import type { Location } from "./location.model";

export type InspectionStatus = "scheduled" | "completed" | "follow_up" | "in_progress";

export class Inspection extends Model<
  InferAttributes<Inspection>,
  InferCreationAttributes<Inspection>
> {
  declare id: CreationOptional<number>;
  declare locationId: ForeignKey<Location["id"]>;
  declare scheduledAt: Date;
  declare status: InspectionStatus;
  declare inspectorName: string;
  declare score: number | null;
  declare passed: CreationOptional<boolean>;
  declare notes: string | null;
  declare actionItems: Record<string, unknown>[] | null;
  declare followUpAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initInspectionModel = () => {
  Inspection.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "locations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      scheduledAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("scheduled", "completed", "follow_up", "in_progress"),
        allowNull: false,
        defaultValue: "scheduled",
      },
      inspectorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      passed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      actionItems: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      followUpAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "inspections",
      underscored: true,
    }
  );
};
