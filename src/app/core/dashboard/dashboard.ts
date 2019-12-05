import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: ['./dashboard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {

}
