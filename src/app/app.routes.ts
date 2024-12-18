import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { EleitorListComponent } from './components/eleitor/eleitor-list/eleitor-list.component';
import { EleitorFormComponent } from './components/eleitor/eleitor-form/eleitor-form.component';
import { CandidatoFormComponent } from './components/candidato/candidato-form/candidato-form.component';
import { CandidatoListComponent } from './components/candidato/candidato-list/candidato-list.component';
import { ApuracaoListComponent } from './components/apuracao/apuracao-list/apuracao-list.component';
import { UrnaComponent } from './components/urna/urna.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "votar", component: UrnaComponent},
    {
        path: 'home', component: HomeComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'eleitor', component: EleitorListComponent},
            {path: 'eleitor/novo', component: EleitorFormComponent},
            {path: "eleitor/edit/:id", component: EleitorFormComponent},
            {path: 'candidato', component: CandidatoListComponent},
            {path: "candidato/novo", component: CandidatoFormComponent},
            {path: "candidato/edit/:id", component: CandidatoFormComponent},
            {path: "apuracao", component: ApuracaoListComponent},
        ]
    },
];