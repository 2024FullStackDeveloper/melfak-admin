import { IService, IServiceItem } from "./Section";

export interface IDashboard {
  servicesCount: number;
  itemsCount: number;
  contactsCount: number;
  socialMediasCount: number;
  lastFiveServices?: IDashboardService[];
  lastFiveItems?: IDashboardItem[];
}

export type IDashboardService = Pick<
  IService,
  "arTitle" | "enTitle" | "arSubTitle" | "enSubTitle" | "thumbnailUrl"
>;

export type IDashboardItem = Pick<
  IServiceItem,
  | "arTitle"
  | "enTitle"
  | "arSubTitle"
  | "enSubTitle"
  | "thumbnailUrl"
  | "isAvailable"
  | "isNewArrival"
>;
