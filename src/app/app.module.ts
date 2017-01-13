import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlowDragAndDropDirective } from './flow-drag-and-drop.directive';
import { SelectBoxComponentComponent } from './select-box-component/select-box-component.component';
import { DocumentService } from './document.service';

@NgModule({
  declarations: [
    AppComponent,
    FlowDragAndDropDirective,
    SelectBoxComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
