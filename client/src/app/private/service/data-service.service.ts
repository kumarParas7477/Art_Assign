import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataServiceService {
  constructor(private _http: HttpClient) { }

  public getStates = (): Observable<any> => {
    //returning Observable for multiple value
    return this._http.get<any>(
      "http://localhost:8080/cities"
    );
  };

  public getLatLng = (city): Observable<any> => {
    //getting latlng from google geocode api for marking marker.
    return this._http.get<any>(
      `http://localhost:8080/cityinfo/${city}`
    );
  };
}
