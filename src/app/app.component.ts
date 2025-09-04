import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
    <main>
      <header class="brand-name">
        <a href="">
          <img
            src="/assets/logo.svg"
            alt="logo"
            class="brand-logo"
            aria-hidden="true"
          />
        </a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.component.css"],
  imports: [RouterModule]

})
export class AppComponent {
  title = 'homes';
}
