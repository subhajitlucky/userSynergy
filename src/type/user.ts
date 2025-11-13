type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

type Company = {
  name: string;
  catchPhrase?: string;
};

type User = {
    id: number;
    name: string;
  username?: string;
    email: string;
    phone: string;
  website?: string;
  address?: Address;
  company?: Company;
};

export type { User };