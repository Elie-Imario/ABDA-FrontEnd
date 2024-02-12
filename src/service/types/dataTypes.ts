export type Etudiant = {
  inscrptionId: number,
  nom: string,
  matricule: string,
  droitInscription: number
}

export type AuditActivity = {
    audit_id: number,
    actionType: string,
    editedAt: Date,
    nom: string,
    matricule: string,
    oldDroitInscription: number | null,
    newDroitInscription: number | null,
    utilisateur: string
}

export type ActivityDb = {
  type: string,
  total: number 
}

export type User = {
  userId: number,
  username: string,
  role: string,
  password: string
}

export type UserLogin = {
  username: string,
  password: string
}