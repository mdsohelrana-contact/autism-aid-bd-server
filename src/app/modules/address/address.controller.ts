import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { AddressService } from "./address.service";
import qs from "qs"; // nested query parse করতে
import { QueryParams } from "../../utils/PrismaQueryBuilder";

// Create address handler
const createAddress = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  const result = await AddressService.createAddress(userId, req.body);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Address created successfully",
    data: result,
  });
});

// Get all address handler
const getAll = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  const parsedQuery = qs.parse(req.query as any);

  const query: QueryParams = {
    search: parsedQuery.search as string | undefined,
    filter: parsedQuery.filter as Record<string, any> | undefined,
    sortBy: parsedQuery.sortBy as string | undefined,
    sortOrder: parsedQuery.sortOrder === "desc" ? "desc" : "asc",
    page: parsedQuery.page ? Number(parsedQuery.page) : undefined,
    limit: parsedQuery.limit ? Number(parsedQuery.limit) : undefined,
    cursor: parsedQuery.cursor as string | undefined,
  };

  const result = await AddressService.getAllAddress(userId, query);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Address fetched successfully",
    data: result,
  });
});

// Update address handler
const update = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const addressId = req.params.id;
  const result = await AddressService.updateAddress(
    userId,
    addressId,
    req.body
  );
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Address updated successfully",
    data: result,
  });
});

// Delete address handler
const deleteAddress = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const addressId = req.params.id;
  const result = await AddressService.deleteAddress(userId, addressId);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Address deleted successfully",
  });
});

export const AddressController = {
  createAddress,
  getAll,
  update,
  deleteAddress,
};
