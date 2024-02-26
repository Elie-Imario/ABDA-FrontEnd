import Audit from "../../Pages/Audit";
import Inscription from "../../Pages/Inscription";

export const pageRoutes = [
  {
    path: "/inscriptions",
    name: "incscription.page",
    icon: "layer-group",
    component: Inscription,
    label: "Les Inscriptions",
    authoritiesLevel: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    path: "/audits",
    name: "audits.page",
    icon: "list-check",
    component: Audit,
    label: "Audits",
    authoritiesLevel: ["ROLE_ADMIN"],
  },
];
