import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BookInfo } from "./BookInfo";

@Entity({ name: "USERS" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @OneToMany(() => BookInfo, (bookInfo) => bookInfo.oldUser)
  pastBooks!: BookInfo[];

  @OneToMany(() => BookInfo, (bookInfo) => bookInfo.currentUser)
  presentBooks!: BookInfo[];
}

