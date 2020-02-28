const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const app = express();

// Allow cross origin
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

// Port for the server to listen on 
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));