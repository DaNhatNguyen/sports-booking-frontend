export interface Court {
  _id: string;
  name: string;
  type: string;
  address: string;
  phoneNumber?: string;
  images: string[];
  price: number;
  subCourtCount: number;
  openTime: string;
  closeTime: string;
  rating: number;
}