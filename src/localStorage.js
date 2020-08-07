export const usuarios=[
    {"documento":"26996654","nombres":"Ilemar Andrade","email":"ilemarandrade@gmail.com","celular":"04144505536","saldo":"3000"},
    {"documento":"123456789","nombres":"Maria Rondon","email":"mariarondon@gmail.com","celular":"04121234567","saldo":"3000"},
    {"documento":"23456789","nombres":"Jose Ruiz","email":"joseruiz@gmail.com","celular":"0426234567891","saldo":"3000"},
]

export function crearStorage(){
    return localStorage.setItem('user', JSON.stringify(usuarios))
    ;}