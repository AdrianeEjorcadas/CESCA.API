import { Component, inject, OnInit, ViewChild, signal, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { TokenService } from '../../services/token-service';
import { JwtPayload } from '../../models/jwt-payload';
import { DatePipe } from '@angular/common';
import { PosTableModel } from '../../models/component-models/pos/pos-table-model';
import { MetadataModel } from '../../models/component-models/metadata-model';

// angulkar material
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../services/inventory-service';
import { InventorySearchParameter } from '../../models/search-parameter';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddToCart } from '../modal-components/pos/add-to-cart/add-to-cart';
import { OrderQuantity } from '../modal-components/pos/order-quantity/order-quantity';

@Component({
  selector: 'app-point-of-sale',
  imports: [FormsModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatTableModule, MatPaginator, MatButtonToggleModule, MatCheckboxModule],
  templateUrl: './point-of-sale.html',
  styleUrl: './point-of-sale.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointOfSale implements OnInit{

  // services
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private inventoryService = inject(InventoryService);
  private toastrService = inject(ToastrService);
  private dialog = inject(MatDialog);

  protected userName : string | null = null;

  protected posTableModel : PosTableModel[] = [];

  searchParams : InventorySearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: false,
    isDeleted: false
  };

  //paginator
  paginatorMetadata : MetadataModel | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // mat table
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'actions'];
  dataSource = this.posTableModel;

  //cart variable
  private cart = signal<PosTableModel[]>([]);

  constructor(){
  }

  ngOnInit(): void {
    this.getUserName();
    this.getProducts();
  }

  getUserName(){
    const token = this.tokenService.getAccessToken();
    this.userName = this.authService.getUserName(token!);
  }

  getProducts(){
    this.inventoryService.getInventoryItems$(this.searchParams).subscribe({
      next: (res) =>{
        //map metaData
        this.paginatorMetadata = null;
        this.paginatorMetadata = res.data.metaData;
        const products = res.data.products;
        this.dataSource = products.map(mapToProduct);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(product: PosTableModel){

    // check if product already in cart
    const exists = this.cart().find(cart => cart.productId === product.productId);
    if (!exists){
      //add product to cart
      const productCopy = {...product}; // shallow copy, avoids changes of the dataSource data
      this.cart.set([...this.cart(), productCopy]);

      //opend order qty dialog
      const dialogRef = this.dialog.open(OrderQuantity, {
        width: '500px',
        disableClose: true,
        data: {productName: product.productName, quantity: product.quantity}
      });

      // retrieve quantity and (assign it to the product in the cart OR remove the item if qty is 0)
      dialogRef.afterClosed().subscribe(result => {
          const quantity = result;
          if(quantity > 0){
            this.cart().find(cart => cart.productId === product.productId)!.quantity = quantity;
          } else {
            this.cart.update(items => items.filter(item => item.productId !== product.productId));
          }
      });

      console.log(this.cart());
    } else {
      this.toastrService.info('Product already in cart','Cesca\'\s Pharmacy');
    }
  }

  checkCart(){
    if(this.cart().length > 0){
      this.dialog.open(AddToCart, {
        width: '500px',
        disableClose: false,
        data: {
          cart: this.cart()
        }
      })
    } else {
      this.toastrService.info('Cart is empty','Cesca\'\s Pharmacy')
    }
  }

  search(){
    this.getProducts();
    this.resetPaginator(); 
  }
  
  resetPaginator(){
    this.paginatorMetadata = null;
  }

  onPageChange(event: PageEvent) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize; 
    this.getProducts();
  }


}

function mapToProduct(src: any) : PosTableModel {
  return{
    productId: src.productId,
    productName: src.productName,
    price: src.price,
    quantity: src.stockQuantity
  };
}