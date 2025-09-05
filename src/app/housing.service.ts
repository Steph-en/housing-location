import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HousingLocation } from "./housing-location";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  private resource = 'locations';
  private baseUrl = environment.apiBaseUrl;

  httpClient = inject(HttpClient);

  constructor() {}

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.httpClient
      .get<HousingLocation[]>(`${this.baseUrl}/${this.resource}`)
      .pipe(
        catchError((error) => {
          console.error("Error fetching housing locations:", error);
          return of([]); // fallback to empty array
        })
      );
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.httpClient
      .get<HousingLocation>(`${this.baseUrl}/${this.resource}/${id}`)
      .pipe(
        catchError((error) => {
          console.error("Error fetching housing location by ID:", error);
          return of(undefined); // fallback to undefined
        })
      );
  }

  submitApplication(firstName: string, lastName: string, email: string): Observable<any> {
    const application = { firstName, lastName, email };
    return this.httpClient
      .post(`${this.baseUrl}/applications`, application)
      .pipe(catchError((error) => {
        console.error("Error submitting application:", error);
        return of({ success: false, error });
      })
    );
  }
}
