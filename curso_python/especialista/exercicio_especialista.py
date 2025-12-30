# Exercício Especialista
"""
Função para filtrar DataFrame, boas práticas e desafio extra.
"""

import pandas as pd

def filtrar_idade(df: pd.DataFrame, idade_min: int) -> pd.DataFrame:
	"""Retorna linhas onde a idade é maior que idade_min."""
	return df[df['Idade'] > idade_min]

dados = {'Nome': ['Lucas', 'Ana', 'Bruno'], 'Idade': [30, 25, 29]}
df = pd.DataFrame(dados)
print('DataFrame original:')
print(df)

print('\nIdade > 28:')
print(filtrar_idade(df, 28))

# Desafio Extra: Filtrar por profissão
df['Profissão'] = ['Dev', 'Designer', 'Analista']
print('\nProfissão == Dev:')
print(df[df['Profissão'] == 'Dev'])