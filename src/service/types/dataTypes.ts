export type Etudiant = {
  inscriptionId: number;
  nom: string;
  matricule: string;
  droitInscription: number;
};

export type AuditActivity = {
  audit_id: number;
  actionType: string;
  editedAt: Date;
  nom: string;
  matricule: string;
  oldDroitInscription: number | null;
  newDroitInscription: number | null;
  utilisateur: string;
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
