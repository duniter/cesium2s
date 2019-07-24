import {Injectable} from "@angular/core";
import {ValidatorService} from "angular4-material-table";
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Account} from "./model";
import {AccountService} from "./account.service";
import {FormFieldDefinition} from "../../shared/shared.module";
import {SharedValidators} from "../../shared/validator/validators";

@Injectable()
export class AccountValidatorService implements ValidatorService {

  constructor(
    protected formBuilder: FormBuilder,
    protected accountService: AccountService
  ) {
  }

  getRowValidator(): FormGroup {
    return this.getFormGroup();
  }

  getFormGroup(data?: Account): FormGroup {
    return this.formBuilder.group(this.getFormGroupDefinition(data));
  }

  public getFormGroupDefinition(data?: Account): any {
    const formDef = {
      uid: [data && data.uid || null, Validators.minLength(2)],
      pubkey: [data && data.pubkey || null, Validators.compose([Validators.required, SharedValidators.pubkey])]
    };

    // Add additional fields
    this.accountService.additionalFields.forEach(field => {
      //console.debug("[register-form] Add additional field {" + field.name + "} to form", field);
      formDef[field.key] = [data && data[field.key] || null, this.getValidators(field, 'account')];
    });

    return formDef;
  }

  public getValidators(field: FormFieldDefinition, extraKey: string): ValidatorFn | ValidatorFn[] {
    const validatorFns: ValidatorFn[] = [];
    if (field.extra && field.extra[extraKey].required) {
      validatorFns.push(Validators.required);
    }
    if (field.type === 'entity') {
      validatorFns.push(SharedValidators.entity);
    }

    return validatorFns.length ? Validators.compose(validatorFns) : validatorFns.length === 1 ? validatorFns[0] : undefined;
  }
}
