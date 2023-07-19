import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
@Entity('version_control')
export class VersionControl extends BaseEntity {
    @Field(() => String)
    @ObjectIdColumn({ generated: false })
    public _id: ObjectId;

    @Field()
    @Column()
    version!: string;
}
