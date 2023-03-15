import { v4 as uuid } from "uuid";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    	id: string;

    @Column()
    	name: string;

    @Column()
    	email: string;

    @Column()
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
