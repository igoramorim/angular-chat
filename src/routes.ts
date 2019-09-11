import { FileUploadComponent } from './app/file-upload/file-upload.component';
import { Routes } from '@angular/router';
import { ChatroomComponent } from './app/chatroom/chatroom.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { IopageComponent } from './app/iopage/iopage.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'io', component: IopageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
