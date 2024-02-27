import { url } from "./index";

export const getAudits = (token: string) => {
  return fetch(`${url}/audit_inscriptions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
