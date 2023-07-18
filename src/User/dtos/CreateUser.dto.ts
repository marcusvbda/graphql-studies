import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDto {
    @Field()
    name: string;
}
