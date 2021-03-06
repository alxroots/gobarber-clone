import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use('/', routes);

app.use((err:Error, request: Request, response: Response, next: NextFunction)=>{
  if( err instanceof AppError ){
    return response.status(err.statuscode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: ' internal server error',
  });
});


app.listen(3333, ()=>{
  console.log('🏠 Server started at port 3333 📲');
});
