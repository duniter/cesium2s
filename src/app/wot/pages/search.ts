import { Component, OnInit } from "@angular/core";
import {AppTable, AppTableDataSource, LocalSettingsService} from "../../core/core.module";
import { Person, referentialToString, PRIORITIZED_USER_PROFILES, StatusIds } from "../../core/services/model";
import { WotService, Identity, WotSearchFilter } from "../services/wot.service";
import { WotValidatorService } from "../services/wot.validator";
import { ModalController, Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService, AccountFieldDef } from "../../core/services/account.service";
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RESERVED_START_COLUMNS, RESERVED_END_COLUMNS } from "../../core/table/table.class";


@Component({
  selector: 'app-wot-search',
  templateUrl: 'search.html',
  styleUrls: ['./search.scss']
})
export class WotSearchPage extends AppTable<Identity, {search: string;}> implements OnInit {

  filterForm: FormGroup;
  profiles: string[] = PRIORITIZED_USER_PROFILES;
  additionalFields: AccountFieldDef[];
  statusList: any[] = [
    {
      id: StatusIds.ENABLE,
      icon: 'checkmark',
      label: 'REFERENTIAL.STATUS_ENABLE'
    },
    {
      id: StatusIds.DISABLE,
      icon: 'close',
      label: 'REFERENTIAL.STATUS_DISABLE'
    },
    {
      id: StatusIds.TEMPORARY,
      icon: 'warning',
      label: 'REFERENTIAL.STATUS_TEMPORARY'
    }
  ];
  statusById; any;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected platform: Platform,
    protected location: Location,
    protected modalCtrl: ModalController,
    protected accountService: AccountService,
    protected settings: LocalSettingsService,
    protected validatorService: WotValidatorService,
    protected wotService: WotService,
    formBuilder: FormBuilder
  ) {
    super(route, router, platform, location, modalCtrl, settings,
      RESERVED_START_COLUMNS
        .concat([
          'uid',
          'pubkey'
        ])
        .concat(accountService.additionalAccountFields.map(field => field.name))
        .concat(RESERVED_END_COLUMNS),
      new AppTableDataSource<Identity, WotSearchFilter>(Identity, wotService, validatorService, {
        prependNewElements: false,
        suppressErrors: false,
        serviceOptions: {
          saveOnlyDirtyRows: true
        }
      })
    );

    // Allow inline edition only if admin
    this.inlineEdition = accountService.isAdmin();

    this.i18nColumnPrefix = 'WOT.';
    this.filterForm = formBuilder.group({
      'search': [null]
    });

    // Fill statusById
    this.statusById = {};
    this.statusList.forEach((status) => this.statusById[status.id] = status);

    this.additionalFields = this.accountService.additionalAccountFields;
  }

  ngOnInit() {
    super.ngOnInit();

    // Update filter when changes
    this.filterForm.valueChanges.subscribe(() => {
      this.filter = this.filterForm.value;
    });

    this.onRefresh.subscribe(() => {
      this.filterForm.markAsUntouched();
      this.filterForm.markAsPristine();
    });
  }

  referentialToString = referentialToString;
}

