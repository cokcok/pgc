import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfigserviceProvider } from '../../providers/configservice/configservice';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { LoginPage } from '../login/login';



@IonicPage({
  priority: "low"
})
@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page {
  item_data: any; idcard: any; name: any; tel: any; total_area: any; type_training: any; hideMe: any = false; hideMe1: any = false;
  hideMe2: any = false;hideMe3: any = false;
  quiz_place: any; id: any; VCfrule: any;VCfrule1: any; isenabled: any = false;
  type_sql:any;result:any;amount_quota:any;
  constructor(public viewCtrl: ViewController, public login: LoginserviceProvider, public config: ConfigserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    //console.log(this.navParams.get('data'), this.navParams.get('data1'));
    if (this.navParams.get('data') !== undefined) { //สมัครใหม่
      this.item_data = this.navParams.get('data');
      this.idcard = this.item_data.idcard;
      this.name = this.item_data.name;
      this.tel = this.item_data.tel;
      this.total_area = this.item_data.total_area1 + '-' + this.item_data.total_area2 + '-' + this.item_data.total_area3;
      this.type_training = this.item_data.training_type.training_name;
      this.quiz_place =  this.item_data.province.roomname + ' '+ this.item_data.Quiz_Place.name;
      this.hideMe = true;
    }
    else if(this.navParams.get('data1') !== undefined)
    { // สมัครไปแล้ว
      this.item_data = this.navParams.get('data1');
      this.id = this.item_data[0].id;
      this.idcard = this.item_data[0].idcard;
      this.name = this.item_data[0].name;
      this.tel = this.item_data[0].tel;
      this.total_area = this.item_data[0].total_area1 + '-' + this.item_data[0].total_area2 + '-' + this.item_data[0].total_area3;
      this.type_training = this.item_data[0].training_name;
      this.quiz_place = this.item_data[0].quiz_place;
      this.result = this.item_data[0].result;
      if (this.result === 'สอบผ่าน'){
        this.hideMe2 = true;
      }
      else{
        this.hideMe1 = true;
      }
      this.amount_quota = this.item_data[0].amount_quota;
    }
    else if( this.navParams.get('data2') !== undefined)
    { //มาจากกสก.
      this.item_data = this.navParams.get('data2');
      this.idcard = this.item_data.idcard;
       this.name = this.item_data.name;
      this.tel = this.item_data.tel;
      this.type_training = 'กรมส่งเสริมการเกษตร';
      this.quiz_place = 'กรมส่งเสริมการเกษตร';
      this.total_area = this.item_data.total_area1 + '-' + this.item_data.total_area2 + '-' + this.item_data.total_area3;
      this.result = 'สอบผ่าน';
      this.hideMe3 = true;
    }

  }

  Cfrule() {
    if (this.VCfrule === true) {
      this.isenabled = true;
    }
    else {
      this.isenabled = false;
    }
  }

  save() {
    //console.log(this.item_data, this.type_sql);

    let loader = this.config.loadingAlert();
    loader.present();
    this.login.insert_regis(this.item_data, this.type_sql).subscribe(
      (feedback) => {
        if (feedback.status === 'ok') {
          this.id = feedback.id;
          //console.log(this.item_data);
          if(this.item_data.type_sql === 'insertdoa')
          {
            this.login.chkdoa_quota(this.item_data).subscribe(
              (data) => {
                //console.log(data);
                this.login.updatedoa_quota(data.AMOUNT,data.HIS_DATE,data.HIS_TIME,data.RESULTS,data.ROUND,data.SCORE,this.idcard).subscribe();
                let alert = this.config.ChkformAlert('มีสิทธิ์ซื้อสารเคมีในแปลงยางเรียบร้อยแล้ว');
                alert.present();
              })
          }
          else{
            let alert = this.config.ChkformAlert(feedback.message);
            alert.present();
          }


        } else {
          let alert = this.config.ChkformAlert(feedback.message);
          alert.present();
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
        loader.dismiss();
      },
      () => {
        loader.dismiss();
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }


  cancel(){
    console.log(this.id);
    let alert1 = this.config.delAlert('ลบ')
   alert1.present();
   alert1.onDidDismiss((data) => {
     if (data === true) {
       let loader = this.config.loadingAlert();
       loader.present();
       this.login.insert_regis(this.id, 'cancel').subscribe(
         (feedback) => {
           //console.log(JSON.stringify(feedback));
           if (feedback.status === 'ok') {
             let alert = this.config.ChkformAlert(feedback.message);
             alert.present();

           } else {
             let alert = this.config.ChkformAlert(feedback.message);
             alert.present();
           }
         },
         (error) => {
           console.log(JSON.stringify(error));
           loader.dismiss();
         },
         () => {
          loader.dismiss();
          this.navCtrl.setRoot(LoginPage);
         /*    setTimeout( () => {
            this.navCtrl.setRoot(LoginPage);
        }, 500); */


         }
       );
     }
   });

  }

  /* dismiss() {
    //let data;
    let data = { 'id': this.id };
    this.viewCtrl.dismiss(data);
  } */
}
