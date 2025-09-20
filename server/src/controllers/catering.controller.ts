import { Request, Response } from "express";
import { CateringRequest } from "../models/catering-request.model";
import { Location } from "../models/location.model";
import { AppError } from "../utils/AppError";

export const createCateringRequest = async (req: Request, res: Response): Promise<void> => {
  const { customerName, email, phone, eventDate, eventType, guestCount, packageName, notes, locationId } = req.body;

  if (!customerName || !email || !phone || !eventDate || !eventType || !guestCount) {
    throw new AppError("Missing required catering request fields", 400);
  }

  const requestRecord = await CateringRequest.create({
    customerName,
    email,
    phone,
    eventDate,
    eventType,
    guestCount,
    packageName: packageName || null,
    notes: notes || null,
    locationId: locationId || null,
    status: "new",
  });

  res.status(201).json({ request: requestRecord });
};

export const listCateringRequests = async (req: Request, res: Response): Promise<void> => {
  const { status, locationId } = req.query;

  const where: Record<string, unknown> = {};

  if (status && typeof status === "string") {
    where.status = status;
  }

  if (locationId && typeof locationId === "string") {
    where.locationId = Number(locationId);
  }

  const requests = await CateringRequest.findAll({
    where,
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
    order: [["eventDate", "ASC"]],
  });

  res.json({ requests });
};

export const getCateringRequest = async (req: Request, res: Response): Promise<void> => {
  const request = await CateringRequest.findByPk(req.params.id, {
    include: [
      {
        model: Location,
        as: "location",
        attributes: ["id", "name", "city", "state"],
      },
    ],
  });

  if (!request) {
    throw new AppError("Catering request not found", 404);
  }

  res.json({ request });
};

export const updateCateringRequest = async (req: Request, res: Response): Promise<void> => {
  const request = await CateringRequest.findByPk(req.params.id);

  if (!request) {
    throw new AppError("Catering request not found", 404);
  }

  const { status, notes, locationId, packageName, eventDate, guestCount } = req.body;

  request.status = status ?? request.status;
  request.notes = notes ?? request.notes;
  request.locationId = locationId ?? request.locationId;
  request.packageName = packageName ?? request.packageName;
  request.eventDate = eventDate ?? request.eventDate;
  request.guestCount = guestCount ?? request.guestCount;

  await request.save();

  res.json({ request });
};

export const deleteCateringRequest = async (req: Request, res: Response): Promise<void> => {
  const request = await CateringRequest.findByPk(req.params.id);
  if (!request) {
    throw new AppError("Catering request not found", 404);
  }
  await request.destroy();
  res.status(204).send();
};
