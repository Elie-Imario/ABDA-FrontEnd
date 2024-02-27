import { Registration } from "../service/types/dataTypes";
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

export const register = async (formData: Registration, token: string) => {
  return await fetch(`${url}/inscription`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nom: formData.nom,
      matricule: formData.matricule,
      droitInscription: formData.droitInscription,
    }),
  }).then((res) => res.json());
};

export const getRegistrationById = (id: number, token: string) => {
  return fetch(`${url}/inscriptions/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const deleteInscription = (id: number, token: string) => {
  return fetch(`${url}/inscriptions/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
