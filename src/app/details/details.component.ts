import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: ` 
  <ng-container *ngIf="housingLocation$ | async as housingLocation; else loading">
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
              Does this location have wifi : {{ housingLocation?.wifi ? 'Yes' : 'No' }}
            </li>
            <li class="listing-laundry">
              Does this location have laundry : {{ housingLocation?.laundry ? 'Yes' : 'No' }}
            </li>
          </ul>
        </div>
        <div class="listing-apply">
          <h2 class="listing-apply-heading">Apply now to live here</h2>
          <!-- <button class="primary">Apply Now</button> -->
          <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input id="first-name" type="text" formControlName="firstName" />
            <div *ngIf="applyForm.controls['firstName'].invalid && applyForm.controls['firstName'].touched">
              First name is required.
            </div>

            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" formControlName="lastName" />
            <div *ngIf="applyForm.controls['lastName'].invalid && applyForm.controls['lastName'].touched">
              Last name is required.
            </div>

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" />
            <div *ngIf="applyForm.controls['email'].invalid && applyForm.controls['email'].touched">
              Please enter a valid email.
            </div>

            <button type="submit" class="primary" [disabled]="applyForm.invalid || isSubmitting">
              {{ isSubmitting ? "Submitting..." : "Apply Now" }}
            </button>
            <div *ngIf="applicationSuccess" class="success-message">
              Application submitted successfully!
            </div>
            <div *ngIf="applicationError" class="error-message">
              Failed to submit application. Please try again.
            </div>
          </form>
        </div>
      </section>
    </article>
  </ng-container>
  <ng-template #loading>
    <p>Loading details...</p>
  </ng-template>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  housingLocation$!: Observable<HousingLocation | undefined>;

  applyForm = new FormGroup({
    firstName: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  constructor(private readonly route: ActivatedRoute, private readonly housingService: HousingService) { }

  ngOnInit(): void {
    this.housingLocation$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.housingService.getHousingLocationById(id);
      })
    );
  }

  applicationSuccess = false;
  applicationError = false;
  isSubmitting = false;

  submitApplication() {
    if (this.applyForm.valid) {
      this.isSubmitting = true;
      const { firstName, lastName, email } = this.applyForm.value;
      this.housingService.submitApplication(firstName!, lastName!, email!).subscribe({
        next: () => {
          this.applicationSuccess = true;
          this.applicationError = false;
          this.applyForm.reset();
          setTimeout(() => this.applicationSuccess = false, 3000);
        },
        error: () => {
          this.applicationError = true;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
