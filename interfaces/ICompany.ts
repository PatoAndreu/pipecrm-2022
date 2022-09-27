export interface ICompany {
  readonly id: number;
  name: string;
  domain?: string;
  type?: string;
  city?: string;
  address?: string;
  description?: string;
}

export interface ICompanyState {
  company: ICompany;
  companies: ICompany[];
}