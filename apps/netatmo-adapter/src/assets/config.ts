import { ModuleOptions } from "simple-oauth2";

export const netatmoLogin = {
  password: "Sovkix-jyczu4-hajwiw",
  username: "nadine.frankenberg@in.tum.de",
};

export const netatmoCredentials: ModuleOptions = {
  client: {
    id: "5e04c870217abd71d71440cd",
    secret: "1Nn4OkOZKM6h62Rk5UWw6ZuVv7Mi8jr",
  },
  auth: {
    tokenHost: "https://api.netatmo.com",
    tokenPath: "/oauth2/token",
    authorizeHost: "https://api.netatmo.com",
    authorizePath: "/oauth2/authorize",
  },
};

export const netatmoIndoorDeviceId = "70:ee:50:01:cb:98";
export const netatmoUrl = "https://api.netatmo.com";

export const triggerInterval = "*/4 * * * * *";
export const dropSchemaAtEveryStart = true;
