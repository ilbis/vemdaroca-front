import { Pedido } from './pedido';
import { Produto } from './produto';

export class ItemPedido {
    pedido: Pedido;
    produto: Produto;
    qtd: number;
    valor: number;
    status: string;
}