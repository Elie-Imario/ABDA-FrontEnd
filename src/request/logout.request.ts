import { url } from "./index";

export const closeSession = () => {
  return fetch(`${url}/close_session`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
