const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}) )

app.listen(3300, ()=>{
    console.log('It`s connecting now!')
})