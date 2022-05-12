import { Component ,ViewChild} from "@angular/core";
import {faPencilAlt,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Observable } from "rxjs";
import {EditModalComponent} from './edit-modal/edit-modal.component';
@Component({
  selector : 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.scss']  
})

export class AppComponent{
    title:string = 'PRODUCT MANAGMENT';
    @ViewChild(EditModalComponent) child:EditModalComponent;
    //NgModel For ProductInput
    inputBoxs:any = [{
        title:'productName',
        type:'text',
        placeholder:'PRODUCT NAME',
        class:'inputBox',
        bind:'',
        errorTxt:'Invalid product name !',
        isValid:true
    },{
        title:'productPrice',
        type:'number',
        placeholder:'PRODUCT PRICE',
        class:'inputBox',
        bind:'',
        errorTxt:'Invalid product price !',
        isValid:true
    }];

    inputBtn:any = [{
        title:'+ ADD PRODUCT',
        type:'button',
        class:'addBtn',
        click:()=>{
            this.insertProduct()
        },
    }];
    
    tableHead:any = ['DATE','PRODUCT NAME','PRODUCT PRICE','ACTION'];

    actionBtns:any = [{
        title:'Edit',
        class:'',
        icon:faPencilAlt,
        click:(product:any)=>{
            this.editProduct(product);
        }
    },{
        title:'Delete',
        class:'',
        icon:faTrash,
        click:(product:any)=>{
            this.deleteProduct(product);
        }
    }];

    productsDetail:any= [{
        id:1,
        date : '27-09-2021',
        name:'Samsung Galaxy A70',
        price:'25000',
    },{
        id:2,
        date : '28-09-2021',
        name:'Samsung Galaxy A50',
        price:'20000',
    },{
        id:3,
        date : '28-09-2021',
        name:'IPhone 11 pro',
        price:'65000',
    },{
        id:4,
        date : '28-09-2021',
        name:'IPhone XR 64 GB Silver',
        price:'47000',
    }];

    validateFields(inputs:any):boolean{
        let fieldsValid:boolean= true;
        inputs.forEach((el:any) => {
            if(el.type == 'text'){
                if(el.bind.trim() == ''){
                    el.isValid = false;
                    fieldsValid = false;
                }else{
                    el.isValid = true;
                }
            }

            if(el.type=='number'){
                if(el.bind.trim() == '' || isNaN(el.bind)){
                    el.isValid = false;
                    fieldsValid = false;
                }else{
                    el.isValid = true;
                }
            }

            if(el.type == 'email'){
                if(el.bind.trim() == '' || el.bind.includes('@','.')){
                    el.isValid = false;
                    fieldsValid = false;
                    
                }else{
                    el.isValid = true;
                }
            }
        }); 
        console.log(fieldsValid)
        return fieldsValid;
    }

    insertProduct():void{
        var isValid = this.validateFields(this.inputBoxs);
        var lastProduct = this.productsDetail.at(-1);
        var data = {
            id:lastProduct.id + 1,
            date : '',
            name : '',
            price : ''
        }

        if(isValid){
            let date:Date = new Date();
            data.date = ('0'+date.getDate()).slice(-2)+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear();
            this.inputBoxs.forEach((input:any) => {
              if(input.title == 'productName'){
                    data.name = input.bind;
                }
                if(input.title == 'productPrice'){
                    data.price = input.bind;
                }  
            });
            this.productsDetail.push(data);
        }

        this.inputBoxs.forEach((el:any)=>{
            el.bind='';
        })
    }

    editProduct(product:any):void{
        this.child.toggleModal(product);
    }

    deleteProduct(product:any):void{
        let newProductArray:object[] = this.productsDetail;
        this.productsDetail=[];
        newProductArray.filter((item:any)=>{
            if(item.id != product.id){
                this.productsDetail.push(item);      
            }
        })
       
    }
}