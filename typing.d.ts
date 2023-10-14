interface ProductType {
  _id: string;
  _createdAt: string;
  name: string;
  price: number;
  image: Array<ImageType>;
  slug: {
    current: string;
  };
  details: Array;
  ratings: number[]
}

interface BannerType {
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


interface ItemType {
  name: string,
  price: number,
  quantity: number
}

interface ObjectType {
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

type ItemImageType = {
  asset: {
    _ref: string
    _type: string
  }
  _key: string
  _type: string
}

interface HeadContext {
  title: string
  meta: Meta[]
}

interface Meta {
  property?: string
  name?: string
  content?: string
  key?: string
}