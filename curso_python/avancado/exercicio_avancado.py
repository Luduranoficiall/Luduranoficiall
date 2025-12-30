# Exercício Avançado
"""
Classe ContaBancaria com métodos, tipagem, docstrings e desafio extra.
"""

class ContaBancaria:
    """Simula uma conta bancária simples."""
    def __init__(self, saldo: float = 0.0) -> None:
        self.saldo = saldo

    def depositar(self, valor: float) -> None:
        self.saldo += valor

    def sacar(self, valor: float) -> None:
        if valor <= self.saldo:
            self.saldo -= valor
        else:
            print('Saldo insuficiente!')

    def exibir_saldo(self) -> None:
        print(f'Saldo atual: R${self.saldo:.2f}')

# Exemplo de uso
if __name__ == "__main__":
    conta = ContaBancaria()
    conta.depositar(100)
    conta.sacar(30)
    conta.exibir_saldo()

    # Desafio Extra: Transferência entre contas
    outra_conta = ContaBancaria(50)
    def transferir(origem: ContaBancaria, destino: ContaBancaria, valor: float) -> None:
        if origem.saldo >= valor:
            origem.sacar(valor)
            destino.depositar(valor)
            print(f'Transferido R${valor:.2f} com sucesso!')
        else:
            print('Transferência não realizada: saldo insuficiente.')

    transferir(conta, outra_conta, 40)
    conta.exibir_saldo()
    outra_conta.exibir_saldo()