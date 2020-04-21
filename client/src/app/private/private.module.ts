import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrivateRoutingModule } from "./private-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, FormsModule, PrivateRoutingModule, NgbModule]
})
export class PrivateModule {}
