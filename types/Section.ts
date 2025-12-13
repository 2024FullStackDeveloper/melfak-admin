export interface IService {
  id: string;
  sectionId: string;
  arTitle: string;
  arSubTitle?: string | null;
  arDescription?: string | null;
  enTitle: string;
  enSubTitle?: string | null;
  enDescription?: string | null;
  thumbnailUrl: string;
  imageUrl?: string | null;
  unactive: boolean;
  order: number;
  videoUrl?: string | null;
  posterUrl?: string | null;
  parentServiceId?: string | null;
  createdAt: string;
  modifiedAt?: string | null;
  images?: IImage[];
}

export interface IImage {
  id: string;
  imageUrl: string;
}

export interface ISection {
  id: string;
  arTitle: string;
  enTitle: string;
  arDescription?: string | null;
  enDescription?: string | null;
  unactive: boolean;
  createdAt: string;
  modifiedAt?: string | null;
  pageCode?: string;
  orderOnPage?: number;
  services?: IService[];
}

export interface IServiceItemAttribute {
  id: string;
  itemId: string;
  arName: string;
  enName: string;
  arValue?: string | null;
  enValue?: string | null;
  singleValue: boolean;
  value: string;
  order: number;
  createdAt: string;
  modifiedAt?: string | null;
}

export interface IServiceItem {
  id: string;
  service: IService;
  arTitle: string;
  arSubTitle?: string | null;
  arDescription?: string | null;
  enTitle: string;
  enSubTitle?: string | null;
  enDescription?: string | null;
  thumbnailUrl: string;
  imageUrl?: string | null;
  unactive: boolean;
  order: number;
  price?: number | null;
  isAvailable?: boolean | null;
  isNewArrival?: boolean | null;
  videoUrl?: string | null;
  posterUrl?: string | null;
  parentServiceId?: string | null;
  createdAt: string;
  modifiedAt?: string | null;
  attributes?: IServiceItemAttribute[];
}
