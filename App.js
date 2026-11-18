
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';

export default function App() {

  // Lista de produtos disponíveis na lanchonete
  const produtos = [
    { id: 1, nome: 'Sanduíche', preco: 8 },
    { id: 2, nome: 'Suco', preco: 5 },
    { id: 3, nome: 'Salgado', preco: 6 },
    { id: 4, nome: 'Refrigerante', preco: 4 },
  ];

  // Guardar o produto selecionado
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Guardar a quantidade escolhida
  const [quantidade, setQuantidade] = useState('1');

  // Array que armazena os itens do pedido
  const [pedido, setPedido] = useState([]);

  // Mensagens do aplicativo
  const [mensagem, setMensagem] = useState('');

  // Formatar valores em reais
  function moeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Adicionar produto ao pedido
  function adicionarPedido() {

    const qtd = Number(quantidade);

    if (produtoSelecionado === null) {
      setMensagem('Selecione um produto.');
      return;
    }

    if (
      quantidade.trim() === '' ||
      !Number.isInteger(qtd) ||
      qtd <= 0
    ) {
      setMensagem('Digite uma quantidade inteira maior que zero.');
      return;
    }

    // Verificar se o produto já está no pedido
    const itemExistente = pedido.find(
      item => item.id === produtoSelecionado.id
    );

    if (itemExistente) {

      // Atualizar a quantidade do produto existente
      setPedido(atual =>
        atual.map(item => {

          if (item.id === produtoSelecionado.id) {

            const novaQuantidade = item.quantidade + qtd;

            return {
              ...item,
              quantidade: novaQuantidade,
              subtotal: item.preco * novaQuantidade,
            };

          }

          return item;

        })
      );

    } else {

      // Criar objeto com os dados do produto
      const novoItem = {
        id: produtoSelecionado.id,
        nome: produtoSelecionado.nome,
        preco: produtoSelecionado.preco,
        quantidade: qtd,
        subtotal: produtoSelecionado.preco * qtd,
      };

      // Adicionar o objeto ao array
      setPedido(atual => [...atual, novoItem]);

    }

    setQuantidade('1');
    setProdutoSelecionado(null);
    setMensagem('Produto adicionado ao pedido!');

  }

  // Remover produto do pedido
  function removerItem(id) {

    setPedido(atual =>
      atual.filter(item => item.id !== id)
    );

    setMensagem('Produto removido do pedido.');

  }

  // Calcular o valor total do pedido
  const total = pedido.reduce(
    (soma, item) => soma + item.subtotal,
    0
  );

  // Calcular a quantidade total de unidades
  const quantidadeTotal = pedido.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Lanchonete Universitária
      </Text>

      <Text style={styles.subtitulo}>
        Escolha um produto:
      </Text>

      {/* Mostrar os produtos disponíveis */}

      {produtos.map(produto => (

        <Pressable
          key={produto.id}
          style={[
            styles.produto,
            produtoSelecionado?.id === produto.id &&
            styles.selecionado
          ]}
          onPress={() => {
            setProdutoSelecionado(produto);
            setMensagem('');
          }}
        >

          <Text style={styles.nome}>
            {produto.nome}
          </Text>

          <Text style={styles.preco}>
            {moeda(produto.preco)}
          </Text>

          <Text style={styles.textoSelecao}>
            {produtoSelecionado?.id === produto.id
              ? 'Produto selecionado'
              : 'Toque para selecionar'}
          </Text>

        </Pressable>

      ))}

      <Text style={styles.subtitulo}>
        Produto escolhido:
      </Text>

      <Text style={styles.escolhido}>
        {produtoSelecionado
          ? produtoSelecionado.nome
          : 'Nenhum produto selecionado'}
      </Text>

      <Text style={styles.subtitulo}>
        Informe a quantidade:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Exemplo: 2"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <View style={styles.botao}>

        <Button
          title="Adicionar ao pedido"
          onPress={adicionarPedido}
          color="#A04000"
        />

      </View>

      {mensagem !== '' && (

        <Text style={styles.mensagem}>
          {mensagem}
        </Text>

      )}

      {/* Resumo do pedido */}

      <Text style={styles.subtitulo}>
        Resumo do pedido:
      </Text>

      {pedido.length === 0 && (

        <Text style={styles.vazio}>
          Nenhum produto adicionado.
        </Text>

      )}

      {pedido.map(item => (

        <View style={styles.card} key={item.id}>

          <Text style={styles.nome}>
            {item.nome}
          </Text>

          <Text style={styles.informacao}>
            Quantidade: {item.quantidade}
          </Text>

          <Text style={styles.informacao}>
            Preço unitário: {moeda(item.preco)}
          </Text>

          <Text style={styles.subtotal}>
            Subtotal: {moeda(item.subtotal)}
          </Text>

          <View style={styles.botaoRemover}>

            <Button
              title="Remover item"
              color="#C0392B"
              onPress={() => removerItem(item.id)}
            />

          </View>

        </View>

      ))}

      {/* Apresentar o total final */}

      <View style={styles.totalCard}>

        <Text style={styles.total}>
          Total do pedido:
        </Text>

        <Text style={styles.valorTotal}>
          {moeda(total)}
        </Text>

        <Text style={styles.resumo}>
          Quantidade de unidades: {quantidadeTotal}
        </Text>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: '#FDF2E9',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#A04000',
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 12,
    color: '#873600',
  },

  produto: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  selecionado: {
    borderColor: '#287A44',
    borderWidth: 2,
    backgroundColor: '#E9F7EF',
  },

  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#873600',
  },

  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#287A44',
  },

  textoSelecao: {
    fontSize: 13,
    marginTop: 6,
    color: '#666',
  },

  escolhido: {
    fontSize: 17,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#AAA',
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },

  botao: {
    marginTop: 5,
  },

  mensagem: {
    textAlign: 'center',
    marginTop: 15,
    color: '#287A44',
    fontWeight: 'bold',
  },

  vazio: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F5CBA7',
  },

  informacao: {
    fontSize: 15,
    marginBottom: 7,
    color: '#333',
  },

  subtotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#287A44',
  },

  botaoRemover: {
    marginTop: 12,
  },

  totalCard: {
    backgroundColor: '#F5CBA7',
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 30,
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#873600',
  },

  valorTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#196F3D',
  },

  resumo: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
  },

});
