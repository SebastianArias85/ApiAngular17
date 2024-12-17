import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticulosListComponent } from './articulos-list/articulos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArticulosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appApi';
}
