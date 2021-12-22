import { ApartmentType } from "./enums/apartment-type";
import { TransportType } from "./enums/transport-type";

export class Tourist {
  id: string;
  tourId: string;
  name: string;
  birthday: Date;
  passportNumber: string;
  arrivalDateAndTime: Date;
  arrivalTransportType: string;
  checkInDate: Date;
  departureDateAndTime: Date;
  departureTransportType: string;
  checkOutDate: Date;
  tourDays: number;
  hotelNights: number;
  stars: number;
  apartmentType: ApartmentType;
  phoneNumber: string;
  hotel: string;
  closePrice: number;
  addition: string;
  comment: string;
}
