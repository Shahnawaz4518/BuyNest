import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderActions } from './layout/header-actions/header-actions';
import { ToastComponent } from './components/toast/toast';
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderActions, ToastComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
