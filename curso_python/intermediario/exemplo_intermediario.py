# Exemplo Intermediário
"""
Funções, tipagem, boas práticas e desafio extra.
"""

def soma(a: int, b: int) -> int:
    """Retorna a soma de dois números inteiros."""
    return a + b

print('Soma de 2 + 3:', soma(2, 3))

def par_ou_impar(n: int) -> str:
    """Verifica se um número é par ou ímpar."""
    return 'par' if n % 2 == 0 else 'ímpar'

print('7 é', par_ou_impar(7))

# Desafio Extra: Função para inverter uma string
def inverter(texto: str) -> str:
    return texto[::-1]

print('Desafio: inverter "Python" ->', inverter('Python'))