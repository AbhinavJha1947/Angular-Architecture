import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `<footer>&copy; 2023 MyApp</footer>`,
    styles: [`
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: auto;
    }
  `]
})
export class FooterComponent { }
