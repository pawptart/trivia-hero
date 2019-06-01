import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'menu/:id', component: MenuComponent },
  { path: 'game/:id/:amount/:difficulty/:type', component: GameComponent },
  { path: 'home', component: AboutComponent },
  { path: 'scoreboard', component: ScoreboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
