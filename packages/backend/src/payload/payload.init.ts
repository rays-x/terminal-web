import payload     from 'payload';
import express     from 'express';
import initPayload from './_payload/payload.init';

const app=express();
// Redirect all traffic at root to admin UI
app.get('/',function(_,res){
  res.redirect('/admin');
});
// Initialize Payload
initPayload(payload,{
  secret:process.env.SECRET_KEY,
  mongoURL:process.env.MONGO_CONNECTION_STRING,
  express:app,
  onInit:async() => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});
app.listen(3000);
