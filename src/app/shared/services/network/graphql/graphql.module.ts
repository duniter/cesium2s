import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  exports: [HttpClientModule, ApolloModule],
})
export class AppGraphQLModule {
  constructor() {}
}
