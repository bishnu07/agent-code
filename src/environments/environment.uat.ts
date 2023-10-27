import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: true,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  soltixURL: "https://uat.solitx.io:",
  mffURL: "https://uat.mobilefirstfinance.com",
  rootUser: "TEST",
  redirect: "https://client.mobilefirstfinance.com",
};
