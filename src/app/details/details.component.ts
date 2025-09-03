import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: ` 
  <article class="listing">
    <section class="image">
      <img
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        class="listing-photo"
      />
    </section>
    <section class="details">
      <div class="listing-description">
        <h2 class="listing-heading">
          {{ housingLocation?.name }}
        </h2>
        <p class="listing-location">
          Location : {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
        <h2 class="listing-description-heading">About this Housing Location</h2>
        <ul>
          <li class="listing-unit">
            Units Available : {{ housingLocation?.availableUnits }}
          </li>
          <li class="listing-wifi">
            Does this location have wifi : {{ housingLocation?.wifi }}
          </li>
          <li class="listing-laundry">
            Does this location have laundry : {{ housingLocation?.laundry }}
          </li>
        </ul>
      </div>
      <div class="listing-apply">
        <h2 class="listing-apply-heading">Apply now to live here</h2>
        <!-- <button class="primary">Apply Now</button> -->
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />

          <button type="submit" class="primary">Apply Now</button>
        </form>
      </div>
    </section>
  </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: HousingLocation | undefined) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
