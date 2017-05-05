import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlowDragAndDropDirective } from './flow-drag-and-drop.directive';
import { SelectBoxComponent } from './select-box/select-box.component';
import { DocumentService } from './document.service';
import { ShapeComponent } from './shape/shape.component';
import { ShapeSelectorComponent } from './shape-selector/shape-selector.component';
import { ConstantsService } from "app/constants.service";
import { ShapeSelectorListComponent } from './shape-selector-list/shape-selector-list.component';
import { ToggleShapeSelectorStatusDirective } from './toggle-shape-selector-status.directive';

@NgModule({
  declarations: [
    AppComponent,
    FlowDragAndDropDirective,
    SelectBoxComponent,
    ShapeComponent,
    ShapeSelectorComponent,
    ShapeSelectorListComponent,
    ToggleShapeSelectorStatusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DocumentService, ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
