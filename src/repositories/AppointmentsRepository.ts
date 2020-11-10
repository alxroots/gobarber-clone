import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

//DATA TRANSFER OBJECT
interface CreateAppointmentDTO {
  date: Date;
  provider: string;
}


class AppointmentsRepository {
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  //pega todos os items da variavel Appointments
  public all(): Appointment[]{
    return this.appointments;
  }

  //verifica se algum item da lista de appointments possui a mesma data
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  //cria um novo appointment
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
