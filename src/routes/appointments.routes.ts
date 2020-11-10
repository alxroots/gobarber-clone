import Router from 'express';
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import CreateAppointService from '../services/CreateAppointmentService';


const appointmentsRep = new AppointmentsRepository();
const appointmentsRouter = Router();


//Lista os appointments existentes
appointmentsRouter.get('/', (request, response) => {
  
  const appointmentsList = appointmentsRep.all();
  return response.json(appointmentsList);
});

//Cria um novo Appointment
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    //convert data
    const parsedDate = parseISO(date)
    //regra de negócio
    const createAppointment = new CreateAppointmentService(appointmentsRep);
    const appointment = createAppointment.execute({ date: parsedDate, provider });
    
    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
  
});

export default appointmentsRouter;
