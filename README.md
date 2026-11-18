Questão 09 — Sistema de Pedidos de uma Lanchonete
Descrição
Aplicativo desenvolvido com React Native e Expo para selecionar produtos de uma lanchonete, informar quantidades e montar um pedido com subtotais e valor total.
Produtos disponíveis
Produto	Preço unitário
Sanduíche	R$ 8,00
Suco	R$ 5,00
Salgado	R$ 6,00
Refrigerante	R$ 4,00


Funcionalidades
- Apresentar pelo menos quatro produtos com nome e preço.
- Permitir selecionar um produto.
- Informar a quantidade desejada.
- Armazenar os itens do pedido como objetos em um array.
- Calcular o subtotal de cada item.
- Calcular o total do pedido.
- Atualizar a quantidade quando o mesmo produto for adicionado novamente.
- Permitir remover itens do pedido.
- Apresentar o resumo do pedido e a quantidade total de unidades.
- Validar a seleção do produto e a quantidade informada.
Fórmulas utilizadas
- Subtotal do item: preço unitário × quantidade.
- Total do pedido: soma dos subtotais de todos os itens.
Exemplo de utilização
- 2 sanduíches de R$ 8,00: R$ 16,00.
- 1 suco de R$ 5,00: R$ 5,00.
- Total esperado: R$ 21,00.
Como executar
1. Abra o terminal na pasta deste projeto.
2. Instale as dependências, se necessário: npm.cmd install.
3. Inicie o projeto para navegador: npx.cmd expo start --web.
4. Abra no navegador o endereço apresentado pelo Expo.
No PowerShell do Windows, use os comandos com .cmd caso npm ou npx sejam bloqueados pela política de execução de scripts.