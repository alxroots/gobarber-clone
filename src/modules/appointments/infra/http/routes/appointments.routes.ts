import Router from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

//Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const appointmentsRouter = Router();

//Aplicando middleware
appointmentsRouter.use(ensureAuthenticated);

//Lista os appointments existentes
// appointmentsRouter.get('/', async(request, response) => {

//   const appointmentsList = await appointmentRepository.find();
//   return response.json(appointmentsList);
// });

//Cria um novo Appointment
appointmentsRouter.post('/', async(request, response) => {
  const { provider_id, date } = request.body;
  
  //convert data
  const parsedDate = parseISO(date)
  //regra de negócio

  const appointmentsRepository = new AppointmentsRepository(); 
  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  const appointment = await createAppointment.execute({ date: parsedDate, provider_id });
  
  return response.json(appointment)
  
});

export default appointmentsRouter;
