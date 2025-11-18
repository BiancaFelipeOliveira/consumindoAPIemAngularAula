import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtor } from '../modelos/produtor.model';

interface ApiRetorno {
  erro: boolean;
  mensagem: string;
  dados: Produtor[];
}
@Injectable({
  providedIn: 'root',
})
export class ProdutorServicos {
  private readonly API_URL:string = 'http://localhost/ExemploAPIemAula/colheita-api/api/produtor';

  //Construtor que vai receber o HttpCliente
  constructor(private http: HttpClient){}

  // Método para chamar a API para consultar todos os produtores
  listarTodos(): Observable<ApiRetorno> {
    return this.http.get<ApiRetorno>(this.API_URL);
  }

  criar(produtor: Produtor):Observable<ApiRetorno>{
    return this.http.post<ApiRetorno>(this.API_URL, produtor);
    ;
  }

  atualizar(id : number, produtor : Produtor) : Observable<ApiRetorno> {
    return this.http.put<ApiRetorno>(`${this.API_URL}/${id}`, produtor);
  }

  excluir(id : number): Observable<ApiRetorno>{
    return this.http.delete<ApiRetorno>(`${this.API_URL}/${id}`);
  }
}
