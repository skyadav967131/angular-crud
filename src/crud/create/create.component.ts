import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product} from '../product'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  productForm!: FormGroup;
   
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }

  list!: Product[];
  ngOnInit() {
    this.productForm = new FormGroup({
      Id: new FormControl('2'),
      Name: new FormControl(''),
      Description: new FormControl(''),
      Price: new FormControl(''),
      Quantity: new FormControl('')
    });
     /* this.productForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],   * 
    })*/
    this.crudService.getAll().subscribe((res:Product[])=>{
      this.list=res;
    });
  }

  onSubmit() {
      console.log(this.productForm.value);
      console.log(this.list);
      this.crudService.create(this.productForm.value);
  }

}