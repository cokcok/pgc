export interface  data{
  name:null,
  tel:null,
  fname:null,
  lname:null,
  status:null,
  exam_status:null,
  register_status:null,
  traning_status:null,
  data_detail:data_detail[];
}

export interface data_detail{

}

export interface  datachkiddoae{
  name:null,
  exam_status:null,
  register_status:null,
  traning_status:null,
}
/*  exam_status = สมัครสอบ
          register_status = สมัคร
          traning_status = อบรม */


export interface  datachkiddoa{
  results:null
}

export interface datareturn_quota{
  AMOUNT:null,
  HIS_DATE:null,
  HIS_TIME:null,
  RESULTS:null,
  ROUND:null,
  SCORE:null

}
