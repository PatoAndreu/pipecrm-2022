export interface UserInterface {
 readonly id: number,
  firstName: string,
  lastName: string,
  email: string,
  mobilePhoneNumber?: number,
  createdAt: Date,
}

export interface UserState {
  user: UserInterface,
  users: UserInterface[]
}