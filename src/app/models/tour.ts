import { TourForCreation } from "./abstract/tour-for-creation";
export class Tour implements TourForCreation {
  id: string;
  startDate: Date;
  guides: string;
  drivers: string;
}
