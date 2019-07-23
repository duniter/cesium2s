import {Injectable} from "@angular/core";
import {ValidatorService} from "angular4-material-table";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PropertyValue, LocalSettings} from "./model";
import {SharedValidators} from "../../shared/validator/validators";
import {NetworkService} from "./network/network.service";

@Injectable()
export class LocalSettingsValidatorService implements ValidatorService {

  constructor(
    private formBuilder: FormBuilder,
    private networkService: NetworkService
  ) {
  }

  getRowValidator(): FormGroup {
    return this.getFormGroup();
  }

  getFormGroup(data?: LocalSettings): FormGroup {
    return this.formBuilder.group({
      accountInheritance: [data && data.accountInheritance || true, Validators.required],
      locale: [data && data.locale || null, Validators.required],
      peerUrl: [data && data.peerUrl, Validators.required],
      fields: this.getFieldsArray(data && data.fields)
    }, {
      asyncValidators: (group: FormGroup) => this.peerAlive(group.get('peerUrl'))
    });
  }

  getFieldsArray(array?: PropertyValue[]) {
    return this.formBuilder.array(
      (array || []).map(item => this.getFieldControl(item))
    );
  }

  getFieldControl(data?: PropertyValue): FormGroup {
    return this.formBuilder.group({
      key: [data && data.key || '', Validators.required],
      value: [data && data.value || '', Validators.required]
    });
  }

  /* -- protected methods -- */

  protected async peerAlive(peerUrlControl: AbstractControl): Promise<ValidationErrors | null>  {
    const alive = await this.networkService.checkPeerAlive(peerUrlControl.value);

    if (!alive) {
      // Update end field
      const errors: ValidationErrors = peerUrlControl.errors || {};
      errors['peerAlive'] = true;
      peerUrlControl.setErrors(errors);
      peerUrlControl.markAsTouched({onlySelf: true});
      // Return the error (should be apply to the parent form)
      return { peerAlive: true};
    }
    // OK: remove the existing on control
    else {
      SharedValidators.clearError(peerUrlControl, 'peerAlive');
    }
  }

}
