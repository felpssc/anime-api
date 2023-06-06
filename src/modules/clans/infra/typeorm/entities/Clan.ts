import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Character } from "../../../../characters/infra/typeorm/entities/Character";

@Entity("clans")
export class Clan {
  @PrimaryColumn("uuid")
  	id: string;

  @Column()
  	name: string;

  @Column()
  	icon: string;

  @Column()
  	link: string;

  @CreateDateColumn()
  	created_at: Date;

  @UpdateDateColumn()
  	updated_at: Date;

	@OneToMany(() => Character, character => character.clan_id)
		character: Character[];

	constructor() {
  	if (!this.id) {
  		this.id = uuid();
  	}
	}
}