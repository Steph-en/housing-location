import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housing-location";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="listing" *ngIf="housingLocation as hl">
      <img
        [src]="hl.photo"
        alt="Exterior photo of {{ hl.name }}"
        class="listing-photo" 
        loading="lazy"
      />
      <h2 class="listing-heading">
        {{ hl.name }}
      </h2>
      <p class="listing-location">
        {{ hl.city }}, {{ hl.state }}
      </p>
      <a [routerLink]="['details', hl.id]">Learn more</a>
    </article>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housingLocation: HousingLocation | null = null;
}
