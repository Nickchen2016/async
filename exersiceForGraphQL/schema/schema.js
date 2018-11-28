const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


//dummy data
var books = [
    {name:'book 1', genre:'Fantacy', id:'1'},
    {name:'book 2', genre:'Fantacy', id:'2'},
    {name:'book 3', genre:'Sci-Fi', id:'3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fileds:()=>({
       id: { type: GraphQLString },
       name: { type:GraphQLString },
       genre: { type:GraphQLString } 
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fileds:{
        book:{
            type: BookType,
            args:{ id:{ type:GraphQLString } },
            resolve(parent,args){
                //get data from DB
                return _.find(books, {id:args.id});
            }
        }
    } 
});

module.exports = new GraphQLSchema({
    query:RootQuery
})