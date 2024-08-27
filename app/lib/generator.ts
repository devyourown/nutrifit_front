import { v4 as uuidv4 } from 'uuid';
import { Cart } from './types/definition';

export function generateUniqueId(): string {
    return uuidv4();
}

export function makeEmptyCart(): Cart {
    return {
        items: [],
        checkoutStep: 1,
    }
}