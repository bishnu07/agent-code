import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: true,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  soltixURL: "https://lawfirm.solitx.io:",
  mffURL: "https://lawfirm.mobilefirstfinance.com",
  rootUser: "Lawyerfirm",
  redirect: "https://counterparty.mobilefirstfinance.com",
};
