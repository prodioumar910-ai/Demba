export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'watch' | 'glasses' | 'perfume';
  image: string;
}

export interface Seller {
  id: string;
  name: string;
  role: string;
  photo: string;
}

