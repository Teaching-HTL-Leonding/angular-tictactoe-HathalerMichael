import { Routes } from '@angular/router';
import { TikTakToeComponent } from './tik-tak-toe/tik-tak-toe.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  {path: 'tik-tak-toe', component: TikTakToeComponent},
  {path: '', component: WelcomeComponent}
];
