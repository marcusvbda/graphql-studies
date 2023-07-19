import { Ctx, Query, Resolver } from 'type-graphql';
import { VersionControl } from './VersionControl.entity';
import { DataSource } from 'typeorm';

@Resolver(() => VersionControl)
export class VersionControlResolver {
    @Query(() => VersionControl)
    async currentVersion(@Ctx('dataSource') dataSource: DataSource) {
        const versionRepository =
            dataSource.getRepository<VersionControl>(VersionControl);
        return await versionRepository.findOne({
            order: {
                _id: 'desc',
            },
        });
    }
}
