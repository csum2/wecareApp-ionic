import { MedicalData } from './medicaldata';

/* eslint-disable @typescript-eslint/naming-convention */
export class Patient {
  _id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  biological_sex: string;
  email: string;
  contact_phone: string;
  residential_address: string;
  emergency_contact: string;
  emergency_phone: string;
  relationship: string;
  medicaldata: MedicalData[];
};
