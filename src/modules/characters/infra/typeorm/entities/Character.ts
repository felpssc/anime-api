import { v4 as uuid } from "uuid"; 
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Clan } from "../../../../clans/infra/typeorm/entities/Clan";
import { CharacterImage } from "./CharacterImage";

@Entity("characters")
export class Character {
  @PrimaryColumn("uuid")
  	id: string;

  @Column()
  	name: string;

  @Column()
  	page: string;

  @Column({
  	nullable: true,
  	transformer: {
  		from(value: string) {
  			return JSON.parse(value);
  		},

  		to(value: object) {
  			return JSON.stringify(value);
  		}
  	}
  })
  	info: string;

  @Column("text", { array: true, default: [] })
  	about: string[];	
		
	@Column()
  	clan_id: string;
		
	@CreateDateColumn()
  	created_at: Date;
		
	@UpdateDateColumn()
  	updated_at: Date;
		
	@ManyToOne(() => Clan, clan => clan.id)
	@JoinColumn({ name: "clan_id", referencedColumnName: "id" })
		clan: Clan;

	@OneToMany(() => CharacterImage, character_image => character_image.character)
		images: CharacterImage[];

	constructor() {
  	if (!this.id) {
  		this.id = uuid();
  	}
	}
}