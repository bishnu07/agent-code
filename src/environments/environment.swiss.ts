import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: true,
  solitxCredential: {
    rootUser: "gofintech",
    userName: "gofintech",
    password: "NFQDyPdb$521",
  },
  soltixURL: "https://backoffice.solitx.io:",
  mffURL: "https://backoffice.mobilefirstfinance.com",
  rootUser: "gofintech",
  redirect: "https://profile.mobilefirstfinance.com",
};
