import { atom } from 'jotai';

export const filterStatusAtom = atom<'all' | 'active' | 'completed'>('all');

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export const todoListAtom = atom<TodoItem[]>([]);
