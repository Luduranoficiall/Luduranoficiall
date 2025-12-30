# Exercício Avançado
# Crie uma classe ContaBancaria com métodos para depositar, sacar e exibir saldo.
class ContaBancaria:
    def __init__(self, saldo=0):
        self.saldo = saldo
    def depositar(self, valor):
        self.saldo += valor
    def sacar(self, valor):
        if valor <= self.saldo:
            self.saldo -= valor
        else:
            print('Saldo insuficiente!')
    def exibir_saldo(self):
        print(f'Saldo atual: R${self.saldo}')

c = ContaBancaria()
c.depositar(100)
c.sacar(30)
c.exibir_saldo()