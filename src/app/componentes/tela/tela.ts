import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutorServicos } from '../../servicos/produtor.servicos';
import { Produtor } from '../../modelos/produtor.model';

@Component({
  selector: 'app-tela',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tela.html',
  styleUrl: './tela.css',
})
export class Tela {
  mensagem: string = '';
  erro: boolean = false;
  produtor: Produtor[] = [];
  form: FormGroup;

  constructor (private produtorService : ProdutorServicos, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      localizacao:['', Validators.required],
      telefone:['', Validators.required]
    });
  }
  carregarProdutorFormulario(produtor : any){
    this.form.patchValue({
      id : produtor.id,
      nome :   produtor.nome,
      localizacao : produtor.localizacao,
      telefone : produtor.telefone
    });
  }

  ngOnInit(){
    this.buscarTodosProdutores();
  }

  buscarTodosProdutores(){
    this.produtorService.listarTodos().subscribe({
      next: (resposta) => {
        this.produtor = resposta.dados;
      },
      error: (resposta) => {
        this.erro = resposta?.erro || true;
        this.mensagem = resposta?.mensagem || 'Erro ao carregar os dados';
      }
    });
  }

  salvarDados(){
    if(this.form.valid) {
      this.produtorService.criar(this.form.value).subscribe({
        next : (resposta) => {
          this.erro = resposta.erro;
          this.mensagem = resposta.mensagem;
          if (!resposta.erro) {
            this.form.reset();
            this.form.patchValue({
              id : 0
            });
            this.buscarTodosProdutores();

          }
        },
        error: (resposta) => {
          this.erro = resposta?.erro || true;
          this.mensagem = resposta?.mensagem || "Erro na API";
        }
      });
    } else {
      this.mensagem = "Preencha todos os campos!";
      this.erro = true;
    }
  }


  alterarDados(){
    if(this.form.valid) {
      this.produtorService.atualizar(this.form.value.id, this.form.value).subscribe({
        next : (resposta) => {
          this.erro = resposta.erro;
          this.mensagem = resposta.mensagem;
          if (!resposta.erro) {
            this.form.reset();
            this.form.patchValue({
              id : 0
            });
            this.buscarTodosProdutores();

          }
        },
        error: (resposta) => {
          this.erro = resposta?.erro || true;
          this.mensagem = resposta?.mensagem || "Erro na API";
        }
      });
    } else {
      this.mensagem = "Preencha todos os campos!";
      this.erro = true;
    }
  }


  excluirDados(){
    if(this.form.valid) {
      this.produtorService.excluir(this.form.value.id).subscribe({
        next : (resposta) => {
          this.erro = resposta.erro;
          this.mensagem = resposta.mensagem;
          if (!resposta.erro) {
            this.form.reset();
            this.form.patchValue({
              id : 0
            });
            this.buscarTodosProdutores();

          }
        },
        error: (resposta) => {
          this.erro = resposta?.erro || true;
          this.mensagem = resposta?.mensagem || "Erro na API";
        }
      });
    } else {
      this.mensagem = "Preencha todos os campos!";
      this.erro = true;
    }
  }

}
