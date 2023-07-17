import {
    Arg,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { CreateAppointmentInput } from './dtos/inputs/create-appointment-input';
import { Appointment } from './dtos/models/appointment-model';
import { Customer } from './dtos/models/customer-model';
// import { User } from './User.entity';
// import { makeRepository } from '../../data-source';
// import { ObjectId } from 'mongodb';
// import { FindOneOptions } from 'typeorm';

const appointments: Appointment[] = [];
@Resolver(() => Appointment)
export class UserResolver {
    @Query(() => [Appointment!])
    async appointments() {
        // const userRepository = await makeRepository<User>(User);
        // const users = await userRepository.findOne(
        //     new ObjectId('64b5d133a97ff4d91116eef6') as FindOneOptions<User>
        // );
        // console.log(users);

        return appointments;
    }

    @Mutation(() => Appointment)
    async createAppointment(@Arg('data') data: CreateAppointmentInput) {
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
            name: 'John Doe',
        };
    }
}
