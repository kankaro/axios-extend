type Geo = {
  lat: string;
  lng: string;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
type Address = {
  street: string;
  suit: string;
  city: string;
  zipcode: string;
  geo: Geo;
};
export type Users = {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};
