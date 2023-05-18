import { TourForCreation } from "./abstract/tour-for-creation";
export class Tour implements TourForCreation {
  id: string;
  startDate: string;
  guides: string;
  drivers: string;
  touristNumber: number;
  endDate: Date;
  touristsInProcess: number;
}
