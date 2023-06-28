import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Character } from "./Character";

@Entity("character_image")
export class CharacterImage {
  @PrimaryColumn("uuid")
  	id: string;

  @Column("uuid")
  	character_id: string;

  @Column()
  	link: string;

  @CreateDateColumn()
  	created_at: Date;

  @UpdateDateColumn()
  	updated_at: Date;

  @ManyToOne(() => Character, character => character.images)
  @JoinColumn({ name: "character_id" })
  	character: Character;

  constructor() {
  	if (!this.id) {
  		this.id = uuid();
  	}
  }
}