import { get } from './apiService';

const findByFilter = (filter) =>{
    const teste = get('/api/transaction/', filter);
    console.log(teste)
    return teste;
}

export { findByFilter };