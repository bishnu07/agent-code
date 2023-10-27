import { commonEnv } from "./environment.common";

export const environment = {
  ...commonEnv,
  production: false,
  solitxCredential: { rootUser: "mff", userName: "mff", password: "mff" },
  // solitxCredential: {
  //   rootUser: "gofintech",
  //   userName: "gofintech",
  //   password: "NFQDyPdb$521",
  // },
  rootUser: "TEST",
  soltixURL: "https://dev.solitx.io:",
  mffURL: "http://localhost",
  redirect: "http://localhost",
  protocol:'http://'
};
