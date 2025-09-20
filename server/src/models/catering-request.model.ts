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

export type CateringStatus = "new" | "reviewing" | "confirmed" | "completed" | "cancelled";

export class CateringRequest extends Model<
  InferAttributes<CateringRequest>,
  InferCreationAttributes<CateringRequest>
> {
  declare id: CreationOptional<number>;
  declare customerName: string;
  declare email: string;
  declare phone: string;
  declare eventDate: Date;
  declare eventType: string;
  declare guestCount: number;
  declare packageName: string | null;
  declare notes: string | null;
  declare status: CateringStatus;
  declare locationId: ForeignKey<Location["id"]> | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initCateringRequestModel = () => {
  CateringRequest.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guestCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      packageName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("new", "reviewing", "confirmed", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "new",
      },
      locationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "locations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "catering_requests",
      underscored: true,
    }
  );
};
