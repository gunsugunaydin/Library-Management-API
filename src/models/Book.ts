import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "BOOKS" })
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;
}
