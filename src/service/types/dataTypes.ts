export type Etudiant = {
  inscriptionId: number;
  nom: string;
  matricule: string;
  droitInscription: number;
};

export type AuditActivityResponse = {
  audits: AuditActivity[];
  responseStatus: string;
};

export type AuditActivity = {
  auditId: number;
  inscriptionId: number;
  nom: string;
  matricule: string;
  oldDroit: number | null;
  newDroit: number | null;
  createdAt: Date;
  responsable: string;
  actionType: string;
};

export type ActivityDb = {
  type: string;
  total: number;
};

export type User = {
  username: string;
  role: string;
};

export type UserLogin = {
  userName: string;
  password: string;
};

export type AuthResponse = {
  userName: string;
  authorities: Authority[];
  jwtToken: string;
  responseStatus: string;
};

type Authority = {
  authority: string;
};

export type Registration = {
  nom: string;
  matricule: string;
  droitInscription: number;
};

export type RegistrationResponse = {
  inscription: Etudiant;
  responseStatus: string;
  responseMessage: string;
};
