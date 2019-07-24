import {Injectable} from "@angular/core";
import {ValidatorService} from "angular4-material-table";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LocalSettings, EntityUtils} from "./model";
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
      properties: this.getPropertiesArray(data && data.properties)
    }, {
      asyncValidators: (group: FormGroup) => this.peerAlive(group.get('peerUrl'))
    });
  }

  getPropertiesArray(array?: any) {
    const properties = (array && array instanceof Array) ? array : EntityUtils.getObjectAsArray(array || {});
    return this.formBuilder.array(
        properties.map(item => this.getPropertyFormGroup(item))
    );
  }

  getPropertyFormGroup(data?: {key: string; value?: string;}): FormGroup {
    return this.formBuilder.group({
      key: [data && data.key || null, Validators.compose([Validators.required, Validators.max(50)])],
      value: [data && data.value || null, Validators.compose([Validators.required, Validators.max(100)])]
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
