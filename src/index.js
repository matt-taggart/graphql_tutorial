const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const schema = require('./schema');
const connectMongo = require('./mongo-connector');
const PORT = 3000;

const start = async () => {
  const mongo = await connectMongo();
  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  app.listen(PORT, () => console.log(`Graphql server running on PORT ${PORT}`));
}

start();
