const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema, 
        GraphQLInt,
        GraphQLList } = graphql;


//dummy data
var books = [
    {name:'book 1', genre:'Fantacy', id:'1', authorId:'1'},
    {name:'book 2', genre:'Fantacy', id:'2', authorId:'2'},
    {name:'book 3', genre:'Sci-Fi', id:'3', authorId:'1'},
    {name:'book 4', genre:'documentary', id:'4', authorId:'1'},
    {name:'book 5', genre:'documentary', id:'5', authorId:'1'}
]

var authors = [
    {name:'name 1', age:23, id:'1'},
    {name:'name 2', age:12, id:'2'},
    {name:'name 3', age:45, id:'3'},
    {name:'name 4', age:52, id:'4'},
    {name:'name 5', age:102, id:'5'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
       id: { type: GraphQLString },
       name: { type:GraphQLString },
       genre: { type:GraphQLString },
       author: {
           type: AuthorType,
           resolve(parent,args){
            return _.find(authors, {id:parent.authorId});
           }
       } 
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({ //existed as a way to connect the front-end query to back-end DB by using bookType
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{ id:{ type:GraphQLString } },
            resolve(parent,args){
                //get data from DB
                return _.find(books, {id:args.id});
            }
        },
        author:{
            type: AuthorType,
            args:{ id:{ type:GraphQLString } },
            resolve(parent,args){
                return _.find(authors, {id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    } 
});

module.exports = new GraphQLSchema({
    query:RootQuery
})