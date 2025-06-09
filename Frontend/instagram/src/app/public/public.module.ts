import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublicRoutingModule} from "./public-routing.module";
import {AuthModule} from "./auth/auth.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
