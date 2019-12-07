import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminDashboardRoutingModule } from "./admin-dashboard-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [CommonModule, AdminDashboardRoutingModule, ChartsModule]
})
export class AdminDashboardModule {}
