import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { GeralDialogComponent } from '../geral-dialog/geral-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: any = {
    apiName: "",
    apiEmail: "",
    apiPassword: "",
  }
  address: any = {
    cep: "",
    numero: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: ""
  }
  optionUser: boolean = false;
  optionAddress: boolean = false;

  userForm!: FormGroup
  addressForm!: FormGroup

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private addressService: AddressService,
    private userService: UserService,
    ){

  }

  ngOnInit(): void {
    this.findAddress();
    this.findUser();

    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      id: new FormControl(window.localStorage.getItem('token'))
    })
    this.addressForm = new FormGroup({
      userId: new FormControl(window.localStorage.getItem('token')),
      cep: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      localidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
    })
  }

  get name():any {
    return this.userForm.get('name');
  }

  get email():any {
    return this.userForm.get('email');
  }

  get password():any {
    return this.userForm.get('password');
  }
  

  get cep():any {
    return this.addressForm.get('cep');
  }

  get numero():any {
    return this.addressForm.get('numero');
  }

  get logradouro():any {
    return this.addressForm.get('logradouro');
  }
  
  get complemento():any {
    return this.addressForm.get('complemento');
  }
  get bairro():any {
    return this.addressForm.get('bairro');
  }
  get localidade():any {
    return this.addressForm.get('localidade');
  }
  get uf():any {
    return this.addressForm.get('uf');
  }


  findUser(): void{
    this.userService.findUser().subscribe(data =>{
      this.user = data;
    })
  }

  updateUser(): void{
    if(!this.userForm.invalid){
      this.userService.updateUser(this.userForm.value).subscribe({
        next:(data) => {
          this.user = data;
          this.modifeUserScreen()
        }, error: (err) => {
          console.log(err);
          if(err.status == 500){
            console.log("dialogo de exclusão aberto")
            const dialogRef = this.dialog.open(MessageDialogComponent, {
              data: { text: 'Conexão com servidor perdida, aguarde ou retorne em outro momento' },
            })
            dialogRef.afterClosed().subscribe();
          }else if(err.status == 404){
            console.log("dialogo de exclusão aberto")
            const dialogRef = this.dialog.open(MessageDialogComponent, {
              data: { text: 'Esse email já está cadastrado, por favor insira outro' },
            })
            dialogRef.afterClosed().subscribe();
          }
          
        }
      })
    }
  }

  deleteUser(): void{
    this.userService.deleteUser().subscribe({
      next: () => {
        window.localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, error: (err) => {
        if(err.status == 500){
          console.log("dialogo de exclusão aberto")
          const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: { text: 'Conexão com servidor perdida, aguarde ou retorne em outro momento' },
          })
          dialogRef.afterClosed().subscribe();
        }
      }
    })
  }



  findAddress(): void {
    this.addressService.findAddressByUserId().subscribe({
      next: data => {
        if(data==null){
          var address = {
            cep: "",
            numero: "",
            logradouro: "",
            complemento: "",
            bairro: "",
            localidade: "",
            uf: ""
          }
          this.address = address;
        }else
          this.address = data;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  searchCep(cep: string): void {
    this.addressService.searchCep(cep).subscribe({
      next: data => {
        console.log(data)
        this.addressForm.patchValue(data)
        console.log(this.addressForm)
      }, error(err){
        console.error(err);
      }
    })
  }

  createAddress(): void {
    if(!this.addressForm.invalid){
      this.addressService.createAddress(this.addressForm.value).subscribe({
        next: data => {
          console.log(data)
          this.address = data
          this.modifeAddressScreen();
        }, error(err) {
          console.error(err)
        }
      })
    }
  }

  deleteAddress(): void {
    this.addressService.deleteAddress().subscribe({
      next: data => {
        console.log('deletado');
      },
      complete: () => {
        this.findAddress();
      }
    })
  }
  
  openModal(text: string, func: string): void {
    console.log("dialogo de exclusão aberto")
    const dialogRef = this.dialog.open(GeralDialogComponent, {
      data: { text: text },
    })
    dialogRef.afterClosed().subscribe({
      next: data => {
        if(data && func=='deleteUser')
          this.deleteUser();
        else if(data && func=='deleteAddress')
          this.deleteAddress();
      }
    })
  }

  modifeUserScreen(): void{
    this.optionUser ? this.optionUser = false : this.optionUser = true;
  }
  modifeAddressScreen(): void{
    this.optionAddress ? this.optionAddress = false : this.optionAddress = true;
  }
}
