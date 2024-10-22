import express from 'express'
import cors from 'cors'
import morgan from 'morgan'



  const app = express();


 app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev')) 


  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // your routes here

  
  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Page not found'
    });
  });

  
  export default app
  
