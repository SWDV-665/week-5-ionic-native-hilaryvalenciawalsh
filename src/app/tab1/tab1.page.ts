import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { NavController } from '@ionic/angular';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  title = 'Grocery List Items';
  constructor(
    public navController: NavController,
    public toastController: ToastController,
    public alertController: AlertController,
    public dataService: GroceriesServiceService,
    public inputDialogService: InputDialogServiceService,
    public socialSharing: SocialSharing
  ) {}
  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Removing: ' + item.name,
      duration: 2000,
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  async addItem() {
    this.inputDialogService.showPrompt();
  }

  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Editing Item: ' + item.name,
      duration: 2000,
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }
  async shareItem(item, index) {
    console.log('Sharing Item-', item, index);
    const toast = await this.toastController.create({
      message: 'Sharing Item: ' + item.name + ' ...',
      duration: 5000,
    });
    toast.present();

    let message =
      'Grocery Item - Name: ' + item.name + ' - Quantity: ' + item.Quantity;
    let subject = 'Shared via Grocery app';

    this.socialSharing
      .share(message, subject)
      .then(() => {
        console.log('Shared!');
      })
      .catch((error) => {
        console.log('Error sharing', error);
      });
  }
  // async addItem() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-class',
  //     header: 'Enter item',
  //     inputs: [
  //       {
  //         name: 'name',
  //         type: 'text',
  //         id: 'item-name',
  //         placeholder: 'Item',
  //       },

  //       {
  //         name: 'quantity',
  //         type: 'text',
  //         id: 'item-id',
  //         placeholder: 'Quantity',
  //       },
  //     ],

  //     buttons: [
  //       {
  //         text: 'cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (data) => {
  //           console.log('Cancel');
  //         },
  //       },

  //       {
  //         text: 'save',
  //         handler: (data) => {
  //           console.log('Add');
  //           this.addItem(data);
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
