import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { ConfigserviceProvider } from '../../providers/configservice/configservice';
import { Login1Page } from '../login1/login1';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('myForm') mytemplateForm: NgForm;
  id: any; idcard: any; item_data_land = [];total_area_doa:any;
  hideMe: any = false; hideMe1: any = false; hideMe2: any = false;   hideMe3 :any = false;   hideMe4 :any = false;hideMe5 :any = false;
  type_sql: any; type_status_name: any;item_data_land_true=[];fname:any;lname:any;isenabled: any = false;type_person:any;
  type_status: any; VCfland: any; VCfland1: any; training_type: any; item_training_type: any;
  name: any; tel: any; total_area1: any; total_area2: any; total_area3: any; item_province: any; province: any; item_month: any; month: any; item_year: any; years: any = []; year: any; Quiz_Place: any; item_Quiz_Place: any;
  portsSubscription: Subscription;
  currentTime = new Date().getFullYear() + 543;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};

  constructor(public modalCtrl: ModalController,private iab: InAppBrowser,
    public login: LoginserviceProvider, public config: ConfigserviceProvider,
    public navCtrl: NavController, public navParams: NavParams) {


  }

  Cfland() {
    if (this.VCfland === true) {
      this.hideMe1 = true;
    }
    else {
      this.hideMe1 = false;
    }
  }

  Cfland1(myForm) {
    if (this.VCfland1 === true) {
      if (typeof myForm.tel === 'undefined' || myForm.tel === null || myForm.tel === ''  ) {
        this.VCfland1 = false;
        let alert = this.config.ChkformAlert('กรุณาระบุเบอร์ติดต่อ');
        alert.present();
        return false;
      }
      //console.log(myForm);
      myForm.type_sql = 'insertdoa';
      this.navCtrl.push(Login1Page, {
        'data2': myForm
      });

    }
  }


  ionViewDidEnter() {
    this.load_item_training_type();
    this.type_person = '1';
    //this.item_province = this.config.prov_data;
    this.item_month = this.config.month;
    for (let i = this.currentTime; i <= this.currentTime + 2; i++) {
      this.years.push({ id: i - 543, years: i });
    }
    this.item_year = this.years;
    let yy = this.item_year[0].years;
    let itemyy = this.item_year.filter(function (item2) {
      return item2.years === yy;
    })[0];
    this.year = itemyy;



  }

  load_item_training_type() {
     this.login.getroom(null,null,null, 'gettrainingtype').subscribe(
      (data) => {
        if (data !== null) {
          this.item_training_type = data.data_detail;
        }
      }
    );
  }




  Login(myForm) {
    this.refresh();
    this.name = null;this.type_status_name = null;this.tel = null;
    if (typeof myForm.idcard === 'undefined' || myForm.idcard === null || myForm.idcard === '') {
      let alert = this.config.ChkformAlert('กรุณาระบุข้อมูลให้ครบถ้วน');
      alert.present();
      return false;
    }

    let loader = this.config.loadingAlert();
    loader.present();
    this.login.loginchkidcarddoae(myForm.idcard).subscribe(
      (datachkidcard) => {
          if (datachkidcard.exam_status === 0 && datachkidcard.register_status === 0  )
          {
            console.log('a');
            this.login.login(myForm.idcard,myForm.type_person).subscribe( //เคสครั้งแรกปกติ
              (data) => {
                //this.navCtrl.setRoot(HomepagePage);
                //console.log(data);
                if (data !== null) {
                  if (data.status === 0){
                    this.item_data_land = data.data_detail;
                    this.type_status = 1; this.type_status_name = 'มีสิทธิ์ซื้อสารเคมี'
                    this.name = data.name;
                    this.tel = data.tel;
                    this.lname = data.lname;
                    this.fname = data.fname;
                    this.hideMe = true; this.hideMe4 = true;
                    let total_area = 0;
                    //console.log(this.item_data_land);
                    for (var i = 0; i < this.item_data_land.length; i++) {

                      if (data.data_detail[i]['FLG'] === '0')
                      {
                         this.item_data_land_true.push({
                          LAND_NAME: this.item_data_land[i]['LAND_NAME'],
                          PLANT_YR: this.item_data_land[i]['PLANT_YR'],
                          RAI: this.item_data_land[i]['RAI'],
                          NGAN: this.item_data_land[i]['NGAN'],
                          WAA: this.item_data_land[i]['WAA'],
                          LAND_TYPE: this.item_data_land[i]['LAND_TYPE'],
                          NUM_APP: this.item_data_land[i]['NUM_APP'],
                          IDCARD: this.item_data_land[i]['IDCARD'],
                          F_MAIN_ID: this.item_data_land[i]['F_MAIN_ID'],
                          LAND_PERSON: this.item_data_land[i]['LAND_PERSON']
                        })

                        total_area += Number((data.data_detail[i]['RAI'])) + Number((data.data_detail[i]['NGAN'] * 0.25)) + Number((data.data_detail[i]['WAA'] * 0.0025));

                      }
                    }
                    if (total_area > 0)
                    {
                      this.hideMe3 = true;
                      this.total_area1 = Math.floor(total_area);
                      this.total_area2 = Math.floor(Number((total_area % 1) * 100 / 25));
                      this.total_area3 = Math.floor(Number(((total_area * 10000) % 2500) / 25));
                    }
                    else
                    {
                      this.hideMe3 = false;
                      this.hideMe1 = false;
                      this.hideMe2 = false;
                      //this.hideMe4 = false;
                    }
                  }
                  else if( data.status === 1 )
                  {
                      this.item_data_land = data.data_detail;
                      this.navCtrl.push(Login1Page, {
                       'data1':  this.item_data_land
                     });

                     /*  let tModal = this.modalCtrl.create(Login1Page, {
                        'data1':this.item_data_land
                      }, { cssClass: "my-modal" });
                      tModal.present(); */
                    }
                }
                else {
                  this.hideMe = false;
                  this.hideMe3 = false;
                  this.hideMe1 = false;
                  this.hideMe2 = false;
                  this.hideMe4 = false;
                  let alert = this.config.ChkformAlert('ไม่พบข้อมูลขึ้นทะเบียนเกษตรกร กยท.');
                  alert.present();
                }
              }
            );
          }
          else
          {
            this.login.loginchkidcarddoa(myForm.idcard).subscribe( //เคสทีสมัครกับ กสก.
              (data) => {
                if (data.results !== null)
                {
                  //console.log(data);
                  this.hideMe = true;
                  this.name = datachkidcard.name;
                  this.type_status_name = 'มีการสมัครจากกรมส่งเสริมการเกษตร';
                  this.hideMe5 = true;
                  this.login.login(myForm.idcard,myForm.type_person).subscribe(
                    (data) => {
                      if (data !== null) {
                        if (data.status === 0){
                          this.item_data_land = data.data_detail;
                          this.tel = data.tel;
                          this.lname = data.lname;
                          this.fname = data.fname;
                          this.hideMe = true; this.hideMe4 = true;
                          this.total_area_doa = 0;
                          for (var i = 0; i < this.item_data_land.length; i++) {

                            if (data.data_detail[i]['FLG'] === '0')
                            {
                               this.item_data_land_true.push({
                                LAND_NAME: this.item_data_land[i]['LAND_NAME'],
                                PLANT_YR: this.item_data_land[i]['PLANT_YR'],
                                RAI: this.item_data_land[i]['RAI'],
                                NGAN: this.item_data_land[i]['NGAN'],
                                WAA: this.item_data_land[i]['WAA'],
                                LAND_TYPE: this.item_data_land[i]['LAND_TYPE'],
                                NUM_APP: this.item_data_land[i]['NUM_APP'],
                                IDCARD: this.item_data_land[i]['IDCARD'],
                                F_MAIN_ID: this.item_data_land[i]['F_MAIN_ID'],
                                LAND_PERSON: this.item_data_land[i]['LAND_PERSON']
                              })

                              this.total_area_doa += Number((data.data_detail[i]['RAI'])) + Number((data.data_detail[i]['NGAN'] * 0.25)) + Number((data.data_detail[i]['WAA'] * 0.0025));

                            }
                          }
                          if (this.total_area_doa > 0)
                          {

                            this.total_area1 = Math.floor(this.total_area_doa);
                            this.total_area2 = Math.floor(Number((this.total_area_doa % 1) * 100 / 25));
                            this.total_area3 = Math.floor(Number(((this.total_area_doa * 10000) % 2500) / 25));
                          }
                          else
                          {
                            //this.type_status = 2;
                            //this.hideMe5 = false;
                            this.hideMe1 = false;
                            this.hideMe2 = false;
                          }
                        }
                        else if( data.status === 1 )
                        {
                            this.item_data_land = data.data_detail;
                            this.navCtrl.push(Login1Page, {
                             'data1':  this.item_data_land
                           });

                          }
                      }
                      else {
                        this.hideMe = false;
                        this.hideMe3 = false;
                        this.hideMe1 = false;
                        this.hideMe2 = false;
                        this.hideMe4 = false;
                        this.hideMe5 = false;
                        let alert = this.config.ChkformAlert('ไม่พบข้อมูลขึ้นทะเบียนเกษตรกร กยท.');
                        alert.present();
                      }
                    }
                  );
                }
                else
                {
                  //console.log('notfound');
                  this.hideMe = true;
                  this.hideMe3 = false;
                  this.hideMe1 = false;
                  this.hideMe2 = false;
                  this.hideMe4 = false;
                  this.type_status_name = 'มีการสมัครจากกรมส่งเสริมการเกษตร'
                  this.type_status = 2;
                  this.name = datachkidcard.name;
                }
              }
            );



           // this.hideMe4 = true;
          }
      },
      (error) => {
        console.log(JSON.stringify(error));
        //let alert = this.config.ChkformAlert('มีปัญหากรุณาติดต่อ เจ้าหน้าที่ กยท.');
        //alert.present();
        this.login.login(myForm.idcard,myForm.type_person).subscribe( //เคสครั้งแรกปกติ
          (data) => {
            console.log(data);
            if (data !== null) {
              if (data.status === 0){
                this.item_data_land = data.data_detail;
                this.type_status = 1; this.type_status_name = 'มีสิทธิ์ซื้อสารเคมี'
                this.name = data.name;
                this.tel = data.tel;
                this.lname = data.lname;
                this.fname = data.fname;
                this.hideMe = true; this.hideMe4 = true;
                let total_area = 0;
                //console.log(this.item_data_land);
                for (var i = 0; i < this.item_data_land.length; i++) {

                  if (data.data_detail[i]['FLG'] === '0')
                  {
                     this.item_data_land_true.push({
                      LAND_NAME: this.item_data_land[i]['LAND_NAME'],
                      PLANT_YR: this.item_data_land[i]['PLANT_YR'],
                      RAI: this.item_data_land[i]['RAI'],
                      NGAN: this.item_data_land[i]['NGAN'],
                      WAA: this.item_data_land[i]['WAA'],
                      LAND_TYPE: this.item_data_land[i]['LAND_TYPE'],
                      NUM_APP: this.item_data_land[i]['NUM_APP'],
                      IDCARD: this.item_data_land[i]['IDCARD'],
                      F_MAIN_ID: this.item_data_land[i]['F_MAIN_ID'],
                      LAND_PERSON: this.item_data_land[i]['LAND_PERSON']
                    })

                    total_area += Number((data.data_detail[i]['RAI'])) + Number((data.data_detail[i]['NGAN'] * 0.25)) + Number((data.data_detail[i]['WAA'] * 0.0025));

                  }
                }
                if (total_area > 0)
                {
                  this.hideMe3 = true;
                  this.total_area1 = Math.floor(total_area);
                  this.total_area2 = Math.floor(Number((total_area % 1) * 100 / 25));
                  this.total_area3 = Math.floor(Number(((total_area * 10000) % 2500) / 25));
                }
                else
                {
                  this.hideMe3 = false;
                  this.hideMe1 = false;
                  this.hideMe2 = false;
                  //this.hideMe4 = false;
                }
              }
              else if( data.status === 1 )
              {
                  this.item_data_land = data.data_detail;
                  this.navCtrl.push(Login1Page, {
                   'data1':  this.item_data_land
                 });
                }

            }
            else {
              this.hideMe = false;
              this.hideMe3 = false;
              this.hideMe1 = false;
              this.hideMe2 = false;
              this.hideMe4 = false;
              let alert = this.config.ChkformAlert('ไม่พบข้อมูลขึ้นทะเบียนเกษตรกร กยท.');
              alert.present();
            }
          }
        );

        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
 /*     */
  }

  Search_Place(myForm) { // fn นี้ไม่ได้ใช้แล้ว
    // console.log(myForm);
    if (typeof myForm.training_type === 'undefined' || typeof myForm.year === 'undefined' || typeof myForm.month === 'undefined' || typeof myForm.province === 'undefined') {
      let alert = this.config.ChkformAlert('กรุณาระบุเงื่อนไขในการค้นหาให้ครบ');
      alert.present();
      return false;
    }

    let loader = this.config.loadingAlert();
    loader.present();
    this.login.getroom(myForm.training_type.training_code, myForm.year.id, myForm.month.id, myForm.province.prov_code).subscribe(
      (data) => {
        //this.navCtrl.setRoot(HomepagePage);
        //console.log(data);
        if (data !== null) {
          this.Quiz_Place = null;
          this.item_Quiz_Place = data.data_detail;
          this.hideMe2 = true;
          this.type_sql = 'insert';
          let alert = this.config.ChkformAlert('เลือกสถานที่ในการอบรม/สอบ');
          alert.present();
        }
        else {
          this.Quiz_Place = null;
          this.hideMe2 = false;
          let alert = this.config.ChkformAlert('ไม่พบช่วงเวลาหรือสถานที่ในการอบรม/สอบ');
          alert.present();
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
  }

  Rent_Place(myForm) {

    if (typeof myForm.Quiz_Place === 'undefined'|| myForm.Quiz_Place === null || myForm.Quiz_Place === '') {
      let alert = this.config.ChkformAlert('กรุณาเลือกเวลาอบรม');
      alert.present();
      return false;
    }

    if (typeof myForm.tel === 'undefined' || myForm.tel === null || myForm.tel === ''  ) {
      let alert = this.config.ChkformAlert('กรุณาระบุเบอร์ติดต่อ');
      alert.present();
      return false;
    }
    myForm.type_sql = 'insert';
    this.navCtrl.push(Login1Page, {
      'data': myForm
    });

  }

  openWithInAppBrowser(url){
    let target = "_system";
    this.iab.create(this.config.ip_doc+url,target,this.options);
  }


  chk_room(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.province = undefined ;this.item_province = undefined;
    this.Quiz_Place = undefined ;this.item_Quiz_Place = undefined;
    this.isenabled = false;
    let loader = this.config.loadingAlert();
    loader.present();
    this.login.getroom(this.training_type.training_code,this.year.id,port.id,'getroom').subscribe(
      (data) => {
        if (data !== null) {
            this.item_province = data.data_detail;
            //this.hideMe2 = true;
        }
        else
        {
          this.hideMe2 = false;
          let alert = this.config.ChkformAlert('ไม่พบช่วงเวลาหรือสถานที่ในการอบรม/สอบ');
          alert.present();

        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
  }


  clear_room() {
    this.month = undefined;this.province= undefined;
    this.Quiz_Place= undefined;this.isenabled = false;
    //this.hideMe2 = false;
  }

  chk_roomdate(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    let port = event.value;
    this.Quiz_Place = undefined ;this.item_Quiz_Place = undefined;this.isenabled = false;
    let loader = this.config.loadingAlert();
    loader.present();
    this.login.getroomdate(this.training_type.training_code,this.year.id,this.month.id,port.dept_id,port.roomname,'getroomdate').subscribe(
      (data) => {
        if (data !== null) {
            this.item_Quiz_Place = data.data_detail;
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
  }

  chk_roomdate1() {
    this.isenabled = true;
  }

  refresh() {
    this.VCfland = false; this.VCfland1 = false; this.type_status = null;
    this.total_area1= null;this.total_area2=null;this.total_area3=null;
    this.clear_room(); this.hideMe = false;this.hideMe4 = false;this.hideMe1 = false;this.hideMe5=false;this.hideMe3=false
    this.training_type = undefined;this.item_data_land_true=[];
   }


   searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }
    //console.log(text);
    if (!text) {
      // Close any running subscription.

      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = this.item_Quiz_Place;
      event.component.endSearch();
      return;
    }
    event.component.items = this.filterPorts(text);
    event.component.endSearch();

    /* this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription.closed) {
        return;
      }

      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    }); */
  }


  filterPorts(text: string) {
    return this.item_Quiz_Place.filter((item) => {
      return (item.s_day.toLowerCase().indexOf(text.toLowerCase()) > -1);
    });
  }
}
