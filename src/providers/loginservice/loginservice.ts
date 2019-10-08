import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { data,datachkiddoae,datachkiddoa,datareturn_quota } from '../../model/datamodel';
import { ConfigserviceProvider } from '../configservice/configservice';
import { FeedBack } from '../../model/feedback';

@Injectable()
export class LoginserviceProvider {
  apiUrlchkdoae_idc:string = this.c_config.ip_doaechkidcard;
  apiUrlchkdoa_idc:string = this.c_config.ip_doa +"/api_history_rubber.php";
  apiUrldoa_quota:string = this.c_config.ip_doa +"/api_quota_rubber.php";
  apiUrluserlogin:string = this.c_config.ip+"/login_web.php";
  apiUrlgetroom:string = this.c_config.ip+"/searchroom_web.php";
  apiUrlinsertregis:string = this.c_config.ip+"/regis_web.php";
  apiUrlupdatedoa_quota:string = this.c_config.ip+"/exam_doapass.php";
  constructor(public c_config:ConfigserviceProvider,public http: HttpClient) {

  }


  loginchkidcarddoae(username:string): Observable<datachkiddoae> {
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'idcard':username
    };
    return this.http.post<datachkiddoae>(this.apiUrlchkdoae_idc,data,{headers:header});
  }

  loginchkidcarddoa(username:string): Observable<datachkiddoa> {
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'idcard':username
    };
    return this.http.post<datachkiddoa>(this.apiUrlchkdoa_idc,data,{headers:header});
  }

  loginchkidcarddoa1(username:string): Observable<datachkiddoa> {
    let  apiUrlchkdoa_idc:string = this.c_config.ip_doa1 +"/api_history_rubber.php";
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'idcard':username
    };
    return this.http.post<datachkiddoa>(apiUrlchkdoa_idc,data,{headers:header});
  }

  loginchkidcarddoa2(username:string): Observable<datachkiddoa> {
    let  apiUrlchkdoa_idc:string = this.c_config.ip_doa2 +"/api_history_rubber.php";
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'idcard':username
    };
    return this.http.post<datachkiddoa>(apiUrlchkdoa_idc,data,{headers:header});
  }


  login(username:string,type_person): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let uniqid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     let data = {
       'idcard':username,
       'id':uniqid,
       'type_person':type_person
    };
    return this.http.post<data>(this.apiUrluserlogin,data,{headers:header});
  }

  getroom(training_type,year,month,type): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'training_type':training_type,
       'year':year,
       'month':month,
       'type_sql':type
    };
    return this.http.post<data>(this.apiUrlgetroom,data,{headers:header});
  }

  getroomdate(training_type,year,month,dept_id,roomname,type): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
     let data = {
       'training_type':training_type,
       'year':year,
       'month':month,
       'dept_id':dept_id,
       'roomname':roomname,
       'type_sql':type
    };
    return this.http.post<data>(this.apiUrlgetroom,data,{headers:header});
  }

  insert_regis(form: any, type: any): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    let data;
    if (type === 'cancel')
    {
      data = {
        'id': form,
        'type_sql': type
      }
    }
    else {
      data = form
    }

    return this.http.post<FeedBack>(this.apiUrlinsertregis, data, { headers: header });
  }

  chkdoa_quota(item_data): Observable<datareturn_quota> {
    const header = { 'Content-Type': 'application/json' };
    let datadoa = {
      'idcard':item_data.idcard,
      'data_land':item_data.item_data_land_true,
    };
    return this.http.post<datareturn_quota>(this.apiUrldoa_quota,datadoa,{headers:header});
  }

  updatedoa_quota(AMOUNT,HIS_DATE,HIS_TIME,RESULTS,ROUND,SCORE,national_id): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    let datadoa = {
      'AMOUNT':AMOUNT,
      'HIS_DATE':HIS_DATE,
      'HIS_TIME':HIS_TIME,
      'RESULTS':RESULTS,
      'ROUND':ROUND,
      'SCORE':SCORE,
      'national_id':national_id,
      'type_sql':'return'
    };
    //console.log(datadoa);
    return this.http.post<FeedBack>(this.apiUrlupdatedoa_quota,datadoa,{headers:header});
  }


}
