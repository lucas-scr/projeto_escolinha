import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../interfaces/atividades';

@Injectable({
  providedIn: 'root',
})

export class ServiceAtividades {
    private URL = 'api/atividades';

    constructor( private http: HttpClient){
        
    }
    
    getAtividades():Observable<Atividade[]>{
        return this.http.get<Atividade[]>(this.URL);
    }
}