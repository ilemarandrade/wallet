export const routesPublic = {
  INIT: "/auth",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
};
const routes = {
  ...routesPublic,
  DASHBOARD: "/dashboard",
  PAY: "/pay",
  RECHARGE: "/recharge",
  BALANCEINQUIRY: "/balance_inquiry",
  MOVEMENTS: "/movements",
};
export default routes;
