import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
@Entity('roles')
export class Role extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn({ generated: false })
    public _id: ObjectId;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    description!: string;

    @Field(() => [String])
    @Column()
    permissions: string[];
}
