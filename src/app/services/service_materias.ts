import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/materias';

@Injectable({
  providedIn: 'root',
})
export class ServiceMateria {
    private URL = 'api/materias';

    constructor( private http: HttpClient){
    }

    getMaterias():Observable<Materia[]>{
        return this.http.get<Materia[]>(this.URL);
    }
    consultarPorId(id: number):Observable<Materia>{
        return this.http.get<Materia>(`${this.URL}/${id}`);
    }
}