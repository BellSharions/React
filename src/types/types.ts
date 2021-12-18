import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ProductItemProps {
  id?: number;
  title: string;
  description?: string;
  developer?: string;
  date: string;
  category: string;
  logo?: string;
}
export interface ProductParams {
  platform: string;
}
export interface CategoryProp {
  title: string;
  path: string;
  icon: IconProp;
}
