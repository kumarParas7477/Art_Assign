import { } from "googlemaps";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataServiceService } from "../../service/data-service.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  @ViewChild("map", { static: true }) mapElement: any;
  map: google.maps.Map;

  constructor(private _dataService: DataServiceService) { }
  states = new Set();
  sortedstates = new Array<string>();
  cities = new Set();
  sortedCities = new Array<string>();
  city: boolean;
  data: any;
  selectedState: string;

  mapProperties: {};
  ngOnInit() {
    // this._dataService.getMap();

    this.city = false;
    this._dataService.getStates().subscribe((data: any) => {
      console.log(data);
      this.data = data;
      data.map((datas: any) => {
        this.states.add(datas.State); //getting states from rest api
      });
    });

    this.mapProperties = {
      center: new google.maps.LatLng(22.4674, 78.4346),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map( //defining map
      this.mapElement.nativeElement,
      this.mapProperties
    );
  }
  getLatLng = (city: string) => {

    //getting latlng from google geocode api to mark that place
    this._dataService
      .getLatLng(city)
      .subscribe(
        (data: any) => {
          const position = new google.maps.LatLng(
            data.results[0].geometry.location.lat,
            data.results[0].geometry.location.lng
          );
          let marker = new google.maps.Marker({
            //setting marker and info
            position,
            title:
              city +
              " " +
              "lat:" +
              data.results[0].geometry.location.lat +
              " " +
              "lng:" +
              data.results[0].geometry.location.lng
          });
          marker.setMap(this.map);
        },
        err => console.log("city name is not correct")
      );
  };

  getCities = (state: string) => {
    //getting cities from the prefetched states data fetched
    //getting cities by passing state name
    this.selectedState = state;

    this.cities.clear();
    this.data.map((data: any) => {
      if (data.State === state) {
        this.cities.add(data.City);
      }
    });

    this.map = new google.maps.Map( //reinitiating map
      this.mapElement.nativeElement,
      this.mapProperties
    );
    this.city = true;
  };
}
