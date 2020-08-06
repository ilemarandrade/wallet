export const usuarios=[
    {"documento":"26996654","nombres":"Ilemar Andrade","email":"ilemarandrade@gmail.com","celular":"04144505536","saldo":"3000"},
    {"documento":"12934269","nombres":"Maria Rondon","email":"mariarondon@gmail.com","celular":"04125774737","saldo":"3000"},
    {"documento":"21471777","nombres":"Jose Ruiz","email":"joseruiz@gmail.com","celular":"04266419928","saldo":"3000"},
]

export function crearStorage(){
    return localStorage.setItem('user', JSON.stringify(usuarios))
    ;}