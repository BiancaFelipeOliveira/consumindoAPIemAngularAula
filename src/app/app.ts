import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tela } from './componentes/tela/tela';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tela],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}
