export interface IUser {
 readonly id: number,
  firstName: string,
  lastName: string,
  email: string,
  mobilePhoneNumber?: number,
  createdAt: Date,
}

export interface IUserState {
  user: IUser,
  users: IUser[]
}