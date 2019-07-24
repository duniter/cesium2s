import {Component, OnInit} from "@angular/core";
import {
  AppFormUtils,
  AppTable,
  AppTableDataSource,
  environment,
  LocalSettingsService,
  Person
} from "../../core/core.module";
import {PRIORITIZED_USER_PROFILES, StatusIds} from "../../core/services/model";
import {WotSearchFilter, WotService} from "../services/wot.service";
import {ModalController, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../core/services/account.service";
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RESERVED_END_COLUMNS, RESERVED_START_COLUMNS} from "../../core/table/table.class";
import {debounceTime} from "rxjs/operators";
import {FormFieldDefinition} from "../../shared/form/field.model";


@Component({
  selector: 'app-wot-search',
  templateUrl: 'wot-search.html',
  styleUrls: ['./wot-search.scss']
})
export class WotSearchPage extends AppTable<Person, WotSearchFilter> implements OnInit {

  private _searchText: string;

  filterForm: FormGroup;
  profiles: string[] = PRIORITIZED_USER_PROFILES;
  additionalFields: FormFieldDefinition[];
  statusList: any[] = [
    {
      id: StatusIds.PENDING,
      icon: 'close',
      label: 'WOT.FILTER.PENDING'
    },
    {
      id: StatusIds.MEMBER,
      icon: 'checkmark',
      label: 'WOT.FILTER.MEMBER'
    },
    {
      id: StatusIds.WALLET,
      icon: 'warning',
      label: 'WOT.FILTER.WALLET'
    }
  ];
  statusById; any;

  get searchText(): string {
    return this._searchText;
  }

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected platform: Platform,
    protected location: Location,
    protected modalCtrl: ModalController,
    protected accountService: AccountService,
    protected settings: LocalSettingsService,
    protected wotService: WotService,
    formBuilder: FormBuilder
  ) {
    super(route, router, platform, location, modalCtrl, settings,
      RESERVED_START_COLUMNS
        .concat([
          'avatar',
          'uid',
          'pubkey'
          //'date'
        ])
        .concat(wotService.additionalFields.map(field => field.key))
        .concat(RESERVED_END_COLUMNS),
      new AppTableDataSource<Person, WotSearchFilter>(Person, wotService)
    );

    this.inlineEdition = false;
    this.i18nColumnPrefix = 'WOT.';
    this.filterForm = formBuilder.group({
      'search': [null]
    });
    this.autoLoad = false;

    // Fill statusById
    this.statusById = {};
    this.statusList.forEach((status) => this.statusById[status.id] = status);

    this.additionalFields = this.wotService.additionalFields;

    this.wotService.ready().then(() => {
      console.log("[wot-search] Calling data service...");
      this.onRefresh.emit();
    });

    this.debug = !environment.production;
  }

  ngOnInit() {
    super.ngOnInit();

    // Update filter when changes
    this.filterForm.valueChanges
        .pipe(
            debounceTime(AppFormUtils.DEFAULT_DEBOUNCE_TIME)
        )
        .subscribe(() => {
          const json = this.filterForm.value as WotSearchFilter;
          this._searchText = json.search;
          this.filter = json;
        });

    this.onRefresh.subscribe(() => {
      this.filterForm.markAsUntouched();
      this.filterForm.markAsPristine();
    });
  }

  onSearchChange(event: CustomEvent) {
    this.filterForm.get('search').setValue(event.detail.value);
  }
}

