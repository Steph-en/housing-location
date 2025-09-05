import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";

const routeConfig: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent),
        title: 'Details Page'
    }
];

export default routeConfig;