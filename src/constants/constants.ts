export const PRODUCTS = "/products";
export const ABOUT = "/about";
export const HOME = "/home";
export const SIGNIN = "/sign-in";
export const SIGNUP = "/sign-up";
export const enum routeType {
  link,
  dropdown,
}
export type singleLink = { type: routeType; item: { route: string; name: string } };
export type multiLink = { type: routeType; item: { name: string; data: Array<{ routeName: string; route: string }> } };
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
    { routeName: "PC", route: PRODUCTS },
    { routeName: "XBox", route: PRODUCTS },
    { routeName: "Playstation", route: PRODUCTS },
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
  {
    type: routeType.link,
    item: { route: SIGNIN, name: "Sign-in" },
  },
  {
    type: routeType.link,
    item: { route: SIGNUP, name: "Sign-up" },
  },
];
