import { ApiClient } from "./apiClient";

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const login = (email: string, password: string) =>
  ApiClient.post<AuthResponse>("/auth/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  ApiClient.post<AuthResponse>("/auth/register", { name, email, password });

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string | null;
  isHalal: boolean;
  prepTimeMinutes?: number | null;
  servings?: string | null;
  rating?: number | null;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const response = await ApiClient.get<{ items: Array<Record<string, unknown>> }>("/menu");
  return response.items.map((item) => ({
    id: Number(item.id),
    name: String(item.name),
    description: String(item.description),
    category: String(item.category),
    price: Number(item.price),
    imageUrl: (item as { imageUrl?: string | null }).imageUrl ?? null,
    isHalal: (item as { isHalal?: boolean }).isHalal ?? true,
    prepTimeMinutes: (item as { prepTimeMinutes?: number | null }).prepTimeMinutes ?? null,
    servings: (item as { servings?: string | null }).servings ?? null,
    rating: (item as { rating?: number | null }).rating ?? null,
  }));
};

interface CreateOrderItemInput {
  menuItemId: number;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  specialInstructions?: string;
  items: CreateOrderItemInput[];
  locationId?: number;
}

export interface OrderLineItem {
  id: number;
  menuItemId?: number | null;
  nameSnapshot: string;
  imageUrlSnapshot?: string | null;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  createdAt?: string;
  items?: OrderLineItem[];
}

export interface OrderResponse {
  order: OrderRecord;
}

export const createOrder = (payload: CreateOrderInput) =>
  ApiClient.post<OrderResponse>("/orders", payload);

export interface Location {
  id: number;
  name: string;
  code?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string | null;
  email?: string | null;
  timezone?: string | null;
  hours?: Record<string, string> | null;
  isCorporate: boolean;
}

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await ApiClient.get<{ locations: Location[] }>("/locations");
  return response.locations;
};

export interface CateringRequestInput {
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  packageName?: string;
  notes?: string;
  locationId?: number;
}

export const createCateringRequest = (payload: CateringRequestInput) =>
  ApiClient.post("/catering", payload);

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier?: string | null;
  lastRestocked?: string | null;
  expiryDate?: string | null;
  locationId?: number | null;
}

export interface InventoryResponse {
  items: InventoryItem[];
  summary: {
    totalValue: number;
    lowStockCount: number;
    expiringSoonCount: number;
  };
}

export const fetchInventory = (token: string) =>
  ApiClient.get<InventoryResponse>("/inventory", { token });

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  type: string;
  category: string;
  isRequired: boolean;
  difficulty: string;
  progressPercent: number;
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface TrainingSummary {
  completedCount: number;
  totalModules: number;
  progressPercent: number;
}

export const fetchTrainingModules = (token: string) =>
  ApiClient.get<{ modules: TrainingModule[]; summary: TrainingSummary }>("/training/modules", { token });

export const updateTrainingModule = (token: string, id: number, payload: { isCompleted?: boolean; progressPercent?: number }) =>
  ApiClient.patch(`/training/modules/${id}`, payload, { token });

export interface ChecklistItemResponse {
  id: number;
  task: string;
  category?: string | null;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: string | null;
}

export const fetchChecklist = (token: string) =>
  ApiClient.get<{ items: ChecklistItemResponse[]; summary: { completed: number; total: number } }>("/training/checklist", { token });

export const updateChecklistItem = (token: string, id: number, isCompleted: boolean) =>
  ApiClient.patch(`/training/checklist/${id}`, { isCompleted }, { token });

export interface InspectionRecord {
  id: number;
  locationId: number;
  scheduledAt: string;
  status: string;
  inspectorName: string;
  score?: number | null;
  passed: boolean;
  notes?: string | null;
  actionItems?: unknown;
  followUpAt?: string | null;
  location?: Location;
}

export interface InspectionResponse {
  inspections: InspectionRecord[];
  summary: {
    upcoming: number;
    completed: number;
    followUps: number;
  };
}

export const fetchInspections = (token: string) =>
  ApiClient.get<InspectionResponse>("/inspections", { token });

export const updateInspection = (token: string, id: number, payload: Record<string, unknown>) =>
  ApiClient.patch(`/inspections/${id}`, payload, { token });

export interface CateringAdminResponse {
  requests: Array<Record<string, unknown>>;
}

export const fetchCateringRequests = (token: string) =>
  ApiClient.get<CateringAdminResponse>("/catering", { token });
