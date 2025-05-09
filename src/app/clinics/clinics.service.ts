import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Clinic {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  regional: string;
  data_inauguracao: Date;
  ativa: boolean;
  specialties: any[];
}

@Injectable({ providedIn: 'root' })
export class ClinicsService {
  private readonly API_URL = '/api/clinics';
  private clinics$ = new BehaviorSubject<Clinic[]>([]);

  constructor(private http: HttpClient) {}

  getClinics(filter: string = '', page: number = 1): Observable<Clinic[]> {
    let params = new HttpParams()
      .set('page', page.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<Clinic[]>(this.API_URL, { params }).pipe(
      tap(clinics => this.clinics$.next(clinics))
    );
  }

  getClinic(id: string): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.API_URL}/${id}`);
  }

  createClinic(clinic: Omit<Clinic, 'id'>): Observable<Clinic> {
    return this.http.post<Clinic>(this.API_URL, clinic);
  }

  updateClinic(id: string, clinic: Partial<Clinic>): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.API_URL}/${id}`, clinic);
  }

  deleteClinic(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  get regions$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/regions`);
  }

  get specialties$(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/specialties`);
  }
}