import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { GeralDialogComponent } from '../geral-dialog/geral-dialog.component';

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
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      id: new FormControl(window.localStorage.getItem('token'))
    })
    this.addressForm = new FormGroup({
      userId: new FormControl(window.localStorage.getItem('token')),
      cep: new FormControl(''),
      numero: new FormControl(''),
      logradouro: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      uf: new FormControl(''),
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
    return this.userForm.get('cep');
  }

  get numero():any {
    return this.userForm.get('numero');
  }

  get logradouro():any {
    return this.userForm.get('logradouro');
  }
  
  get complemento():any {
    return this.userForm.get('complemento');
  }
  get bairro():any {
    return this.userForm.get('bairro');
  }
  get localidade():any {
    return this.userForm.get('localidade');
  }
  get uf():any {
    return this.userForm.get('uf');
  }


  findUser(): void{
    this.userService.findUser().subscribe(data =>{
      this.user = data;
    })
  }

  updateUser(): void{
    this.userService.updateUser(this.userForm.value).subscribe({
      next:(data) => {
        this.user = data;
        this.modifeUserScreen()
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  deleteUser(): void{
    this.userService.deleteUser().subscribe(data =>{
      window.localStorage.removeItem('token');
      this.router.navigate(['/login']);
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
      
      
      /*data =>{
      this.address = data;
      if(this.address.cep == null){
        console.log('é nulo')
      }
    })*/
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
