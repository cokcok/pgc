import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class ConfigserviceProvider {
  public ip: string = "http://www.rubber.co.th/pgc";
  public ip_doc: string = "http://www.rubber.co.th/pgc/doc/";
  public ip_doaechkidcard: string = "https://chem.doae.go.th/api/farmer/rubber";
  public ip_doa: string = "http://203.154.28.235/doa_exam/farmer";
  ///203.154.28.235,103.208.27.224
  constructor(public http: HttpClient,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }



  delAlert(textalert: string) {
    let alert = this.alertCtrl.create({
      title: 'ต้องการ' + textalert + 'ใช่หรือไม่??',
      buttons: [
        {
          text: 'ใช่',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }, {
          text: 'ไม่ใช่',
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        }
      ]
    });
    return alert;
  }

  loadingAlert() {
    let loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    //loader.present();
    return loader;
  }

  ChkformAlert(text: string) {
    let alert = this.alertCtrl.create({
      title: text, buttons: ['ตกลง']
    });
    return alert;
  }



  prov_data = [
     {prov_code: "10", prov_name: "กรุงเทพมหานคร"},
     {prov_code: "11", prov_name: "สมุทรปราการ"},
     {prov_code: "12", prov_name: "นนทบุรี"},
     {prov_code: "13", prov_name: "ปทุมธานี"},
     {prov_code: "14", prov_name: "พระนครศรีอยุธยา"},
     {prov_code: "15", prov_name: "อ่างทอง"},
     {prov_code: "16", prov_name: "ลพบุรี"},
     {prov_code: "17", prov_name: "สิงห์บุรี"},
     {prov_code: "18", prov_name: "ชัยนาท"},
     {prov_code: "19", prov_name: "สระบุรี"},
     {prov_code: "20", prov_name: "ชลบุรี"},
     {prov_code: "21", prov_name: "ระยอง"},
     {prov_code: "22", prov_name: "จันทบุรี"},
     {prov_code: "23", prov_name: "ตราด"},
     {prov_code: "24", prov_name: "ฉะเชิงเทรา"},
     {prov_code: "25", prov_name: "ปราจีนบุรี"},
     {prov_code: "26", prov_name: "นครนายก"},
     {prov_code: "27", prov_name: "สระแก้ว"},
     {prov_code: "30", prov_name: "นครราชสีมา"},
     {prov_code: "31", prov_name: "บุรีรัมย์"},
     {prov_code: "32", prov_name: "สุรินทร์"},
     {prov_code: "33", prov_name: "ศรีสะเกษ"},
     {prov_code: "34", prov_name: "อุบลราชธานี"},
     {prov_code: "35", prov_name: "ยโสธร"},
     {prov_code: "36", prov_name: "ชัยภูมิ"},
     {prov_code: "37", prov_name: "อำนาจเจริญ"},
     {prov_code: "38", prov_name: "บึงกาฬ"},
     {prov_code: "39", prov_name: "หนองบัวลำภู"},
     {prov_code: "40", prov_name: "ขอนแก่น"},
     {prov_code: "41", prov_name: "อุดรธานี"},
     {prov_code: "42", prov_name: "เลย"},
     {prov_code: "43", prov_name: "หนองคาย"},
     {prov_code: "44", prov_name: "มหาสารคาม"},
     {prov_code: "45", prov_name: "ร้อยเอ็ด"},
     {prov_code: "46", prov_name: "กาฬสินธุ์"},
     {prov_code: "47", prov_name: "สกลนคร"},
     {prov_code: "48", prov_name: "นครพนม"},
     {prov_code: "49", prov_name: "มุกดาหาร"},
     {prov_code: "50", prov_name: "เชียงใหม่"},
     {prov_code: "51", prov_name: "ลำพูน"},
     {prov_code: "52", prov_name: "ลำปาง"},
     {prov_code: "53", prov_name: "อุตรดิตถ์"},
     {prov_code: "54", prov_name: "แพร่"},
     {prov_code: "55", prov_name: "น่าน"},
     {prov_code: "56", prov_name: "พะเยา"},
     {prov_code: "57", prov_name: "เชียงราย"},
     {prov_code: "58", prov_name: "แม่ฮ่องสอน"},
     {prov_code: "60", prov_name: "นครสวรรค์"},
     {prov_code: "61", prov_name: "อุทัยธานี"},
     {prov_code: "62", prov_name: "กำแพงเพชร"},
     {prov_code: "63", prov_name: "ตาก"},
     {prov_code: "64", prov_name: "สุโขทัย"},
     {prov_code: "65", prov_name: "พิษณุโลก"},
     {prov_code: "66", prov_name: "พิจิตร"},
     {prov_code: "67", prov_name: "เพชรบูรณ์"},
     {prov_code: "70", prov_name: "ราชบุรี"},
     {prov_code: "71", prov_name: "กาญจนบุรี"},
     {prov_code: "72", prov_name: "สุพรรณบุรี"},
     {prov_code: "73", prov_name: "นครปฐม"},
     {prov_code: "74", prov_name: "สมุทรสาคร"},
     {prov_code: "75", prov_name: "สมุทรสงคราม"},
     {prov_code: "76", prov_name: "เพชรบุรี"},
     {prov_code: "77", prov_name: "ประจวบคีรีขันธ์"},
     {prov_code: "80", prov_name: "นครศรีธรรมราช"},
     {prov_code: "81", prov_name: "กระบี่"},
     {prov_code: "82", prov_name: "พังงา"},
     {prov_code: "83", prov_name: "ภูเก็ต"},
     {prov_code: "84", prov_name: "สุราษฎร์ธานี"},
     {prov_code: "85", prov_name: "ระนอง"},
     {prov_code: "86", prov_name: "ชุมพร"},
     {prov_code: "90", prov_name: "สงขลา"},
     {prov_code: "91", prov_name: "สตูล"},
     {prov_code: "92", prov_name: "ตรัง"},
     {prov_code: "93", prov_name: "พัทลุง"},
     {prov_code: "94", prov_name: "ปัตตานี"},
     {prov_code: "95", prov_name: "ยะลา"},
     {prov_code: "96", prov_name: "นราธิวาส"}
  ];

  month = [
    {id : '01', name:'มกราคม'},
    {id : '02', name:'กุมภาพันธ์'},
    {id : '03', name:'มีนาคม'},
    {id : '04', name:'เมษายน'},
    {id : '05', name:'พฤษภาคม'},
    {id : '06', name:'มิถุนายน'},
    {id : '07', name:'กรกฎาคม'},
    {id : '08', name:'สิงหาคม'},
    {id : '09', name:'กันยายน'},
    {id : '10', name:'ตุลาคม'},
    {id : '11', name:'พฤศจิกายน'},
    {id : '12', name:'ธันวาคม'}

  ]

}
