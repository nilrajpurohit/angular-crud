import { Component,Input,OnInit} from '@angular/core';
import { AppComponent } from '../app.component';
import {faTimes} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss','../app.component.scss']
})
export class EditModalComponent implements OnInit {
 
  constructor() { }
  ngOnInit(): void {}
  
  isShow = false;
  app:any = new AppComponent();

  title:string = 'UPADTE PRODUCT...';
  headIcon = faTimes;
  inputBoxs:any = this.app.inputBoxs;
  editProduct:object;

  inputBtn:any = [{
    title:'UPDATE PRODUCT',
    type:'button',
    class:"addBtn",
    click:(product:object)=>{
      this.updateProduct(product);
    },
  }];

  toggleModal(product?:any):void{
    this.isShow = !this.isShow;
    if(product){
      this.editProduct = product;
      this.inputBoxs.forEach((el:any)=>{
        el.title == 'productName' ? el.bind = product.name : '';
        el.title == 'productPrice' ? el.bind = product.price : '';
      })
     console.log(product);
    }
  }

  updateProduct(product:any):void{
    let isValid = this.app.validateFields(this.inputBoxs);
    console.log(this.inputBoxs);
    console.log(isValid);
    if(typeof(isValid)=='boolean' && typeof(product)=='object' && isValid && product){
      this.inputBoxs.forEach((item:any)=>{
        if(item.title == 'productName'){
          product.name = item.bind;
        }

        if(item.title=='productPrice'){
          product.price = item.bind;
        }
      })
      var data = {
          id:product.id,
          date : product.date,
          name : product.name,
          price : product.price
      }
      this.app.productsDetail.forEach((item:any)=>{
        if(item.id == product.id){
          this.app.productsDetail.pop(item)
        }
      })
      this.app.productsDetail.push(data);
      this.toggleModal();
    }
  }


}
