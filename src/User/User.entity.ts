import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
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
}
