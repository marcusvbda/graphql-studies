import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class FetchUserDto {
    @Field(() => Int)
    @Min(0)
    skip = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    take = 25;

    @Field({ nullable: true })
    _id: string;

    @Field({ nullable: true })
    name: string;
}
