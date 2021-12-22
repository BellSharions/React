import { faPlaystation, faXbox, faWindows } from "@fortawesome/free-brands-svg-icons";

export const PRODUCTS = "/products";
export const ABOUT = "/about";
export const HOME = "/home";
export const SIGNIN = "/sign-in";
export const SIGNUP = "/sign-up";
export const ERROR = "/error";
export const PROFILE = "/profile";
export const enum routeType {
  link,
  dropdown,
}
export type singleLink = { type: routeType; item: { route: string; name: string } };
export type multiLink = { type: routeType; item: { name: string; data: Array<{ routeName: string; route: string }> } };
export const gameCategories = [
  {
    title: "PC",
    icon: faWindows,
    path: "/products/PC",
  },
  {
    title: "PlayStation",
    icon: faPlaystation,
    path: "/products/PlayStation",
  },
  {
    title: "XBOX",
    icon: faXbox,
    path: "/products/XBOX",
  },
];
export const gameCompaniesIcons = [
  {
    title: "EA",
    icon: "https://res.cloudinary.com/dev3afzlt/image/upload/v1637339130/EA_ceinen.png",
    href: "https://www.ea.com",
  },
  {
    title: "Activision",
    icon: "https://res.cloudinary.com/dev3afzlt/image/upload/v1637340397/blizzard-icon-29_biiq2q.png",
    href: "https://www.activision.com/",
  },
  {
    title: "Nintendo",
    icon: "https://res.cloudinary.com/dev3afzlt/image/upload/v1637339132/Nintendo_hguy1u.png",
    href: "https://www.nintendo.com/",
  },
];

const platformNames = {
  name: "Products",
  data: [
    { routeName: "PC", route: `${PRODUCTS}/PC` },
    { routeName: "XBOX", route: `${PRODUCTS}/XBOX` },
    { routeName: "PlayStation", route: `${PRODUCTS}/PlayStation` },
  ],
};

export const routes: Array<singleLink | multiLink> = [
  {
    type: routeType.link,
    item: { route: HOME, name: "Home" },
  },
  {
    type: routeType.dropdown,
    item: platformNames,
  },
  {
    type: routeType.link,
    item: { route: ABOUT, name: "About" },
  },
];

export const fetchGameLink = "http://localhost:8079/games";
export const fetchNewProductsLink = "http://localhost:8079/api/getTopProducts";
export const fetchGameQueryLink = "http://localhost:8079/api/search/";
export const signInUrl = "http://localhost:8079/api/auth/signIn/";
export const signUpUrl = "http://localhost:8079/api/auth/signUp/";

export const mockGameList = [
  {
    id: 1,
    title: "Ultrakill",
    developer: "Arsi Patala",
    description:
      "ULTRAKILL is a fast-paced ultraviolent old school FPS that fuses together classic shooters like Quake, modern shooters like Doom (2016) and character action games like Devil May Cry.",
    timestamp: 1638379038,
    date: "01.09.2020",
    category: "PC",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370435/NBPosters_Ultrakill-NoBorder_2021_nsneoa.png",
  },
  {
    id: 2,
    title: "OverWatch",
    developer: "Blizzard Entertainment",
    timestamp: 1638379038,
    date: "03.04.2016",
    category: "PC, XBOX, PlayStation",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370431/81ifhSOpkTL_qjzmux.jpg",
  },
  {
    id: 3,
    title: "Halo Infinite",
    developer: "343 Industries",
    timestamp: 1638379038,
    date: "15.11.2021",
    category: "PC",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370431/911GAl_yrGL_jm7sxk.jpg",
  },
  {
    id: 4,
    title: "Batllefield 1",
    developer: "DICE",
    timestamp: 1638379038,
    date: "21.10.2016",
    category: "PC, XBOX, PlayStation",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370435/battlefield-1-pc-game-origin-cover_mcrkpl.jpg",
  },
  {
    id: 5,
    title: "Genshin Impact",
    developer: "miHoYo",
    timestamp: 1638379038,
    date: "28.09.2020",
    category: "PC, PlayStation",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370432/genshin-impact-pc-game-epic-games-cover_rvbidw.webp",
  },
  {
    id: 6,
    title: "Minecraft",
    developer: "Mojang",
    timestamp: 1638379038,
    date: "18.11.2011",
    category: "PC",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370431/minecraft-java-edition-pc-game-cover_g2roeu.webp",
  },
  {
    id: 7,
    title: "Until Dawn",
    developer: "Supermassive Games",
    timestamp: 1638379038,
    date: "20.09.2015",
    category: "PlayStation",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370431/MV5BOTVlYWVmOTYtNGI3OS00YWUyLTlkZDItMDA4ZWZiNjVmZmZmXkEyXkFqcGdeQXVyMjM5NzU3OTM_._V1_FMjpg_UX1000__z2jwbt.jpg",
  },
  {
    id: 8,
    title: "Enter the gungeon",
    developer: "Dodge Roll",
    timestamp: 1638379038,
    date: "05.04.2016",
    category: "PC",
    logo: "https://res.cloudinary.com/dev3afzlt/image/upload/v1638370431/game-steam-enter-the-gungeon-cover_khtkc3.jpg",
  },
];
export const users = [
  {
    userName: "YuryChertko",
    password: "12345678a",
  },
];
