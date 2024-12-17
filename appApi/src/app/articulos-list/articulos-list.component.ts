import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { ArticulosService } from '../articulos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articulos-list.component.html',
  styleUrl: './articulos-list.component.css'
})
export class ArticulosListComponent implements OnInit {

  articulos: any[] = [];
  articuloEditado: any = null;  // Artículo que se está editando
  descripcionEditada: string = '';
  precioEditado: number = 0;

  // Nuevo artículo a agregar
  nuevoArticulo = {
    descripcion: '',
    precio: 0
  };

  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.obtenerArticulos();
  }

  // Método para obtener los artículos
  obtenerArticulos(): void {
    this.articulosService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

  // Método que se llama cuando se hace clic en el botón "Modificar"
  editarArticulo(articulo: any): void {
    this.articuloEditado = { ...articulo };  // Guardamos una copia del artículo a editar
    this.descripcionEditada = articulo.descripcion;
    this.precioEditado = articulo.precio;
  }

  // Método que se llama cuando se hace clic en "Guardar Cambios"
  guardarCambios(): void {
    if (this.descripcionEditada && this.precioEditado >= 0) {
      // Actualizamos el artículo con los nuevos datos
      const articuloActualizado = {
        ...this.articuloEditado,
        descripcion: this.descripcionEditada,
        precio: this.precioEditado
      };

      this.articulosService.updateArticulo(articuloActualizado).subscribe(response => {
        // Volver a obtener la lista actualizada de artículos
        this.obtenerArticulos();
        // Limpiar el formulario y el artículo editado
        this.articuloEditado = null;
      });
    }
  }

  // Método para cancelar la edición
  cancelarEdicion(): void {
    this.articuloEditado = null;
  }

  // Método para eliminar un artículo
  eliminarArticulo(codigo: number): void {
    // Mostrar alerta de confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este artículo será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para eliminar el artículo
        this.articulosService.deleteArticulo(codigo).subscribe(response => {
          // Volver a obtener la lista actualizada de artículos
          this.obtenerArticulos();
          // Mostrar mensaje de éxito
          Swal.fire(
            'Eliminado!',
            'El artículo ha sido eliminado.',
            'success'
          );
        }, error => {
          // Mostrar mensaje de error si la eliminación falla
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el artículo.',
            'error'
          );
        });
      }
    });
  }

  // Método para agregar un nuevo artículo
  agregarArticulo(): void {
    if (this.nuevoArticulo.descripcion && this.nuevoArticulo.precio >= 0) {
      // Llamamos al servicio para agregar el artículo
      this.articulosService.addArticulo(this.nuevoArticulo).subscribe(response => {
        // Volver a obtener la lista de artículos
        this.obtenerArticulos();
        // Limpiar el formulario
        this.nuevoArticulo.descripcion = '';
        this.nuevoArticulo.precio = 0;
      }, error => {
        Swal.fire('Error', 'Hubo un problema al agregar el artículo', 'error');
      });
    } else {
      Swal.fire('Error', 'Por favor ingrese una descripción y un precio válidos', 'warning');
    }
  }

  // Método para cancelar la acción de agregar artículo
  cancelarAgregar(): void {
    this.nuevoArticulo.descripcion = '';
    this.nuevoArticulo.precio = 0;
  }

}
