import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { Brand } from '@app/_models/brand'
import { DataService } from '@app/_services/data.service'

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styles: []
})
export class BrandsComponent implements OnInit {
  brandForm: FormGroup;
  brands: Brand[] = [];
  actionType: string;

  // paging
  currentPage = 1;
  itemsPerPage = 3;
  pageSize: number;

  constructor (
    private dataService: DataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  onNew () {
    this.actionType = "Create";
  }

  onEdit (brand: Brand) {
    this.brandForm.setValue({
      id: brand.id,
      title: brand.title,
      founder: brand.founder,
      founded: brand.founded,
      headquarters: brand.headquarters,
      overview: brand.overview
    });
    this.actionType = "Update";
  }

  onCancel () {
    this.brandForm.reset();
    this.actionType = null;
  }

  onSubmit () {
    let brand: Brand = Object.assign({}, this.brandForm.value);
    if(brand.id){
      this.dataService.updateBrand(brand).pipe(first()).subscribe(res => {
        this.refreshBrands();
        this.toastrService.success("Brand has been updared!");
      });
    }
    else{
      this.dataService.createBrand(brand).pipe(first()).subscribe(res => {
        this.refreshBrands();
        this.toastrService.success("New brand has been created!");
        this.onCancel();
      });
    }
  }

  refreshBrands () {
    this.dataService.getBrands().pipe(first()).subscribe(brands => {
      this.brands = brands;
    });
  }

  onDelete (brand: Brand) {
    if(confirm("Are you sure to delete " + brand.title + " brand?")) {
      this.dataService.deleteBrand(brand.id).pipe(first()).subscribe(res => {
        this.refreshBrands();
        this.toastrService.success("Brand has been deleted.");
      });
    }
  }

  reset() {
    this.brandForm.reset();
}

  ngOnInit () {
    this.refreshBrands();

    this.brandForm = this.formBuilder.group({
      id:[null],
      title: ['', Validators.required],
      founder: ['', Validators.required],
      founded: ['', Validators.required],
      headquarters: ['', Validators.required],
      overview: ['']
    });
  }

}
