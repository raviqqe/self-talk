import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("documents", "./routes/documents.tsx"),
] satisfies RouteConfig;
