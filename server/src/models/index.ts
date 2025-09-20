import sequelize from "../config/database";
import { ChecklistItem, initChecklistItemModel } from "./checklist-item.model";
import {
  ChecklistProgress,
  initChecklistProgressModel,
} from "./checklist-progress.model";
import {
  CateringRequest,
  initCateringRequestModel,
} from "./catering-request.model";
import { initInventoryItemModel, InventoryItem } from "./inventory-item.model";
import { initInspectionModel, Inspection } from "./inspection.model";
import { initLocationModel, Location } from "./location.model";
import { initMenuItemModel, MenuItem } from "./menu-item.model";
import { initOrderItemModel, OrderItem } from "./order-item.model";
import { initOrderModel, Order } from "./order.model";
import { initTrainingModuleModel, TrainingModule } from "./training-module.model";
import {
  initTrainingProgressModel,
  TrainingProgress,
} from "./training-progress.model";
import { initUserModel, User } from "./user.model";

let initialized = false;

export const initModels = async (): Promise<void> => {
  if (!initialized) {
    initLocationModel();
    initUserModel();
    initMenuItemModel();
    initOrderModel();
    initOrderItemModel();
    initInventoryItemModel();
    initTrainingModuleModel();
    initTrainingProgressModel();
    initChecklistItemModel();
    initChecklistProgressModel();
    initInspectionModel();
    initCateringRequestModel();

    Location.hasMany(User, {
      foreignKey: "locationId",
      as: "users",
    });
    User.belongsTo(Location, {
      foreignKey: "locationId",
      as: "location",
    });

    Location.hasMany(Order, {
      foreignKey: "locationId",
      as: "orders",
    });
    Order.belongsTo(Location, {
      foreignKey: "locationId",
      as: "location",
    });

    Order.hasMany(OrderItem, {
      foreignKey: "orderId",
      as: "items",
    });
    OrderItem.belongsTo(Order, {
      foreignKey: "orderId",
      as: "order",
    });

    MenuItem.hasMany(OrderItem, {
      foreignKey: "menuItemId",
      as: "orderItems",
    });
    OrderItem.belongsTo(MenuItem, {
      foreignKey: "menuItemId",
      as: "menuItem",
    });

    Location.hasMany(InventoryItem, {
      foreignKey: "locationId",
      as: "inventoryItems",
    });
    InventoryItem.belongsTo(Location, {
      foreignKey: "locationId",
      as: "location",
    });

    TrainingModule.hasMany(TrainingProgress, {
      foreignKey: "moduleId",
      as: "progressRecords",
    });
    TrainingProgress.belongsTo(TrainingModule, {
      foreignKey: "moduleId",
      as: "module",
    });

    User.hasMany(TrainingProgress, {
      foreignKey: "userId",
      as: "trainingProgress",
    });
    TrainingProgress.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    ChecklistItem.hasMany(ChecklistProgress, {
      foreignKey: "checklistItemId",
      as: "progressRecords",
    });
    ChecklistProgress.belongsTo(ChecklistItem, {
      foreignKey: "checklistItemId",
      as: "checklistItem",
    });

    User.hasMany(ChecklistProgress, {
      foreignKey: "userId",
      as: "checklistProgress",
    });
    ChecklistProgress.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    Location.hasMany(Inspection, {
      foreignKey: "locationId",
      as: "inspections",
    });
    Inspection.belongsTo(Location, {
      foreignKey: "locationId",
      as: "location",
    });

    Location.hasMany(CateringRequest, {
      foreignKey: "locationId",
      as: "cateringRequests",
    });
    CateringRequest.belongsTo(Location, {
      foreignKey: "locationId",
      as: "location",
    });

    initialized = true;
  }

  await sequelize.authenticate();
};

export {
  sequelize,
  ChecklistItem,
  ChecklistProgress,
  CateringRequest,
  InventoryItem,
  Inspection,
  Location,
  MenuItem,
  Order,
  OrderItem,
  TrainingModule,
  TrainingProgress,
  User,
};
