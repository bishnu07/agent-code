import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: true,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  rootUser: "TEST",
  soltixURL: "https://uat.solitx.io:",
  mffURL: "https://uat.mobilefirstfinance.com",
  redirect: "https://customer.mobilefirstfinance.com",
};
