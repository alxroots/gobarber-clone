import Router from 'express';

//Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

//Aplicando middleware
appointmentsRouter.use(ensureAuthenticated);

//Lista os appointments existentes
// appointmentsRouter.get('/', async(request, response) => {

//   const appointmentsList = await appointmentRepository.find();
//   return response.json(appointmentsList);
// });

//Cria um novo Appointment
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
