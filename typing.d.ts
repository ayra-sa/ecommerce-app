export interface ProductType {
  _id: string;
  _createdAt: string;
  name: string;
  price: number;
  image: Array<ImageType>;
  slug: {
    current: string;
  };
  details: Array;
  ratings: Array
}

export interface BannerType {
  _id: string;
  _createdAt: string;
  name: string;
  price: number;
  image: Array<ImageType>;
  slug: {
    current: string;
  };
  details: Array;
}


export interface ItemType {
  name: string,
  price: number,
  quantity: number
}

export interface ObjectType {
  name: string,
  image: [],
  price: number
}

type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  assetId: string;
  extension: string;
  mimeType: string;
  size: number;
  url: string;
};
