import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import {ImageCropperComponent} from "ngx-image-cropper";

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NotFoundComponent,
    LoaderComponent,
    ImageUploaderComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ImageCropperComponent
    ],
  exports: [
    MaterialModule,
    LoaderComponent,
    ImageUploaderComponent,
  ]
})
export class SharedModule { }
