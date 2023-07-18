import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { User } from './User.entity';
import { DataSource } from 'typeorm';
import { ObjectId } from 'mongodb';
import { FetchUserDto } from './dtos/FetchUser.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Resolver(() => User)
export class UserResolver {
    makeFilter(data: FetchUserDto) {
        const where = {} as any;
        if (data.name) {
            where.name = new RegExp(data.name, 'ig');
        }

        if (data._id) {
            where._id = new ObjectId(data._id);
        }

        return {
            where,
            skip: data.skip,
            take: data.take,
        };
    }

    @Query(() => Number)
    async countUsers(
        @Ctx('dataSource') dataSource: DataSource,
        @Arg('data') data: FetchUserDto
    ) {
        const userRepository = dataSource.getRepository<User>(User);
        return await userRepository.count(this.makeFilter(data)?.where);
    }

    @Query(() => [User!])
    async fetchUsers(
        @Ctx('dataSource') dataSource: DataSource,
        @Arg('data') data: FetchUserDto
    ) {
        const userRepository = dataSource.getRepository<User>(User);
        const result = await userRepository.find(this.makeFilter(data));
        return result;
    }

    @Query(() => User!)
    async findUser(
        @Ctx('dataSource') dataSource: DataSource,
        @Arg('id') id: string
    ) {
        const userRepository = dataSource.getRepository<User>(User);
        return await userRepository.findOne(new ObjectId(id) as any);
    }

    @Mutation(() => User)
    async createUser(
        @Ctx('dataSource') dataSource: DataSource,
        @Arg('data') data: CreateUserDto
    ) {
        const userRepository = dataSource.getRepository<User>(User);
        const user = await userRepository.create({
            name: data.name,
        });
        await user.save();
        return user;
    }

    @FieldResolver(() => String)
    async role(@Root() user: User) {
        // console.log(user);
        return 'admin';
    }
}
