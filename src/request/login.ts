import { UserLogin } from "../service/types/dataTypes";
import { url } from "./index";

export const loginIntoAccount = (formData: UserLogin) => {
  console.log(formData);
  return fetch(`${url}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: formData.userName,
      password: formData.password,
    }),
  }).then((res) => res.json());
};
