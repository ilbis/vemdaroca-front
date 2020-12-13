import { ItemPedido } from './item-pedido';
import { User } from './user';

export class Pedido {
    id: number;
    moment: string;
    status: string;
    cliente: User;
    items: ItemPedido[];
    total: number;
}