import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './User.entity';
import { DataSource } from 'typeorm';
import { CreateUser } from './dtos/CreateUser.dto';

@Resolver(() => User)
export class UserResolver {
    @Query(() => [User!])
    async users(@Ctx('dataSource') dataSource: DataSource) {
        const userRepository = dataSource.getRepository<User>(User);
        const users = await userRepository.find();
        return users;
    }

    @Mutation(() => User)
    async createUser(
        @Ctx('dataSource') dataSource: DataSource,
        @Arg('data') data: CreateUser
    ) {
        const userRepository = dataSource.getRepository<User>(User);
        const user = await userRepository.create({
            name: data.name,
        });
        await user.save();
        return user;
    }

    // @FieldResolver(() => Role)
    // async role(@Root() user: User) {
    //     return {
    //         name: 'John Doe',
    //     };
    // }
}
