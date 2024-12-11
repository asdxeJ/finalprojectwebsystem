export type CartGet = {
  menuId: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
};

export type CartPost = {
  menuId: number;
  quantity: number;
};

export type CartDelete = {
  menuId: number;
}

export type CartUpdate = {
  menuId: number;
  quantity: number
}