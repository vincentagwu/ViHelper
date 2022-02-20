import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AudioService } from '../services/audio.service';
import {ActionSheetController} from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  markerData: any;
  marker: any;
  address: string;
  addressMarker: string;
  interval;
  latitude: number;
  longitude: number;
  curr_playing_file: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  currentLocationMarker: any = {
    lat: 0,
    lng: 0
  };

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private audio: AudioService,
    private fb: FormBuilder,
    public actionSheetController:ActionSheetController) {

      this.createDirectionForm();
  }


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadMap();
    this.audio.preload('hupe', '../../assets/sounds/car_horn.mp3');
    // this.interval = setInterval( () =>{
    //   this.loadMap();
    // }, 2000);
  }

  ionViewWillLeave(){
    //clearInterval(this.interval);
  }

  loadMap() {
    this.markerData = JSON.parse(localStorage.getItem('marker'));
    console.log(this.markerData);
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

      if(this.markerData != null){
        this.marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.markerData,
          icon: {
            url: '../assets/icon/Renault-Clio-grandtour.png', // url
            scaledSize: new google.maps.Size(40, 40), // scaled size
          }
        });
    
        let content = "<h4>Hier steht mein Auto!</h4>";
        this.addInfoWindow(this.marker, content);
        this.currentLocationMarker.lat = this.marker.lat;
        this.currentLocationMarker.lng = this.marker.lng;

        this.getAddressFromCoords(this.marker.lat,  this.marker.lng);
      }

      this.calculateAndDisplayRoute();
      this.directionsDisplay.setMap(this.map);
      

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

      if(this.markerData != null){
        this.nativeGeocoder.reverseGeocode(parseInt(this.markerData.lat), parseInt(this.markerData.lng), options)
        .then((result: NativeGeocoderResult[]) => {
          this.addressMarker = "";
          let responseAddress = [];
          for (let [key, value] of Object.entries(result[0])) {
            if (value.length > 0)
              responseAddress.push(value);

          }
          responseAddress.reverse();
          for (let value of responseAddress) {
            this.addressMarker += value + ", ";
          }
          this.addressMarker = this.address.slice(0, -2);
        })
        .catch((error: any) => {
          this.addressMarker = "Address Not Available!";
        });
    }
      

  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    //this.curr_playing_file = this.media.create("https://bigsoundbank.com/UPLOAD/mp3/0003.mp3");
    google.maps.event.addListener(marker, 'click', () => {
      this.audio.play('hupe');
      infoWindow.open(this.map, marker);
    });
  }


  addMarker(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = this.map.center.lat();
      this.longitude = this.map.center.lng();
    
    });
    
    if (this.marker != null) {
      this.marker.setMap(null);
    }

      
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: {
        url: '../assets/icon/Renault-Clio-grandtour.png', // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
      }
    });

    console.log(this.marker);

    console.log("marker: " + this.marker);
    localStorage.setItem('marker',JSON.stringify(this.map.getCenter()));
      
    let content = "<h4>Hier steht mein Auto!</h4>";
      
    this.addInfoWindow(this.marker, content);
    this.calculateAndDisplayRoute();
    
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

  calculateAndDisplayRoute() {
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: JSON.parse(localStorage.getItem('marker')),
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  async presentActionSheet() {
    
    let origin =  this.currentLocation.lat + ',' + this.currentLocation.lng;
    let destination =  this.latitude + ',' + this.longitude;
    console.log("origin: " + origin);
    console.log("destination: " + destination);
    //Leaving this empty for now, we will get back to this in the next step
    let actionLinks=[];

    actionLinks.push({
      text: 'Navigation in Google Maps öffnen',
      icon: 'navigate',
      handler: () => {
        window.open("https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=walking")
      }
    })

   
    //  //2B. Add Waze App
    // actionLinks.push({
    //   text: 'Waze App',
    //   icon: 'navigate',
    //   handler: () => {
    //     window.open("https://waze.com/ul?ll="+destination+"&travelmode=walking&navigate=yes&z=10");
    //   }
    // });

   //2C. Add a cancel button, you know, just to close down the action sheet controller if the user can't make up his/her mind
    actionLinks.push({
      text: 'Schließen',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // console.log('Cancel clicked');
      }
    })
    

    

    const actionSheet = await this.actionSheetController.create({
     header: 'Navigation',
     buttons: actionLinks
    });
    await actionSheet.present();
  }
}
