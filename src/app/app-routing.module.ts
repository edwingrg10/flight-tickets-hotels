import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTicketsHotelsComponent } from './shared/components/form-tickets-hotels/form-tickets-hotels.component';

const routes: Routes = [
  { path: '', component: FormTicketsHotelsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
