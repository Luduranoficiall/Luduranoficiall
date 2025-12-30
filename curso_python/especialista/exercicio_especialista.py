# Exercício Especialista
# Crie uma função que recebe um DataFrame e retorna apenas as linhas onde a idade é maior que 28.
import pandas as pd

dados = {'Nome': ['Lucas', 'Ana', 'Bruno'], 'Idade': [30, 25, 29]}
df = pd.DataFrame(dados)
print(df[df['Idade'] > 28])