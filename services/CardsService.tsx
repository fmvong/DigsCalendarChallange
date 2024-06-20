interface Vendor {
  zip: string | null;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  city: string | null;
  streetAddress: string | null;
  id: string;
  state: string | null;
  vendorName: string;
}

export interface Action {
  arrivalEndWindow?: string;
  price: number;
  vendor?: Vendor;
  name: string;
  scheduledDate?: string;
  id: string;
  arrivalStartWindow?: string;
  status: string;
}

export interface Calendar {
  month: number;
  actions: Action[];
  year: number;
}

export interface Customer {
  zip: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  street: string;
  id: string;
  state: string;
  email: string;
}

export class Subscription {
  created: string;
  customer: Customer;
  deleted: boolean;
  calendar: Calendar[];
  id: string;
  status: string;

  constructor(
    created: string,
    customer: Customer,
    deleted: boolean,
    calendar: Calendar[],
    id: string,
    status: string
  ) {
    this.created = created;
    this.customer = customer;
    this.deleted = deleted;
    this.calendar = calendar;
    this.id = id;
    this.status = status;
  }
}

export default class CardsService {
  static getCards = async (): Promise<Subscription | any> => {
    const response = await fetch(
      `https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1/challenge`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Parse the response body as JSON
    const jsonData = await response.json();
    return jsonData;
  };
}
