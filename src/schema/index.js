const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type User {
    id: ID!
    name: String!
    email: String
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  type SigninPayload {
    token: String
    user: User
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signInUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
