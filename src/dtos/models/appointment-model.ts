import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Appointment {
  @Field({ defaultValue: 1 })
  customerId: Number;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}
