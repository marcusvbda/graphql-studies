import {
    Entity,
    Column,
    BaseEntity,
    ObjectIdColumn,
    JoinTable,
    OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Role } from '../Role/Role.entity';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn({ generated: false })
    public _id: ObjectId;

    @Field()
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    public roleName: String;
}
