import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            console.log(parent)
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        },
    },
    Review: {
        author(parent) {
            return db.authors.filter(a => a.id === parent.id )
        }
    },
    Mutation: {
        deleteGame(_, args) {
            return db.games.filter(g => g.id !== args.id)
        },
        deleteReview(_, args) {
            return db.reviews.filter(r => r.id !== args.id)
        },
        deleteAuthor(_, args) {
            return db.authors.filter(a => a.id !== args.id)
        }
    } 
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server is running at port", 4000);
