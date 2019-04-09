
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { BrandsComponent } from '@app/brands/brands.component';
import { RegisterComponent } from '@app/register/register.component';
import { AuthenticationGuard } from '@app/_auth/authentication.guard';

const appRoutes: Routes = [
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'brands' }
];

export const routing = RouterModule.forRoot(appRoutes);
