import sequelize from "../config/database";
import { hashPassword } from "./auth.service";
import { CateringRequest } from "../models/catering-request.model";
import { ChecklistItem } from "../models/checklist-item.model";
import { ChecklistProgress } from "../models/checklist-progress.model";
import { InventoryItem } from "../models/inventory-item.model";
import { Inspection } from "../models/inspection.model";
import { Location } from "../models/location.model";
import { MenuItem } from "../models/menu-item.model";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/order-item.model";
import { TrainingModule } from "../models/training-module.model";
import { TrainingProgress } from "../models/training-progress.model";
import { User } from "../models/user.model";

const trainingModulesSeed = [
  {
    title: "Welcome to Halal Munchies",
    description: "Introduction to our company values, mission, and halal standards",
    durationMinutes: 15,
    type: "video",
    category: "onboarding",
    isRequired: true,
    difficulty: "beginner",
  },
  {
    title: "Food Safety Fundamentals",
    description: "Essential food safety practices for halal food preparation",
    durationMinutes: 30,
    type: "video",
    category: "food-safety",
    isRequired: true,
    difficulty: "beginner",
  },
  {
    title: "Halal Certification Requirements",
    description: "Understanding halal standards and compliance procedures",
    durationMinutes: 20,
    type: "video",
    category: "food-safety",
    isRequired: true,
    difficulty: "intermediate",
  },
  {
    title: "Customer Service Excellence",
    description: "Providing exceptional service to our diverse customer base",
    durationMinutes: 25,
    type: "video",
    category: "customer-service",
    isRequired: true,
    difficulty: "beginner",
  },
  {
    title: "POS System Training",
    description: "Complete guide to using our point-of-sale system",
    durationMinutes: 35,
    type: "video",
    category: "operations",
    isRequired: true,
    difficulty: "beginner",
  },
  {
    title: "Inventory Management Basics",
    description: "Stock tracking, ordering, and waste reduction strategies",
    durationMinutes: 40,
    type: "video",
    category: "operations",
    isRequired: true,
    difficulty: "intermediate",
  },
  {
    title: "Team Leadership Skills",
    description: "Managing staff, scheduling, and performance reviews",
    durationMinutes: 45,
    type: "video",
    category: "management",
    isRequired: false,
    difficulty: "advanced",
  },
  {
    title: "Food Safety Quiz",
    description: "Test your knowledge of food safety principles",
    durationMinutes: 10,
    type: "quiz",
    category: "food-safety",
    isRequired: true,
    difficulty: "intermediate",
  },
];

const checklistSeed = [
  "Complete uniform fitting and receive all required items",
  "Review employee handbook and policies",
  "Complete food safety certification",
  "Shadow experienced team member for 2 shifts",
  "Learn POS system basics",
  "Complete customer service training",
  "Learn halal food handling procedures",
  "Emergency procedures walkthrough",
].map((task, index) => ({
  task,
  category: "onboarding",
  isRequired: index !== 5,
  orderIndex: index,
}));

const menuSeed = [
  {
    name: "Halal Chicken Biryani Platter",
    description: "Aromatic basmati rice with tender halal chicken, served with raita and pickles",
    category: "platters",
    price: 35.99,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400",
    prepTimeMinutes: 45,
    servings: "10-12 people",
    rating: 4.8,
  },
  {
    name: "Mediterranean Mezze Platter",
    description: "Hummus, baba ganoush, tabbouleh, dolmas, and fresh vegetables with pita",
    category: "platters",
    price: 28.99,
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400",
    prepTimeMinutes: 30,
    servings: "8-10 people",
    rating: 4.6,
  },
  {
    name: "Halal Beef Kebab Platter",
    description: "Grilled halal beef kebabs with rice, grilled vegetables, and tzatziki",
    category: "platters",
    price: 42.99,
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
    prepTimeMinutes: 40,
    servings: "12-15 people",
    rating: 4.9,
  },
  {
    name: "Falafel & Hummus Bowl",
    description: "Crispy falafels with creamy hummus, fresh salad, and tahini sauce",
    category: "mains",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1595909315417-2d5216e3c9d0?w=400",
    prepTimeMinutes: 15,
    servings: "1 person",
    rating: 4.7,
  },
  {
    name: "Halal Chicken Shawarma",
    description: "Tender halal chicken shawarma in warm pita with garlic sauce and vegetables",
    category: "mains",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    prepTimeMinutes: 12,
    servings: "1 person",
    rating: 4.8,
  },
  {
    name: "Baklava Assortment",
    description: "Traditional honey-sweetened baklava with pistachios and almonds",
    category: "desserts",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1571197845891-8fefe0c29e05?w=400",
    prepTimeMinutes: 5,
    servings: "6-8 pieces",
    rating: 4.5,
  },
];

const inventorySeed = [
  {
    name: "Halal Chicken Breast",
    category: "meat",
    currentStock: 25,
    minStock: 50,
    maxStock: 200,
    unit: "lbs",
    costPerUnit: 4.99,
    supplier: "Halal Meat Co.",
    lastRestocked: "2025-01-15",
    expiryDate: "2025-01-20",
  },
  {
    name: "Basmati Rice",
    category: "grains",
    currentStock: 80,
    minStock: 30,
    maxStock: 150,
    unit: "lbs",
    costPerUnit: 2.49,
    supplier: "Premium Grains Ltd.",
    lastRestocked: "2025-01-10",
  },
  {
    name: "Olive Oil",
    category: "oils",
    currentStock: 12,
    minStock: 20,
    maxStock: 50,
    unit: "bottles",
    costPerUnit: 8.99,
    supplier: "Mediterranean Imports",
    lastRestocked: "2025-01-08",
  },
  {
    name: "Fresh Tomatoes",
    category: "vegetables",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "lbs",
    costPerUnit: 1.99,
    supplier: "Fresh Produce Inc.",
    lastRestocked: "2025-01-17",
    expiryDate: "2025-01-22",
  },
  {
    name: "Pita Bread",
    category: "bakery",
    currentStock: 5,
    minStock: 15,
    maxStock: 60,
    unit: "packs",
    costPerUnit: 2.99,
    supplier: "Mediterranean Bakery",
    lastRestocked: "2025-01-16",
    expiryDate: "2025-01-21",
  },
  {
    name: "Tahini Sauce",
    category: "condiments",
    currentStock: 18,
    minStock: 10,
    maxStock: 40,
    unit: "jars",
    costPerUnit: 5.49,
    supplier: "Middle East Foods",
    lastRestocked: "2025-01-12",
  },
];

const inspectionSeed = [
  {
    status: "scheduled",
    inspectorName: "City Health Dept",
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notes: "Routine quarterly inspection",
    actionItems: null,
    followUpAt: null,
  },
  {
    status: "completed",
    inspectorName: "Halal Certification Board",
    scheduledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    score: 97,
    passed: true,
    notes: "Excellent adherence to halal standards",
    actionItems: [
      { title: "Update supplier documentation", dueDate: "2025-02-01", status: "in_progress" },
    ],
    followUpAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    status: "follow_up",
    inspectorName: "City Health Dept",
    scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    score: null,
    passed: false,
    notes: "Verify corrective actions on refrigeration",
    actionItems: [
      { title: "Service walk-in fridge", dueDate: "2025-01-25", status: "open" },
    ],
    followUpAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
  },
];

export const seedDatabase = async (): Promise<void> => {
  await sequelize.sync({ force: true });

  const [hq, downtown, uptown] = await Location.bulkCreate(
    [
      {
        name: "Corporate HQ & Test Kitchen",
        code: "HQ",
        addressLine1: "125 Cedar Ave",
        addressLine2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "USA",
        phone: "(415) 555-0101",
        email: "hq@halalmunchies.com",
        timezone: "America/Los_Angeles",
        hours: {
          monday: "9:00 AM - 6:00 PM",
          tuesday: "9:00 AM - 6:00 PM",
          wednesday: "9:00 AM - 6:00 PM",
          thursday: "9:00 AM - 6:00 PM",
          friday: "9:00 AM - 6:00 PM",
          saturday: "Closed",
          sunday: "Closed",
        },
        isCorporate: true,
      },
      {
        name: "Downtown Flagship",
        code: "SF-DT",
        addressLine1: "455 Market Street",
        city: "San Francisco",
        state: "CA",
        postalCode: "94103",
        country: "USA",
        phone: "(415) 555-0120",
        email: "downtown@halalmunchies.com",
        timezone: "America/Los_Angeles",
        hours: {
          monday: "11:00 AM - 10:00 PM",
          tuesday: "11:00 AM - 10:00 PM",
          wednesday: "11:00 AM - 10:00 PM",
          thursday: "11:00 AM - 11:00 PM",
          friday: "11:00 AM - 11:00 PM",
          saturday: "10:00 AM - 11:00 PM",
          sunday: "10:00 AM - 9:00 PM",
        },
        isCorporate: false,
      },
      {
        name: "Uptown Franchise",
        code: "SF-UP",
        addressLine1: "890 Lombard Street",
        city: "San Francisco",
        state: "CA",
        postalCode: "94133",
        country: "USA",
        phone: "(415) 555-0188",
        email: "uptown@halalmunchies.com",
        timezone: "America/Los_Angeles",
        hours: {
          monday: "11:30 AM - 9:00 PM",
          tuesday: "11:30 AM - 9:00 PM",
          wednesday: "11:30 AM - 9:00 PM",
          thursday: "11:30 AM - 9:30 PM",
          friday: "11:30 AM - 10:30 PM",
          saturday: "10:30 AM - 10:30 PM",
          sunday: "10:30 AM - 8:30 PM",
        },
        isCorporate: false,
      },
    ],
    { returning: true }
  );

  const [adminPassword, managerPassword, employeePassword] = await Promise.all([
    hashPassword("admin123"),
    hashPassword("manager123"),
    hashPassword("employee123"),
  ]);

  const [adminUser, managerUser, employeeUser] = await User.bulkCreate(
    [
      {
        name: "Amira Siddiq",
        email: "amira@halalmunchies.com",
        passwordHash: adminPassword,
        role: "admin",
        phone: "(415) 555-1111",
        jobTitle: "Chief Operations Officer",
        locationId: hq.id,
      },
      {
        name: "Rashid Khan",
        email: "rashid@halalmunchies.com",
        passwordHash: managerPassword,
        role: "manager",
        phone: "(415) 555-2222",
        jobTitle: "Downtown General Manager",
        locationId: downtown.id,
      },
      {
        name: "Layla Ahmed",
        email: "layla@halalmunchies.com",
        passwordHash: employeePassword,
        role: "employee",
        phone: "(415) 555-3333",
        jobTitle: "Service Lead",
        locationId: downtown.id,
      },
    ],
    { returning: true }
  );

  await Promise.all([
    hq.update({ ownerId: adminUser.id }),
    downtown.update({ ownerId: adminUser.id }),
    uptown.update({ ownerId: adminUser.id }),
    adminUser.update({ ownerId: adminUser.id }),
    managerUser.update({ ownerId: adminUser.id }),
    employeeUser.update({ ownerId: managerUser.id }),
  ]);

  const menuItems = await MenuItem.bulkCreate(
    menuSeed.map((item) => ({
      ...item,
      ownerId: adminUser.id,
    })),
    { returning: true }
  );

  const sampleOrder = await Order.create({
    customerName: "Jamal Reynolds",
    email: "jamal@example.com",
    phone: "(415) 555-7878",
    addressLine1: "221 Pine Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94111",
    subtotal: 74.97,
    tax: Number((74.97 * 0.0825).toFixed(2)),
    total: Number((74.97 * 1.0825).toFixed(2)),
    status: "confirmed",
    specialInstructions: "Deliver to loading dock",
    locationId: downtown.id,
    ownerId: managerUser.id,
  });

  await OrderItem.bulkCreate([
    {
      orderId: sampleOrder.id,
      menuItemId: menuItems[0].id,
      nameSnapshot: menuItems[0].name,
      imageUrlSnapshot: menuItems[0].imageUrl,
      quantity: 1,
      unitPrice: menuItems[0].price,
      ownerId: managerUser.id,
    },
    {
      orderId: sampleOrder.id,
      menuItemId: menuItems[3].id,
      nameSnapshot: menuItems[3].name,
      imageUrlSnapshot: menuItems[3].imageUrl,
      quantity: 2,
      unitPrice: menuItems[3].price,
      ownerId: managerUser.id,
    },
  ]);

  await Promise.all(
    inventorySeed.map((item) =>
      InventoryItem.create({
        ...item,
        locationId: downtown.id,
        ownerId: managerUser.id,
      })
    )
  );

  const modules = await TrainingModule.bulkCreate(
    trainingModulesSeed.map((module) => ({
      ...module,
      ownerId: adminUser.id,
    })),
    { returning: true }
  );
  const checklistItems = await ChecklistItem.bulkCreate(
    checklistSeed.map((item) => ({
      ...item,
      ownerId: adminUser.id,
    })),
    { returning: true }
  );

  await TrainingProgress.bulkCreate([
    {
      userId: employeeUser.id,
      moduleId: modules[0].id,
      progressPercent: 100,
      isCompleted: true,
      completedAt: new Date(),
      ownerId: employeeUser.id,
    },
    {
      userId: employeeUser.id,
      moduleId: modules[1].id,
      progressPercent: 100,
      isCompleted: true,
      completedAt: new Date(),
      ownerId: employeeUser.id,
    },
    {
      userId: employeeUser.id,
      moduleId: modules[4].id,
      progressPercent: 100,
      isCompleted: true,
      completedAt: new Date(),
      ownerId: employeeUser.id,
    },
  ]);

  await ChecklistProgress.bulkCreate(
    checklistItems.slice(0, 2).map((item) => ({
      userId: employeeUser.id,
      checklistItemId: item.id,
      isCompleted: true,
      completedAt: new Date(),
      ownerId: employeeUser.id,
    }))
  );

  await Promise.all(
    inspectionSeed.map((seed, index) =>
      Inspection.create({
        ...seed,
        locationId: index === 0 ? downtown.id : uptown.id,
        ownerId: managerUser.id,
      })
    )
  );

  await CateringRequest.bulkCreate([
    {
      customerName: "Tech Hub Labs",
      email: "events@techhublabs.com",
      phone: "(415) 555-9898",
      eventDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      eventType: "Corporate Lunch",
      guestCount: 60,
      packageName: "Executive Mezze Package",
      notes: "Need separate station for gluten-free options",
      status: "reviewing",
      locationId: downtown.id,
      ownerId: managerUser.id,
    },
    {
      customerName: "Bay Area Muslim Association",
      email: "events@bama.org",
      phone: "(415) 555-1212",
      eventDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      eventType: "Community Fundraiser",
      guestCount: 120,
      packageName: "Family Feast",
      notes: "Requesting on-site chef demonstration",
      status: "new",
      locationId: uptown.id,
      ownerId: adminUser.id,
    },
  ]);

  console.log("Database seeded successfully");
};
