import { url } from "./index";

export const getAudits = async (token: string) => {
  return await fetch(`${url}/audit_inscriptions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getAuditDetailsActivity = async (token: string) => {
  return await fetch(`${url}/RevisionTypeDetails`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
