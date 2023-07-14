import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";

const appointments: Appointment[] = [];
@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => [Appointment!])
  async appointments() {
    return appointments;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      customerId: data.customerId,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    appointments.push(appointment);
    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    return {
      name: "John Doe",
    };
  }
}
