import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted a new record with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('removed id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated id', this.id);
  }
}
