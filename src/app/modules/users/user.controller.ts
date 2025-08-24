import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { UserService } from "./users.service";
import { QueryParams } from "../../utils/builder/PrismaQueryBuilder";
import { Request, Response } from "express";
import qs from "qs";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";


// Create a user
const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const query = parseQueryParams(req);

  const result = await UserService.getAllUsers(query);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// Get a single user by ID
const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUser(req.params.id);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

// Update a user BY ID
const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

// Delete a user BY ID
const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
