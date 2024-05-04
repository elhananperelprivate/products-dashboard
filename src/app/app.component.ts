import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsBoardComponent } from './features';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log(window.innerHeight, window.innerWidth);
  }
}
