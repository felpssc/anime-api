interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  birth_date?: string;
}

export { ICreateUserDTO };