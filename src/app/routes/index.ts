// src/routes/index.ts
import { Router } from "express";
import { userRoutes } from "../modules/users/user.route";

const routers = Router();

interface ModuleRoute {
  path: string;
  route: Router;
}

// Centralized route registry
const moduleRoutes: ModuleRoute[] = [
  { path: "/users", route: userRoutes },
  // { path: "/products", route: productRoutes },
  // { path: "/orders", route: orderRoutes },
];

moduleRoutes.forEach(({ path, route }) => routers.use(path, route));

export default routers;
