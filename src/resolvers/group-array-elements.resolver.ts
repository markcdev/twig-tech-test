import { ApolloError } from 'apollo-server-express';
import { Arg, Field, InputType, Int, Query, Resolver } from 'type-graphql';

import { GroupedArrayElementsHandler } from '../handlers/grouped-array-elements.handler';

@InputType()
export class GroupArrayElementsRequest {
    @Field(_type => Int)
    groupSize: number;
    
    @Field(_type => [Int])
    inputArrayData: Array<number>;
}

@Resolver()
export class GroupArrayElementsResolver {
    private groupedArrayElementsHandler = new GroupedArrayElementsHandler();
    
    @Query(() => [[Int]])
    groupedArrayElements(@Arg('request', { validate: true }) request: GroupArrayElementsRequest) {
        const result = this.groupedArrayElementsHandler.handle(request.inputArrayData, request.groupSize);
        
        if (result.errorMessage) {
            throw new ApolloError(result.errorMessage);
        }

        return result.groups;
    }
}
