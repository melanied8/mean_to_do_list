import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonCreateTaskComponent } from './components/button-create-task/button-create-task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LucideAngularModule, Pen } from 'lucide-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from './components/dialog-create-task/dialog-create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ButtonCreateTaskComponent,
    DialogCreateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    LucideAngularModule.pick({ Pen }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
