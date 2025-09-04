import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";
import { Observable, map, startWith } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <section>
      <form (submit)="$event.preventDefault()">
        <input type="text" placeholder="Filter by City" #filter />
        <button class="primary" type="button" (click)="applyFilter(filter.value)">
          Search
        </button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocations$ | async"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
  imports: [CommonModule, HousingLocationComponent],
})
export class HomeComponent {
  private housingService = inject(HousingService);

  // observable for the full list
  housingLocations$ = this.housingService.getAllHousingLocations();

  // observable for the filtered list
  filteredLocations$: Observable<HousingLocation[]> = this.housingLocations$;

  applyFilter(text: string) {
    this.filteredLocations$ = this.housingLocations$.pipe(
      map((locations) =>
        !text
          ? locations
          : locations.filter((location) =>
              location.city.toLowerCase().includes(text.toLowerCase())
            )
      ),
      startWith([]) // optional: ensures the stream starts with an empty array
    );
  }
}
