import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ObjectIdColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn({ generated: false })
    public _id: ObjectId;

    @Field()
    @Column()
    name!: string;

    @Field(() => Int)
    @Column('int', { default: 0 })
    quantity!: number;

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;
}
