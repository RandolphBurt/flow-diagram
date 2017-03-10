import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlowDragAndDropDirective } from './flow-drag-and-drop.directive';
import { SelectBoxComponent } from './select-box/select-box.component';
import { DocumentService } from './document.service';
import { ShapeComponent } from './shape/shape.component';
import { ActivateShapeSelectorDirective } from './activate-shape-selector.directive';
import { DeactivateShapeSelectorDirective } from './deactivate-shape-selector.directive';

@NgModule({
  declarations: [
    AppComponent,
    FlowDragAndDropDirective,
    SelectBoxComponent,
    ShapeComponent,
    ActivateShapeSelectorDirective,
    DeactivateShapeSelectorDirective
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
