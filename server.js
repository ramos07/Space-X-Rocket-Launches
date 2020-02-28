const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

// Port for the server to listen on 
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));