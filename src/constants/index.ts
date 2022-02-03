import { CompanyIcon, multiLink, Platform, singleLink } from "@/types";
import { faPlaystation, faXbox, faWindows } from "@fortawesome/free-brands-svg-icons";

export const enum RoutesMap {
  PRODUCTS = "/products",
  ABOUT = "/about",
  HOME = "/home",
  SIGNIN = "/sign-in",
  SIGNUP = "/sign-up",
  ERROR = "/error",
  PROFILE = "/profile",
  CART = "/cart",
}
export const enum RouteType {
  link,
  dropdown,
}
export const enum Roles {
  ADMIN = "admin",
  USER = "user",
}
export const enum CallType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
export const enum ModalTypes {
  EDITGAME = "EDIT_GAME",
  ADDGAME = "ADD_GAME",
  SIGNUP = "SIGN_UP",
  SIGNIN = "SIGN_IN",
  BUYGAMES = "BUY_GAMES",
  DELETEGAME = "DELETE_GAME",
  PASSCHANGE = "PASS_CHANGE",
}
export const loginKey = "login";
export const roleKey = "role";
export const ageOptions = ["all ages", "3", "12", "16", "18"];
export const availableAges = ["3", "12", "16", "18"];
export const genreOptions = [
  "all genres",
  "sandbox",
  "action-adventure",
  "first-person shooter",
  "rogue-like",
  "roleplay",
];
export const availableGenres = ["sandbox", "action-adventure", "first-person shooter", "rogue-like", "roleplay"];
export const gameCategories: Platform[] = [
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
export const gameCompaniesIcons: CompanyIcon[] = [
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

export const platformNames = {
  name: "Products",
  data: [
    { routeName: "PC", route: `${RoutesMap.PRODUCTS}/PC` },
    { routeName: "XBOX", route: `${RoutesMap.PRODUCTS}/XBOX` },
    { routeName: "PlayStation", route: `${RoutesMap.PRODUCTS}/PlayStation` },
  ],
};

export const routes: Array<singleLink | multiLink> = [
  {
    type: RouteType.link,
    item: { route: RoutesMap.HOME, name: "Home", icon: "fa fa-home" },
  },
  {
    type: RouteType.dropdown,
    item: platformNames,
  },
  {
    type: RouteType.link,
    item: { route: RoutesMap.ABOUT, name: "About", icon: "fa fa-info-circle" },
  },
];

export const fetchGameQueryLink = "http://localhost:8080/api/search?";
export const signInUrl = "http://localhost:8079/api/auth/signIn/";
export const signUpUrl = "http://localhost:8079/api/auth/signUp/";
export const userCartUrl = "http://localhost:8080/api/user/cart/";
export const passwdChangeUrl = "http://localhost:8080/user/passwordChange/";
export const buyUrl = "http://localhost:8080/api/buy/";
export const productUrl = "http://localhost:8080/api/product/";
export const userGetUrl = "http://localhost:8080/user/?login=";
export const cloudinaryUpload = "https://api.cloudinary.com/v1_1/dev3afzlt/image/upload";
export const userUpload = "http://localhost:8080/upload/";
export const userUrl = "http://localhost:8080/user/";

export const debounceDelay = 300;
export const minSymbols = 3;
export const maxSymbols = 12;
