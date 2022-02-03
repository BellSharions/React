import { RouteType } from "@/constants";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Route {
  routeName: string;
  route: string;
}

export interface Platform {
  title: string;
  icon: IconDefinition;
  path: string;
}

export interface CompanyIcon {
  title: string;
  icon: string;
  href: string;
}

export interface singleLink {
  type: RouteType;
  item: { route: string; name: string; icon: string };
}

export interface multiLink {
  type: RouteType;
  item: { name: string; data: Route[] };
}

export interface Game {
  title: string;
  category: string;
  price: number;
  imgUrl: string;
  logo: string;
  description?: string;
  genre: string;
  age: number;
  rating: number;
  id?: number;
  date?: string;
}
export interface BaseSearchCriteria {
  platform: string;
  age: string;
  sort: string;
  sortDir: string;
  genre: string;
  search?: string;
}
export interface ProductParams extends BaseSearchCriteria {
  search?: string;
}

export interface GameCart {
  title: string;
  category: string;
  price: number;
  check: boolean;
  amount: number;
}

export interface CartResponse {
  gamesList: GameCart[];
}

export interface CartAction {
  type: string;
  payload: GameCart | GameCart[] | number;
}

export interface CartStateType {
  gamesList: GameCart[];
  totalPurchase: number;
  userBalance: number;
}

export interface GameToEdit {
  id?: number;
  title: string;
  category: string;
  price: number;
  imgUrl: string;
  description?: string;
  genre: string;
  age: number;
  rating?: number;
  date?: string;
}

export interface FilterAction {
  type: string;
  payload: Game[];
}

export interface FilterState {
  loading: boolean;
  gamesList: Game[];
}

export interface AdminStateType {
  gametoEdit: GameToEdit;
}

export interface FilterStateType extends BaseSearchCriteria {
  term: string;
  searchResult: Game[];
}
