# Exercício Intermediário
"""
Filtragem de nomes e desafio extra.
"""

from typing import List

def filtra_nomes(lista: List[str]) -> List[str]:
    """Retorna nomes que começam com 'A'."""
    return [nome for nome in lista if nome.upper().startswith('A')]

nomes = ['Ana', 'Lucas', 'Amanda', 'Bruno']
print('Nomes com A:', filtra_nomes(nomes))

# Desafio Extra: Retorne nomes com mais de 5 letras
def nomes_grandes(lista: List[str]) -> List[str]:
    return [nome for nome in lista if len(nome) > 5]

print('Nomes com mais de 5 letras:', nomes_grandes(nomes))