import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use( express.json() );
app.use( cors() );

mongoose.connect( 'mongodb+srv://pedromantovani03:Pmmg2008%3F@usersmaincluster.6xwwuxz.mongodb.net/Users?appName=UsersMainCluster' ).then( () => {
    console.log( 'Connected to MongoDB' );
} ).catch( ( error ) => {
    console.log( 'Failed to connect to MongoDB' );
    console.error( error );
} );

const usersSchema = new mongoose.Schema( {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
}, { timestamps: true } );

const User = mongoose.model( 'User', usersSchema );

app.get( '/users', async ( req, res ) => {
    const currentUsers = await User.find();
    res.json( currentUsers );
} );

app.post( '/users', async ( req, res ) => {
    const createdUser = await User.create(req.body);
    res.status( 201 ).json( createdUser );
} );

app.listen( 3000, () => {
    console.log( `Server is running on port 3000` );
} );