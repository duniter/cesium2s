# Generating GraphQL Models from Schema Introspection

This guide will walk you through the process of generating GraphQL models from schema introspection using `npx get-graphql-schema` and `npm run generate:graphql`. This process is essential for developers working with GraphQL APIs, as it allows you to generate type definitions and query documents based on your GraphQL schema.

## Step 1: Fetching the GraphQL Schema

The first step is to fetch the GraphQL schema from your GraphQL server. This can be done using the `get-graphql-schema` tool. Run the following command in your terminal:

```bash
npx get-graphql-schema https://gdev-squid.axiom-team.fr/v1beta1/relay > src/app/network/indexer-schema.graphql
```

__NB: run just `npx get-graphql-schema` first time to confirm installation of `get-graphql-schema` module.__

This command fetches the GraphQL schema from the specified URL and saves it to `src/app/network/indexer-schema.graphql`. Ensure the URL is correct and points to your GraphQL server.

## Step 2: Write your own GraphQL Schemas

In addition to the schema fetched from the server, you can also write your own GraphQL schemas. These custom schemas will be used by the `npm run generate:graphql` command to generate additional models and types.

To write your own GraphQL schemas, create `.graphql` files in your project directory, such as `src/app/**/*.graphql`. These files should contain your GraphQL type definitions, queries, mutations, and subscriptions.

For example, you can create a file named `src/app/custom-types.graphql` with the following content:

```graphql
type CustomType {
  id: ID!
  name: String!
}

query GetCustomTypes {
  customTypes: [CustomType!]!
}
```

The `npm run generate:graphql` command will consider these custom schemas along with the fetched schema from Step 1 when generating the models.

## Step 3: Generating GraphQL Models

Once you have the schema and your custom GraphQL schemas, you can generate the GraphQL models using GraphQL Code Generator. This tool reads your GraphQL schema and generates TypeScript types, operations (queries, mutations, subscriptions), and Apollo Angular services.

To generate the models, run the following command:

```bash
npm run generate:graphql
```

This command executes the `generate:graphql` script defined in your `package.json`. It uses the configuration specified in the `codegen.yml` file to generate the models.

## Step 4: Using the Generated Models

After running the command, the generated models will be available in your project directory, as specified in the GraphQL Code Generator configuration. You can now import and use these models to type-check your GraphQL queries, mutations, and subscriptions.

The generated files will be located at:

- `src/app/network/indexer-types.generated.ts`: Contains the TypeScript types, Apollo Angular services, and operations.
- `src/app/network/indexer-helpers.generated.ts`: Contains helper functions for working with the generated types.

You can import these generated files in your TypeScript code and use them to ensure type safety and autocompletion when working with your GraphQL API.
