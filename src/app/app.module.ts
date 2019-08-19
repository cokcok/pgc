import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPageModule } from '../pages/login/login.module';
import { Login1PageModule } from '../pages/login1/login1.module';
import { ElearningPageModule } from '../pages/elearning/elearning.module';
import { ExamPageModule } from '../pages/exam/exam.module';
import { ContactPageModule } from '../pages/contact/contact.module';


import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { ConfigserviceProvider } from '../providers/configservice/configservice';

import { NetworkInterface } from '@ionic-native/network-interface';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,Login1PageModule,ElearningPageModule,ExamPageModule,ContactPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginserviceProvider,GoogleAnalytics,
    ConfigserviceProvider,NetworkInterface,Device,InAppBrowser
  ]
})
export class AppModule {}
