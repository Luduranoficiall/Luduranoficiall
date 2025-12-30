# Exemplo Especialista
# Manipulação de dados com pandas
import pandas as pd

dados = {'Nome': ['Lucas', 'Ana'], 'Idade': [30, 25]}
df = pd.DataFrame(dados)
print(df)

# Exercício: Adicione uma coluna 'Profissão' ao DataFrame e exiba o resultado.
df['Profissão'] = ['Dev', 'Designer']
print(df)