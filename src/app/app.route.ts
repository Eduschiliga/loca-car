import { PreloadAllModules, provideRouter, Routes, withPreloading } from '@angular/router';
import {authGuard, authGuardCanLoad} from "./guards/auth.guard";
import {Pag404Component} from "./pag404/pag404.component";

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.route').then((r) => r.loginRoute),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then((r) => r.homeRoute),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'publicacoesUsuario',
    loadChildren: () => import('./minhas-publicacoes/minhas-publicacoes.route').then((r) => r.MINHAS_PUBLICACOES),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.route').then((r) => r.PERFIL_ROUTES),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.route').then((r) => r.PUBLICAR_ROUTE),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'Configurações',
    loadChildren: () => import('./configuracoes/configuracoes.route').then((r) => r.CONFIGURACOES_ROUTE),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.route').then((r) => r.SOBRE_ROUTES),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.route').then(m => m.folderRoutes),
    canActivate: [authGuard],
    canLoad: [authGuardCanLoad],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: Pag404Component,
  }
];

export const appRouting = provideRouter(routes, withPreloading(PreloadAllModules));
