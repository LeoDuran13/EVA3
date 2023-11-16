import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//crea vista
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const redireccionarauth = () => redirectUnauthorizedTo(['/auth']);

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'sing-up',
    redirectTo: 'sing-up',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    redirectTo: 'recuperar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },



  {
    path: 'auth',
    //protector
    //canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarauth},

    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'inicio',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarauth},
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarauth},
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./pages/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },  {
    path: 'lector-qr',
    loadChildren: () => import('./pages/lector-qr/lector-qr.module').then( m => m.LectorQRPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
