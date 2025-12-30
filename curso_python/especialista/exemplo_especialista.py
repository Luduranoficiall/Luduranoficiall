# Exemplo Especialista
"""
Manipulação de dados com pandas, boas práticas e desafio extra.
"""

import pandas as pd

dados = {'Nome': ['Lucas', 'Ana'], 'Idade': [30, 25]}
df = pd.DataFrame(dados)
print('DataFrame inicial:')
print(df)

# Exercício: Adicione uma coluna 'Profissão' ao DataFrame e exiba o resultado.
df['Profissão'] = ['Dev', 'Designer']
print('\nDataFrame com profissão:')
print(df)

# Desafio Extra: Filtrar pessoas com idade maior que 26
print('\nPessoas com idade > 26:')
print(df[df['Idade'] > 26])