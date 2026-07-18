import {VacationDto} from "./vacation-dto";
import {ExcursionDto} from "./excursion-dto";

/**
 * Cart Item Dto
 * Data Transfer Object for cart item
 * used for rest api message sent to back end
 *
 *
 */
export class CartItemDto {

  constructor(
    private vacation: VacationDto,
    private excursions: ExcursionDto []
  ) {
  }

  // set vacation
  public setVacation(vacationIn: VacationDto) {
    this.vacation = vacationIn;
  }

  // get vacation
  public getVacation() {
    return this.vacation;
  }

  // add excursion
  public addExcursion(excursionIn: ExcursionDto) {
    // // console.log("Pushing Excursion");
    // // console.log(excursionIn.getExcursionTitle());
    this.excursions.push(excursionIn);
  }

  // get excursions
  public getExcursions() {
    return this.excursions;
  }

}
