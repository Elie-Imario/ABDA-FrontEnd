import { url } from "./index";

export const getAllInscriptions = (token: string) => {
  return fetch(`${url}/inscriptions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
