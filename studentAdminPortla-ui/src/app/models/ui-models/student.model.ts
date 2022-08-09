import { Address } from './address.model';
import { Gender } from './gender.model';


export interface Student{
  id:string,
  firstName:string,
  lastName:string,
  dateOjBirth:string,
  email:string,
  mobile:number,
  profileImageUrl:string,
  genderId: string,
  gneder: Gender,
  address: Address
}
