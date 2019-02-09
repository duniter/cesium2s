import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import { MatTabChangeEvent } from "@angular/material";
import { AppForm, AppTable } from '../../core/core.module';
import { Entity } from '../services/model';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
export abstract class AppTabPage<T extends Entity<T>, F = any>{


    private _forms: AppForm<any>[];
    private _tables: AppTable<any, any>[];
    private _subscriptions: Subscription[];

    debug: boolean = false;
    data: T;
    selectedTabIndex: number = 0;
    submitted: boolean = false;
    error: string;
    loading: boolean = true;

    public get dirty(): boolean {
        return (this._forms && !!this._forms.find(form => form.dirty)) || (this._tables && !!this._tables.find(table => table.dirty));
    }

    public get valid(): boolean {
        return (!this._forms || !this._forms.find(form => !form.valid)) && (!this._tables || !this._tables.find(table => !table.valid));
    }

    public get invalid(): boolean {
        return (this._forms && !!this._forms.find(form => form.invalid)) || (this._tables && !!this._tables.find(table => !table.invalid));
    }

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected alertCtrl: AlertController,
        protected translate: TranslateService
    ) {
        // Listen route parameters
        this.route.queryParams.subscribe(res => {
            const tabIndex = res["tab"];
            if (tabIndex !== undefined) {
                this.selectedTabIndex = parseInt(tabIndex);
            }
        });
    }

    ngOnDestroy() {
        if (this._subscriptions) {
            this._subscriptions.forEach(s => s.unsubscribe());
            this._subscriptions = undefined;
        }
    }

    abstract async load(id?: number, options?: F);

    abstract async save(event): Promise<any>;

    public registerForm(form: AppForm<any>): AppTabPage<T, F> {
        if (!form) throw 'Trying to register an invalid form';
        this._forms = this._forms || [];
        this._forms.push(form);
        return this;
    }

    public registerForms(forms: AppForm<any>[]): AppTabPage<T, F> {
        forms.forEach(form => this.registerForm(form));
        return this;
    }

    public registerTable(table: AppTable<any, any>): AppTabPage<T, F> {
        if (!table) throw 'Trying to register an invalid table';
        this._tables = this._tables || [];
        this._tables.push(table);
        return this;
    }

    public registerTables(tables: AppTable<any, any>[]): AppTabPage<T, F> {
        tables
            .filter(table => !!table) // Skip not found tables
            .forEach(table => this.registerTable(table));
        return this;
    }

    public disable() {
        this._forms && this._forms.forEach(form => form.disable());
        this._tables && this._tables.forEach(table => table.disable());
    }

    public enable() {
        this._forms && this._forms.forEach(form => form.enable());
        this._tables && this._tables.forEach(table => table.enable());
    }

    public markAsPristine() {
        this.error = null;
        this.submitted = false;
        this._forms && this._forms.forEach(form => form.markAsPristine());
        this._tables && this._tables.forEach(table => table.markAsPristine());
    }

    public markAsUntouched() {
        this._forms && this._forms.forEach(form => form.markAsUntouched());
        this._tables && this._tables.forEach(table => table.markAsUntouched());
    }

    public markAsTouched() {
        this._forms && this._forms.forEach(form => form.markAsTouched());
        this._tables && this._tables.forEach(table => table.markAsTouched());
    }


    public onTabChange(event: MatTabChangeEvent) {
        const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
        queryParams['tab'] = event.index;
        this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: queryParams
        });
    }

    async cancel() {
        if (!this.dirty) return;
        await this.reload();
    };

    public async reload(confirm?: boolean) {
        const needConfirm = this.dirty;
        // if not confirm yet: ask confirmation
        if (!confirm && needConfirm) {
            const translations = this.translate.instant(['COMMON.YES', 'COMMON.NO', 'CONFIRM.CANCEL_CHANGES', 'CONFIRM.ALERT_HEADER']);
            const alert = await this.alertCtrl.create({
                header: translations['CONFIRM.ALERT_HEADER'],
                message: translations['CONFIRM.CANCEL_CHANGES'],
                buttons: [
                    {
                        text: translations['COMMON.NO'],
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => { }
                    },
                    {
                        text: translations['COMMON.YES'],
                        handler: () => {
                            confirm = true; // update upper value
                        }
                    }
                ]
            });
            await alert.present();
            await alert.onDidDismiss();
        }

        // If confirm: execute the reload
        if (confirm || !needConfirm) {
            this.scrollToTop();
            this.disable();
            return await this.doReload();
        }
    }

    public async doReload() {
        this.loading = true;
        await this.load(this.data && this.data.id);
    }

    /* -- protected methods -- */

    protected async scrollToTop() {
        // TODO: FIXME (not working as the page is not the window)
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

    protected isNewData(): boolean {
        return !this.data || this.data.id === undefined || this.data.id === null
    }

    protected registerSubscription(sub: Subscription) {
        this._subscriptions = this._subscriptions || [];
        this._subscriptions.push(sub);
    }

}
