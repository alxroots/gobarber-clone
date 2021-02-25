import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';


interface IRequestDTO {
  date: Date;
  provider_id: string;
}

@injectable()
class CreateAppointService {
  constructor(
    @inject('AppointmentsRepository') 
    private appointmentRepository: IAppointmentsRepository
  
  ){

  }

  public async execute({date, provider_id}: IRequestDTO): Promise<Appointment> {


    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate){
      throw new AppError('This appointment is already bookde');
    }
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    
    return appointment;
  }
}

export default CreateAppointService;
