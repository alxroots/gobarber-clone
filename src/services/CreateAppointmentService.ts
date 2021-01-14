import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';


interface RequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointService {
  public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate){
      throw new AppError('This appointment is already bookde');
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentRepository.save(appointment);
    
    return appointment;
  }
}

export default CreateAppointService;
