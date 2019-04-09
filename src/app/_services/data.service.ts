import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Brand } from '@app/_models/brand';
import { AppConstants } from '@app/app.constants';

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(private http: HttpClient) { }

    getBrands() {
        return this.http.get<Brand[]>(AppConstants.API_URL + '/brands');
    }

    createBrand (brand: Brand): Observable<Brand> {
        return this.http.post<Brand>(AppConstants.API_URL + '/brands', brand, {});
    }

    updateBrand (brand: Brand): Observable<Brand> {
        return this.http.put<Brand>(AppConstants.API_URL + '/brands', brand, {});
    }

    deleteBrand (id: number): Observable<{}> {
        return this.http.delete(AppConstants.API_URL + '/brands/' + id, {});
    }
}