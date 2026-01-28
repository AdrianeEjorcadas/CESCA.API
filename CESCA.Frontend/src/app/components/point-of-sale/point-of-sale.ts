import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { TokenService } from '../../services/token-service';
import { JwtPayload } from '../../models/jwt-payload';
import { DatePipe } from '@angular/common';
import { PosTableModel } from '../../models/component-models/pos/pos-table-model';

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


@Component({
  selector: 'app-point-of-sale',
  imports: [FormsModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './point-of-sale.html',
  styleUrl: './point-of-sale.css'
})
export class PointOfSale implements OnInit{


  // services
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private inventoryService = inject(InventoryService);

  protected userName : string | null = null;

  protected posTableModel : PosTableModel[] = [];

  searchParams : InventorySearchParameter = {
    pageNumber: 1,
    pageSize: 15,
    searchTerm: '',
    isArchived: false,
    isDeleted: false
  };

  // mat table
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'actions'];
  dataSource = this.posTableModel;

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
        const products = res.data.products;
        this.dataSource = products.map(mapToProduct);
        console.log(`data source: ` + JSON.stringify(this.dataSource));
      },
      error: (err) => {
        console.log(err);
      }
    })
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