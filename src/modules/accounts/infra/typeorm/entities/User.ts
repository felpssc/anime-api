import { v4 as uuid } from "uuid";

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryColumn("uuid")
    	id: string;

    @Column()
    	name: string;

    @Column()
    	email: string;

    @Column({ select: false })
    	password: string;
    
    @Column()
    	is_admin: boolean;
    
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
