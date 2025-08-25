import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { CartService } from "./cart.service";
import { parseQueryParams } from "../../utils/builder/parseQueryParams";

const getCart = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  const query = parseQueryParams(req);

  const cart = await CartService.getCart(userId, query);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart retrieved successfully",
    data: cart.data,
  });
});

// AddToCart
const addToCart = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { productId, quantity } = req.body;

  const cartItem = await CartService.addItemToCart({
    userId,
    productId,
    quantity,
  });

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Item added to cart successfully",
    data: cartItem,
  });
});

// UpdateCartItem
const updateCartItem = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { productId, quantity } = req.body;

  const cartItem = await CartService.updateCartItem({
    userId,
    productId,
    quantity,
  });

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart item updated successfully",
    data: cartItem,
  });
});

// RemoveCartItem
const removeCartItem = catchAsync(async (req, res) => {
  const userId = req!.user!.id;
  const { productId } = req.body;

  await CartService.removeCartItem(userId, productId);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart item removed successfully",
  });
});

export const CartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
