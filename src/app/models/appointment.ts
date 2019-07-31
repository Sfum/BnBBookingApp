export interface Appointment {
  $key: string;
  first_name: string;
  reference_number: number;
  last_name: string;
  appointment_date: Date;
  doctor_select: string;
  confirmation: string;
}
