import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public stampCreated: Date;

    @UpdateDateColumn()
    public stampUpdated: Date;

}
