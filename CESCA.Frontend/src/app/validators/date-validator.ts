import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DateValidator {
  static NotLessThanToday(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // allow empty, use Validators.required separately

    const inputDate = new Date(control.value);
    const today = new Date();

    // normalize to midnight for date-only comparison
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { notLessThanToday: true }; // invalid if today or future
    }

    return null; // valid
  }
}