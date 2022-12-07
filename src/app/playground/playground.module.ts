import {NgModule} from "@angular/core";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AppAuthModule} from "@app/auth/auth.module";
import {AppRegisterModule} from "@app/register/register.module";
import {PlaygroundPage} from "@app/playground/playground.page";
import {PlaygroundPageRoutingModule} from "@app/playground/playground-routing.module";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    PlaygroundPageRoutingModule,
    AppAuthModule,
    AppRegisterModule
  ],
  declarations: [PlaygroundPage]
})
export class PlaygroundModule {}
