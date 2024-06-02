import { FormGroup } from "@angular/forms";
import { ValidationMessage } from './validation_message';

export const onValueChanged = (formName: FormGroup, formErrors: any, data?: any) => {
  if (!formName) { return; }
  const form = formName;
  for (const field in formErrors) {
    if (formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = ValidationMessage[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
