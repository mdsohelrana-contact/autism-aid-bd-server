// src/routes/index.ts
import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { addressRoutes } from "../modules/address/address.routes";
import { productRoutes } from "../modules/product/product.routes";

const routers = Router();

interface ModuleRoute {
  path: string;
  route: Router;
}

// Centralized route registry
const moduleRoutes: ModuleRoute[] = [
  { path: "/users", route: userRoutes },
  { path: "/", route: authRoutes },
  { path: "/address", route: addressRoutes },
  { path: "/products", route: productRoutes },
];

moduleRoutes.forEach(({ path, route }) => routers.use(path, route));

export default routers;
