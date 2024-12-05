export interface Menu {
  id : number;
  name : string;
  category : string;
  price : string;
  description : string;
  imageUrl : string;
}

export interface Cart {
  customerId: number;
  menuId: number;
  quantity: number;
  menu: Menu;
}