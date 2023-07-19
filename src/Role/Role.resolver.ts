import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Role } from './Role.entity';
import { DataSource } from 'typeorm';
import { ObjectId } from 'mongodb';

@Resolver(() => Role)
export class RoleResolver {
    @Query(() => Role)
    async fetchRoles(@Ctx('dataSource') dataSource: DataSource) {
        const rolesRepository = dataSource.getRepository<Role>(Role);
        return await rolesRepository.findOne({
            order: {
                _id: 'desc',
            },
        });
    }

    @Query(() => Role)
    async fetchRole(
        @Arg('id') id: string,
        @Ctx('dataSource') dataSource: DataSource
    ) {
        const rolesRepository = dataSource.getRepository<Role>(Role);
        return await rolesRepository.findOne(new ObjectId(id) as any);
    }
}
