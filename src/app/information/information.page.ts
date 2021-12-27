import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage  {

  image = 'image1';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Bild auswählen'
  };

  constructor() { }

  
}
