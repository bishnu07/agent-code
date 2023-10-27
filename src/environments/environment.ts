// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.2ek

import { commonEnv } from "environments/environment.common";
export const environment = {
  ...commonEnv,
  // production: false,
  // solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  // soltixURL: "https://uat.solitx.io:",
  // mffURL: "http://localhost",
  // rootUser: "DEV",
  // redirect: "http://localhost",
  production: true,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },

  // soltixURL: "https://dev.solitx.io:",
  // mffURL: "https://dev.mobilefirstfinance.com",
  // rootUser: "DEV",
  // redirect: "https://customer.mobilefirstfinance.com",

  soltixURL: "https://lawfirm.solitx.io:",
  mffURL: "https://lawfirm.mobilefirstfinance.com",
  rootUser: "Lawyerfirm",
  redirect: "https://counterparty.mobilefirstfinance.com",
};
