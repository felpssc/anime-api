import { v4 as uuid } from "uuid"; 
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Clan } from "../../../../clans/infra/typeorm/entities/Clan";

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

  @ManyToOne(() => Clan)
  @JoinColumn({ name: "clan_id" })
  	clan: Clan;

  constructor() {
  	if (!this.id) {
  		this.id = uuid();
  	}
  }
}