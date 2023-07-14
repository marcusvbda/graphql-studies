import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { buildSchema } from "type-graphql";
import path from "path";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AppointmentsResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  } as any);
  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();
  console.log(`Server is running on ${url}`);
}

bootstrap();
