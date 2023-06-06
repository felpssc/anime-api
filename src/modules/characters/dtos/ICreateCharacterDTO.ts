interface ICreateCharacterDTO {
  name: string;
  page?: string;
  info?: string;
  about?: string[];
  clan_id?: string;
}

export { ICreateCharacterDTO };