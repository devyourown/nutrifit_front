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

export function makeDate(origin: string): string {
    const date = new Date(origin);
    return `${date.getFullYear()+'.'
        +String(date.getMonth()+1).padStart(2, '0')+'.'
        +String(date.getDate()).padStart(2, '0')}`
}