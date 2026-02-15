import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterLink, MatIconModule, MatIconButton],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
