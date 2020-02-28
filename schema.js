// GraphQL stuff goes here 
// Depending on the data that we have it will be the objec type.
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');
const axios = require('axios');

//Launch type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType},
    })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Get an array of all the launches
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data); //Gives us back a Promise
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/rockets')
                .then(res => res.data); //Gives us back a Promise
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery, //takes in our query that we created
});