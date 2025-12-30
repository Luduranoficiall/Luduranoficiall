# Exercício Intermediário
# Crie uma função que recebe uma lista de nomes e retorna apenas os nomes que começam com a letra 'A'.
def filtra_nomes(lista):
    return [nome for nome in lista if nome.startswith('A')]

print(filtra_nomes(['Ana', 'Lucas', 'Amanda', 'Bruno']))