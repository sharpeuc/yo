import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any= {

    categoria: ''


  };
  public file: File = undefined;
  public imgSelect:any | ArrayBuffer = 'assets/img/fotito.jpeg';
  public config : any = {};
  public token;
  public load_btn = false;
  
  
  constructor(

private _productoService: ProductoService,
private _adminService: AdminService,
private _router : Router

  ) {

    this.config ={

      height: 500


    }
    this.token = this._adminService.getToken();

   }

  ngOnInit(): void {
  }

registro(registroForm){

  if(registroForm.valid){
    if(this.file == undefined){
      iziToast.show({
        title: 'ERROR',
        titleColor: 'blue',
        color: 'white',
        class: 'text-danger',
        position: 'topLeft',
        message: 'debe subir una portada para registrar'
  
      });


    }else{
      console.log(this.producto);
    console.log(this.file);
    this.load_btn = true;

    this._productoService.registro_producto_admin(this.producto, this.file, this.token ).subscribe(

      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: 'green',
          color: 'white',
          class: 'text-Success',
          position: 'topLeft',
          message: 'se registró correctamente el nuevo producto'
    
        });

        this.load_btn = false;
        
        this._router.navigate(['/panel/productos']);

      },

      error=>{
        console.log(error)
        this.load_btn = false;

      }
    
      );

    }
    


  }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: 'blue',
      color: 'white',
      class: 'text-danger',
      position: 'topLeft',
      message: 'los datos del formulario no son válidos'

    });
    this.load_btn = false;

    $('#input-portada').text('Seleccionar imagen');
  this.imgSelect = 'assets/img/fotito.jpeg';
  this.file = undefined;

  }


}
fileChangeEvent(event: any): void{

  var file;

  if(event.target.files && event.target.files[0]){
    file = <File>event.target.files[0]
    


  }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: 'blue',
      color: 'white',
      class: 'text-danger',
      position: 'topLeft',
      message: 'no hay una imagen enviada'

    });



  }

if(file.size <= 5000000){

  if(file.type == 'image/png' || file.type=='image/jpg' || file.type=='image/jpeg' || file.type=='image/gif'){

    const reader = new FileReader();
    reader.onload = e => this.imgSelect = reader.result;
    console.log(this.imgSelect)
    
    
    reader.readAsDataURL(file);

    $('#input-portada').text(file.name)

    
    
    this.file = file;


  }else{

    iziToast.show({
      title: 'ERROR',
      titleColor: 'blue',
      color: 'white',
      class: 'text-danger',
      position: 'topLeft',
      message: 'el archivo debe ser una imagen válida'
  
    });

    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/fotito.jpeg';
this.file = undefined;


  }


}else{

  iziToast.show({
    title: 'ERROR',
    titleColor: 'blue',
    color: 'white',
    class: 'text-danger',
    position: 'topLeft',
    message: 'la imagen no puede superar los 4MB'

  });

$('#input-portada').text('Seleccionar imagen');
this.imgSelect = 'assets/img/fotito.jpeg';
this.file = undefined;

}
console.log(this.file)


}

}
