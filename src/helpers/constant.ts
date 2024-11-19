import { AboutListType, NavListType } from "./types/types";

const NAV_LIST: NavListType[] = [
  {
    id: 1,
    label: "Accueil",
    url: "Accueil",
  },
  {
    id: 2,
    label: "Livre",
    url: "Livre",
  },
  {
    id: 3,
    label: "Recommandation",
    url: "Recommandation",
  },
  {
    id: 4,
    label: "Assistance",
    url: "Assistance",
  },
];

const ABOUT_LIST: AboutListType[] = [
  {
    id: 1,
    title: "Diversifités de livres",
    description:
      "Découvrez une vaste collection de livres couvrant tous les genres et styles pour satisfaire tous les goûts, des classiques intemporels aux nouveautés captivantes.",
  },
  {
    id: 2,
    title: "Recommandations de livres",
    description:
      "Profitez d’un système intelligent qui vous suggère des livres adaptés à vos préférences pour une découverte enrichissante.",
  },
  {
    id: 3,
    title: "03  Scan de livres par IA",
    description:
      "Scannez la couverture d’un livre et obtenez les informations complètes sur le livre s’il est disponible dans notre base de données",
  },
];
export { NAV_LIST, ABOUT_LIST };
