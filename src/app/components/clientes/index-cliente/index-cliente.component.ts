import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 10;
  public token;
  public load_data = true;
  
  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService

   ){
    this.token = this._adminService.getToken();
    console.log(this.token);

   }

  ngOnInit(): void {

    this.init_data();

}
init_data(){

  this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(

    response=>{
      
      this.clientes = response.data;
      this.load_data = false;
      
},
  
  error=>{
    console.log(error);

  }
  );

}

filtro(tipo){
  
  if(tipo == 'apellidos'){

    if(this.filtro_apellidos){
      
    this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
      response=>{

        this.clientes = response.data;
        
        
  
  },
    
    error=>{
      console.log(error);
  
    }
    );


    }else{

      this.init_data();
    }
    

  }else if(tipo == 'correo'){

    if(this.filtro_correo){
     

    }
    
    this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo, this.token).subscribe(

      response=>{
        
        this.clientes = response.data;
        
        
  
  },
    
    error=>{
      console.log(error);
  
    }
    );
  
  }else{

    this.init_data();
  }
  


}

eliminar(id){

  this._clienteService.eliminar_cliente_admin(id, this.token).subscribe(

    response=>{
      console.log(response);

      iziToast.show({
        title: 'SUCCESS',
        titleColor: 'green',
        color: 'white',
        class: 'text-Success',
        position: 'topLeft',
        message: 'cliente eliminado correctamente'
  
      });

      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.init_data();


    },

  error=>{
    console.log(error)


  }
  )

}

}
