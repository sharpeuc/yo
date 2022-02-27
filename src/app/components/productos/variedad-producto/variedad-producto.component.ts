import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto: any = {};
  public id;
  public token;

  public nueva_variedad = '';

  constructor(
    private _route : ActivatedRoute,
    private _productoService: ProductoService

  ) { 
   
   this.token = localStorage.getItem('token');
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        
        
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
         response=>{
         if(response.data == undefined){
           this.producto = undefined;

         }else{
           this.producto = response.data;
           
           
         }

         console.log(this.producto);
            },
            error=>{
              

            }

        );

          }

    );

        }
             
     

  ngOnInit(): void {
  }

  agregar_variedad(){

    if(this.nueva_variedad){

      this.producto.variedades.push({titulo: this.nueva_variedad});
      this.nueva_variedad = '';


    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ser completado el campo de la variedad'
    });


    }

    
    
    }
    eliminar_variedad(idx){

      this.producto.variedades.splice(idx, 1);
    
    
    }
  
 actualizar(){

  if(this.producto.titulo_variedad){

    if( this.producto.variedades.length >= 1){

      this._productoService.actualizar_producto_variedades_admin({

        titulo_variedad: this.producto.titulo_variedad,

        variedades: this.producto.variedades,
        
     
     
      },this.id,this.token).subscribe(

        response=>{
          console.log(response);
        }


      );


    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'se debe agregar al menos una variedad'
    });
  
  }

  }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      class: 'text-danger',
      position: 'topRight',
      message: 'Debe completar el titulo de la variedad'
  });

  }


 }
 
  }

