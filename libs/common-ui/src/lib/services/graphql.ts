import { Expense, Manager, Receipt, Setting } from '@dilta/models';
import gql from 'graphql-tag';

// Expense Queries
export const getExpense = (id: string) => gql``;
export const findExpenses = (query: Partial<Expense>) => gql``;
export const createExpense = (expense: Partial<Expense>) => gql``;
export const updateExpense = (id: string, update: Partial<Expense>) => gql``;
export const deleteExpense = (id: string) => gql``;
// Managers Queries
export const getManager = (id: string) => gql``;
export const findManagers = (query: Partial<Manager>) => gql``;
export const createManager = (manager: Partial<Manager>) => gql``;
export const updateManager = (id: string, update: Partial<Manager>) => gql``;
export const deleteManager = (id: string) => gql``;
// Reciept Queries
export const getReceipt = (id: string) => gql``;
export const findReceipts = (query: Partial<Receipt>) => gql``;
export const createReceipt = (receipt: Partial<Receipt>) => gql``;
export const updateReceipt = (id: string, update: Partial<Receipt>) => gql``;
export const deleteReceipt = (id: string) => gql``;
// Settings Queries
export const getSetting = (id: string) => gql``;
export const findSettings = (query: Partial<Setting>) => gql``;
export const createSetting = (setting: Partial<Setting>) => gql``;
export const updateSetting = (id: string, update: Partial<Setting>) => gql``;
export const deleteSetting = (id: string) => gql``;
