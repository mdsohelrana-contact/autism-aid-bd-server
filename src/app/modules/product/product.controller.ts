import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { ProductService } from "./product.service";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";

// create product handler
const createProduct = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  const result = await ProductService.createProduct(userId, req.body);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// get all product handler
const getAllProducts = catchAsync(async (req, res) => {
  const query = parseQueryParams(req);

  const result = await ProductService.getAllProducts(query);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get single product handler
const getProductById = catchAsync(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

// Update product handler
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProduct(req.params.id, req.body);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete product handler
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(req.params.id);
  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
