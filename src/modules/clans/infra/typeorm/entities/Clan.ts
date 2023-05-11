import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

  constructor() {
  	if (!this.id) {
  		this.id = uuid();
  	}
  }
}