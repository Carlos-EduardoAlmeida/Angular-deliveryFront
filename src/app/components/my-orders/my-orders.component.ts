import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  optionToOrders: boolean = true;

  dataToOrder: any = [
    {
      id: 1,
      order: "batata com queijo",
      description: "Batata porção média com queijo por cima",
      category: "lanche",
      price: 14.99,
      image: "https://i0.wp.com/viivaassessoria.com/wp-content/uploads/2018/07/batatinhamc.png?fit=913%2C733&ssl=1"
    },
    {
      id: 2,
      order: "Hamburguer",
      description: "Hamburguer duplo com cebola, tomate, molho e queijo",
      category: "lanche",
      price: 14.99,
      image: "https://revistamenu.com.br/wp-content/uploads/sites/24/2019/04/mcdonalds-bigvegants-1.jpg"
    },
    {
      id: 3,
      order: "Refrigerante",
      description: "Refrigerante gelado zero 500ml",
      category: "bebidas",
      price: 14.99,
      image: "https://noticias.reclameaqui.com.br/uploads/2017/07/620604607.jpg"
    },
    {
      id: 4,
      order: "Refrigerante",
      description: "Refrigerante gelado zero 500ml",
      category: "bebidas",
      price: 14.99,
      image: "https://noticias.reclameaqui.com.br/uploads/2017/07/620604607.jpg"
    },
    {
      id: 5,
      order: "Refrigerante",
      description: "Refrigerante gelado zero 500ml",
      category: "bebidas",
      price: 14.99,
      image: "https://noticias.reclameaqui.com.br/uploads/2017/07/620604607.jpg"
    },
  ]
  dataOrderPlaced: any = [
    {
      id: 1,
      order: "batata com queijo",
      description: "Batata porção média com queijo por cima",
      category: "lanche",
      price: 14.99,
      image: "https://i0.wp.com/viivaassessoria.com/wp-content/uploads/2018/07/batatinhamc.png?fit=913%2C733&ssl=1"
    },
    {
      id: 2,
      order: "Hamburguer",
      description: "Hamburguer duplo com cebola, tomate, molho e queijo",
      category: "lanche",
      price: 14.99,
      image: "https://revistamenu.com.br/wp-content/uploads/sites/24/2019/04/mcdonalds-bigvegants-1.jpg"
    },
  ]

  modifeTypeToOrder(): void{
    this.optionToOrders = true;
  }

  modifeTypeOrder(): void{
    this.optionToOrders = false;
  }
}
