import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalAgreementRoutingModule,routedComponents } from './legal-agreement-routing.module';
import { FormsModule } from '@angular/forms';
import { FileSizePipe } from 'app/shared/pipes/filesize.pipe';

@NgModule({
  imports: [
    CommonModule,
    LegalAgreementRoutingModule,
    FormsModule,
  ],
  declarations: [...routedComponents],
  providers:[FileSizePipe]
})
export class LegalAgreementModule { }
