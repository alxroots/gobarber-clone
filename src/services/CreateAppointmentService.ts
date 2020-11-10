import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({date, provider}: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
  
    if (findAppointmentsInSameDate){
      throw Error('this appointment is already bookded')
    }
  
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });
    
    return appointment;
  }
}

export default CreateAppointService;
