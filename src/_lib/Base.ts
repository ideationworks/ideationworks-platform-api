import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class Base {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public stampCreated: Date;

    @UpdateDateColumn()
    public stampUpdated: Date;

    @Column({ default: false })
    public deleted: boolean;
    
}
