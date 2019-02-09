import { Injectable } from "@angular/core";
import { ValidatorService } from "angular4-material-table";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserSettings } from "./model";

@Injectable()
export class UserSettingsValidatorService implements ValidatorService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  getRowValidator(): FormGroup {
    return this.getFormGroup();
  }

  getFormGroup(data?: UserSettings): FormGroup {
    return this.formBuilder.group({
      id: [data && data.id || null],
      updateDate: [data && data.updateDate || null],
      locale: [data && data.locale || null, Validators.required],
      latLongFormat: [data && data.latLongFormat || null, Validators.required],
      content: [data && data.content || null],
      nonce: [data && data.nonce || null]
    });
  }
}
