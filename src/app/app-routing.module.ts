import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'game/:id', component: GameComponent },
  { path: 'home', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
