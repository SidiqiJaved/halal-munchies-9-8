import { Request, Response } from "express";
import { Location } from "../models/location.model";
import { AppError } from "../utils/AppError";

export const listLocations = async (_req: Request, res: Response): Promise<void> => {
  const locations = await Location.findAll({
    order: [["name", "ASC"]],
  });

  res.json({ locations });
};

export const getLocation = async (req: Request, res: Response): Promise<void> => {
  const location = await Location.findByPk(req.params.id);

  if (!location) {
    throw new AppError("Location not found", 404);
  }

  res.json({ location });
};

export const createLocation = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    code,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phone,
    email,
    timezone,
    hours,
    isCorporate,
  } = req.body;

  if (!name || !addressLine1 || !city || !state || !postalCode) {
    throw new AppError("Missing required location fields", 400);
  }

  const location = await Location.create({
    name,
    code: code || null,
    addressLine1,
    addressLine2: addressLine2 || null,
    city,
    state,
    postalCode,
    country: country || "USA",
    phone: phone || null,
    email: email || null,
    timezone: timezone || null,
    hours: hours || null,
    isCorporate: isCorporate ?? false,
  });

  res.status(201).json({ location });
};

export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  const location = await Location.findByPk(req.params.id);

  if (!location) {
    throw new AppError("Location not found", 404);
  }

  const {
    name,
    code,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phone,
    email,
    timezone,
    hours,
    isCorporate,
  } = req.body;

  location.name = name ?? location.name;
  location.code = code ?? location.code;
  location.addressLine1 = addressLine1 ?? location.addressLine1;
  location.addressLine2 = addressLine2 ?? location.addressLine2;
  location.city = city ?? location.city;
  location.state = state ?? location.state;
  location.postalCode = postalCode ?? location.postalCode;
  location.country = country ?? location.country;
  location.phone = phone ?? location.phone;
  location.email = email ?? location.email;
  location.timezone = timezone ?? location.timezone;
  location.hours = hours ?? location.hours;
  location.isCorporate = isCorporate ?? location.isCorporate;

  await location.save();

  res.json({ location });
};

export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  const location = await Location.findByPk(req.params.id);
  if (!location) {
    throw new AppError("Location not found", 404);
  }
  await location.destroy();
  res.status(204).send();
};
