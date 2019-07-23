import {Component, Inject} from '@angular/core';
import { MenuItem } from './core/menu/menu.component';
import {AccountService, isNotNil, LocalSettingsService} from './core/core.module';
import {PlatformService} from "./core/services/platform.service";
import {DOCUMENT} from "@angular/common";
import {LocalSettings} from "./core/services/model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuItems: Array<MenuItem> = [
    { title: 'MENU.HOME', path: '/', icon: 'home' },
    { title: 'MENU.WOT', path: '/wot/search', icon: 'people' },

    // Settings
    { title: '' /*empty divider*/},
    { title: 'MENU.LOCAL_SETTINGS', path: '/settings', icon: 'settings' },
    { title: 'MENU.ABOUT', action: 'about', matIcon: 'help_outline', cssClass: 'visible xs visible-sm' },
    { title: 'MENU.LOGOUT', action: 'logout', icon: 'log-out', profile: 'GUEST', cssClass: 'ion-color-danger' }
  ];

  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private platform: PlatformService,
    private accountService: AccountService,
    private settings: LocalSettingsService
  ) {

    this.platform.ready().then(() => {

      // Listen for config changed
      this.settings.onChange.subscribe(data => this.onSettingsChanged(data));

      // Add additional account fields
      this.addAccountFields();

    });
  }

  public onActivate(event) {
    // Make sure to scroll on top before changing state
    // See https://stackoverflow.com/questions/48048299/angular-5-scroll-to-top-on-every-route-click
    const scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  protected onSettingsChanged(settings: LocalSettings) {

    if (settings.properties) {
      this.updateTheme({
        colors: {
          primary: settings.properties["theme.color.primary"],
          secondary: settings.properties["theme.color.secondary"],
          tertiary: settings.properties["theme.color.tertiary"]
        }
      });
    }

  }


  protected updateTheme(options: { colors?: { primary?: string; secondary?: string; tertiary?: string; } }) {
    if (!options) return;

    console.info("[app] Changing theme colors ", options);

    // Settings colors
    if (options.colors) {
      Object.getOwnPropertyNames(options.colors).forEach(colorName => {

        // Remove existing value
        document.documentElement.style.removeProperty(`--ion-color-${colorName}`);

        // Set new value, if any
        const color = options.colors[colorName];
        if (isNotNil(color)) {
          document.documentElement.style.setProperty(`--ion-color-${colorName}`, color);
          // TODO compute shade, hint, ...
        }
      });
    }
  }

  protected addAccountFields() {

    console.debug("[app] Add additional account fields...");

    // Add account field: department
    // this.accountService.addAdditionalAccountField({
    //   name: 'email',
    //   label: 'USER.EMAIL',
    //   required: true,
    //   updatable: {
    //     registration: true,
    //     account: false
    //   }
    // });
  }
}

