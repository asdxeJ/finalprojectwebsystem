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

export interface Register {
  userName: string;
  email: string;
  password: string
}

export interface Login {
  userName: string;
  password: string;
}

export interface UserInfo {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  userName: string;
}
