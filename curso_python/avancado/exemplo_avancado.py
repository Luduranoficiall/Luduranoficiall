# Exemplo Avançado
"""
Demonstração de Programação Orientada a Objetos (POO) em Python.
Inclui boas práticas, tipagem e desafio extra.
"""

class Pessoa:
    """Representa uma pessoa com nome e idade."""
    def __init__(self, nome: str, idade: int) -> None:
        self.nome = nome
        self.idade = idade

    def apresentar(self) -> str:
        """Retorna uma apresentação personalizada."""
        return f'Olá, eu sou {self.nome} e tenho {self.idade} anos.'

# Exemplo de uso
if __name__ == "__main__":
    pessoa = Pessoa('Lucas', 30)
    print(pessoa.apresentar())

    # Desafio Extra: Classe Carro
    class Carro:
        """Representa um carro com modelo e ano."""
        def __init__(self, modelo: str, ano: int) -> None:
            self.modelo = modelo
            self.ano = ano

        def exibir_info(self) -> None:
            print(f'Carro: {self.modelo} | Ano: {self.ano}')

    carro = Carro('Tesla Model S', 2022)
    carro.exibir_info()

    # Dica de produtividade:
    # Use f-strings para formatação e sempre documente suas classes!