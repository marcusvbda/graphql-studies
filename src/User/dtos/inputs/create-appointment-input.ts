import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
  @Field()
  customerId: number;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}
