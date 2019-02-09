import { Injectable } from "@angular/core";
import { ValidatorService } from "angular4-material-table";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Person } from "./model";
import { AccountValidatorService } from "../../core/core.module";
import { Account } from "../../core/services/model";
import { SharedValidators } from "../../shared/validator/validators";

@Injectable()
export class WotValidatorService implements ValidatorService {

  constructor(
    protected formBuilder: FormBuilder,
    protected accountValitatorService: AccountValidatorService
  ) {
  }

  public getRowValidator(): FormGroup {
    return this.getFormGroup();
  }

  public getFormGroup(data?: Person): FormGroup {

    // Use account validator as base form group definition
    const formDef = this.accountValitatorService.getFormGroupDefinition(data && Account.fromObject(data.asObject));

    // BUT add more flexibility (set pubkey as optional)
    // This is need to be able to store person that are not using Duniter tools ?
    formDef.pubkey = [data && data.pubkey || null, SharedValidators.pubkey];

    return this.formBuilder.group(formDef);
  }


}
