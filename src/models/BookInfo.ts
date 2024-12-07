import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity({ name: "BOOK_INFORMATIONS" })
export class BookInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "old_user_id" })
  oldUser!: User | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: "current_user_id" })
  currentUser!: User | null;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column({ type: "int", nullable: false })
  status!: number; // For example: 1 for Available, 2 for Borrowed

  @Column({ type: "float", nullable: true })
  score!: number | null;
}
