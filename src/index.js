const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schema');
const { authenticate } = require('./authentication');
const connectMongo = require('./mongo-connector');
const buildDataLoaders = require('./dataloaders');
const PORT = 3000;

const start = async () => {
  const mongo = await connectMongo();
  const app = express();

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: {
        dataloaders: buildDataLoaders(mongo),
        mongo,
        user
      },
      schema
    }
  }

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  //Makeshift authorization as example
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Authorization': 'bearer token-mickey@test123.com'`
  }));

  app.listen(PORT, () => console.log(`Graphql server running on PORT ${PORT}`));
}

start();
