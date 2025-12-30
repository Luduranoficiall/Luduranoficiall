# Exemplo Avançado
# Classe Pessoa com método de apresentação
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
    def apresentar(self):
        return f'Olá, eu sou {self.nome} e tenho {self.idade} anos.'

p = Pessoa('Lucas', 30)
print(p.apresentar())

# Exercício: Crie uma classe Carro com atributos modelo e ano, e um método exibir_info.