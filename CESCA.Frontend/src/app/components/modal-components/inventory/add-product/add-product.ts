import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../../../services/inventory-service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit {
  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  protected addProductForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initializedForm();
  }

  initializedForm(){
    this.addProductForm = this.formBuilder.group({

    });
  }
 

}
