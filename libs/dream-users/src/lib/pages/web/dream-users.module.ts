import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DreamUserNgrxModule } from '@dilta/dream-users/src/lib/services/ngrx-dream-users.module';
import { DreamUserSharedModule } from '@dilta/dream-users/src/lib/shared/web/shared.module';
import { DreamUserWebRoutingModule } from './dream-users.routing';
import { UserBiodataProfileComponent } from './user-biodata-profile/user-biodata-profile.component';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';

@NgModule({
  imports: [CommonModule, DreamUserWebRoutingModule, DreamUserNgrxModule, DreamUserSharedModule],
  declarations: [ UserBioDataFormPageComponent, UserBiodataProfileComponent  ]
})
export class DreamUsersModule {}
