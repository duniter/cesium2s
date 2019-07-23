import {Component, OnInit} from "@angular/core";
import {AppTable, AppTableDataSource, LocalSettingsService} from "../../core/core.module";
import {PRIORITIZED_USER_PROFILES, StatusIds} from "../../core/services/model";
import {WotSearchFilter, WotService} from "../services/wot.service";
import {WotValidatorService} from "../services/wot.validator";
import {ModalController, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountFieldDef, AccountService} from "../../core/services/account.service";
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RESERVED_END_COLUMNS, RESERVED_START_COLUMNS} from "../../core/table/table.class";
import {Identity} from "../../core/services/duniter/duniter.model";
import {GvaPendingIdentity} from "../../core/services/duniter/gva/gva.model";


@Component({
  selector: 'app-wot-search',
  templateUrl: 'search.html',
  styleUrls: ['./search.scss']
})
export class WotSearchPage extends AppTable<Identity, WotSearchFilter> implements OnInit {

  filterForm: FormGroup;
  profiles: string[] = PRIORITIZED_USER_PROFILES;
  additionalFields: AccountFieldDef[];
  statusList: any[] = [
    {
      id: StatusIds.PENDING,
      icon: 'checkmark',
      label: 'REFERENTIAL.STATUS_ENABLE'
    },
    {
      id: StatusIds.PENDING,
      icon: 'close',
      label: 'REFERENTIAL.STATUS_DISABLE'
    },
    {
      id: StatusIds.WALLET,
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
      new AppTableDataSource<Identity, WotSearchFilter>(GvaPendingIdentity, wotService, validatorService, {
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
}

