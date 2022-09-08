export interface User{
  id            : number;
  firstName    : string,
  lastName     : string,
  email         : string,
  mobilePhoneNumber?        : number,
}

export interface UserState {
  user    : User,
  users   : User[]
}