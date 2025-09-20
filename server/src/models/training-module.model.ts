import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database";

export type TrainingType = "video" | "checklist" | "quiz" | "document";
export type TrainingDifficulty = "beginner" | "intermediate" | "advanced";

export class TrainingModule extends Model<
  InferAttributes<TrainingModule>,
  InferCreationAttributes<TrainingModule>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare durationMinutes: number;
  declare type: TrainingType;
  declare category: string;
  declare isRequired: CreationOptional<boolean>;
  declare difficulty: TrainingDifficulty;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initTrainingModuleModel = () => {
  TrainingModule.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      durationMinutes: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("video", "checklist", "quiz", "document"),
        allowNull: false,
        defaultValue: "video",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      difficulty: {
        type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
        allowNull: false,
        defaultValue: "beginner",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "training_modules",
      underscored: true,
    }
  );
};
