import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations:[
        AppComponent,
        EditModalComponent
    ],
    imports:[
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers:[],
    bootstrap:[
        AppComponent,
    ],
})

export class AppModule{}