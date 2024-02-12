import { ActivityDb, AuditActivity, Etudiant, User } from "../types/dataTypes"

export const etudiants = [
{
    inscrptionId: 1,
    nom: 'Imarioa',
    matricule: '2169',
    droitInscription: 682500
},
{
    inscrptionId: 3,
    nom: 'JohnDoe',
    matricule: '2189-H',
    droitInscription: 682500
},
{
    inscrptionId: 5,
    nom: 'Celine',
    matricule: '0109-F',
    droitInscription: 682500
}
] as Etudiant[]


export const audits = [
    {
        audit_id: 1,
        actionType: 'Insertion',
        editedAt: new Date(),
        nom: 'Imarioa',
        matricule: '2169',
        oldDroitInscription: null,
        newDroitInscription: 682500,
        utilisateur: 'postgres'
    },
    {
        audit_id: 2,
        actionType: 'Suppression',
        editedAt: new Date(),
        nom: 'Eléanord',
        matricule: '2149',
        oldDroitInscription: 550000,
        newDroitInscription: null,
        utilisateur: 'mob'
    },
    {
        audit_id: 3,
        actionType: 'Insertion',
        editedAt: new Date(),
        nom: 'JohnDoe',
        matricule: '2189-H',
        oldDroitInscription: null,
        newDroitInscription: 682500,
        utilisateur: 'mob'
    },
    {
        audit_id: 4,
        actionType: 'Suppression',
        editedAt: new Date(),
        nom: 'Anya',
        matricule: '1150-F',
        oldDroitInscription: 682500,
        newDroitInscription: null,
        utilisateur: 'postgres'
    },
    {
        audit_id: 5,
        actionType: 'Insertion',
        editedAt: new Date(),
        nom: 'Celine',
        matricule: '0109-F',
        oldDroitInscription: null,
        newDroitInscription: 682500,
        utilisateur: 'mob'
    }
] as AuditActivity[]


export const activitiesDb = [
{
    type: "Insertion",
    total: 3    
},
{
    type: "Modification",
    total: 0    
},
{
    type: "Suppression",
    total: 4    
},
] as ActivityDb[]

export const users = [
    {
        userId: 1,
        username : 'postgres',
        role: 'Admin',
        password: '0000'
    },
    {
        userId: 2,
        username : 'mob',
        role: 'moderateur',
        password: '0000'
    },
] as User[]