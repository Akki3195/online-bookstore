import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { GetBookListService } from './service/get-book-list.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'addNewBook',
        component: AddNewBookComponent
    },
    {
        path: 'bookList',
        component: BookListComponent
    },
    {
        path: 'viewBook/:id',
        component: ViewBookComponent
    },
    {
        path: 'editBook/:id',
        component: EditBookComponent
    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);