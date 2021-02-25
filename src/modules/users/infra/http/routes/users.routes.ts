import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);


//Cria um novo user
usersRouter.post('/', usersControllers.create);

// Atualizar somente AVATAR (usar patch)
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRouter;