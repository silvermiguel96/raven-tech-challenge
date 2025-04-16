import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'operations' })
export class Operation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.operations)
  user!: User;

  @Column()
  // Define the operation type as a string
  // You can use an enum or a string literal type for better type safety
  operation!: string;

  @Column('float')
  operandA!: number;

  @Column('float')
  operandB!: number;

  @Column('float')
  result!: number;

  @CreateDateColumn()
  timestamp!: Date;
}
