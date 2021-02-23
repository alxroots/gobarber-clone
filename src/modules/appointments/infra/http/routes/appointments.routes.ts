import Router from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

//Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const appointmentsRouter = Router();

//Aplicando middleware
appointmentsRouter.use(ensureAuthenticated);

//Lista os appointments existentes
appointmentsRouter.get('/', async(request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointmentsList = await appointmentRepository.find();
  return response.json(appointmentsList);
});

//Cria um novo Appointment
appointmentsRouter.post('/', async(request, response) => {
  const { provider_id, date } = request.body;
  
  //convert data
  const parsedDate = parseISO(date)
  //regra de negócio
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({ date: parsedDate, provider_id });
  
  return response.json(appointment)

  return response.status(400).json({ error: err.message });
  
  
});

export default appointmentsRouter;
