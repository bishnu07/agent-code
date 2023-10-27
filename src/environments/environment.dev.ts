import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: true,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  soltixURL: "https://dev.solitx.io:",
  mffURL: "https://dev.mobilefirstfinance.com",
  rootUser: "DEV",
  redirect: "https://customer.mobilefirstfinance.com",
};
