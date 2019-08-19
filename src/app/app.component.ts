import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ElearningPage } from '../pages/elearning/elearning';
import { ExamPage } from '../pages/exam/exam';
import { ContactPage } from '../pages/contact/contact';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  constructor(private ga: GoogleAnalytics,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ตรวจสอบสิทธิ์', component: LoginPage },
      { title: 'E-learning การใช้สารเคมี', component: ElearningPage },
      { title: 'ระบบคลังข้อสอบ', component: ExamPage },
      { title: 'สถานที่ติดต่อ กยท.', component: ContactPage }
      /* { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage } */
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.ga.startTrackerWithId('UA-144818058-1')
      //.then(() => {}).catch(e => alert('Error starting GoogleAnalytics == '+ e));
     // this.ga.startTrackerWithId('UA-144818058-1');
      this.ga.startTrackerWithId('UA-144818058-1')
   .then(() => {
     console.log('Google analytics is ready now');
      this.ga.trackView('test');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
