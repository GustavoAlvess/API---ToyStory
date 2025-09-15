import dados from "../models/dados.js";
const { personagens } = dados;

const getAllPersonagens = (req, res) => {
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.query;
  let resultado = personagens;

  if (tipo) {
    resultado = resultado.filter(
      (b) => b.tipo.toLowerCase() === tipo.toLowerCase()
    );
  }
  if (cor) {
    resultado = resultado.filter(
      (b) => b.cor.toLowerCase() === cor.toLowerCase()
    );
  }
  if (quantidadeEstoque) {
    resultado = resultado.filter(
      (b) => b.quantidadeEstoque.toLowerCase() === quantidadeEstoque.toLowerCase()
    );
  }

  if (anoFabricacao) {
    resultado = resultado.filter((b) => b.anoFabricacao == anoFabricacao);
  }

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
};

const getByIdPersonagens = (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  const personagem = personagens.find((b) => b.id === id);

  if (personagem) {
    res.status(200).json(personagem);
  } else {
    res.status(404).json({
      message: "Nenhum personagem com esse ID",
    });
  }
};

const createPersonagem = (req, res) => {
    const { nome, tipo, anoFabricacao, cor, quantidadeEstoque} =
    req.body;

  // Validação de campos obrigatórios
  if (!nome || !tipo ) {
    return res.status(400).json({
      success: false,
      message: "Nome, tipo são obrigatórios para um personagem!",
    });
  }

  
  // Criar novo herói
  const novoPersonagem = {
      id: personagens.length + 1,
      nome: nome,
      tipo: tipo,
      anoFabricacao:anoFabricacao,
      cor: cor,
      quantidadeEstoque: quantidadeEstoque
      
    };
    
    // Adicionar à lista de heróis
    personagens.push(novoPersonagem);
    
    res.status(201).json({
        success: true,
        message: "Novo personagem cadastrado!",
        data: novoPersonagem,
    });
}
const deletePersonagem = (req, res) => {
    let id = req.params.id;
  id = parseInt(id);

  if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const idParaApagar = parseInt(id);
    
    // Verificar se bruxo existe antes de remover
    const personagemParaRemover = personagens.find(b => b.id === idParaApagar);
    if (!personagemParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Personagem com ID ${id} não encontrado para remoção!`
        });
    }

    // Remover barbie usando filter
    const personagensFiltrados = personagens.filter(bruxo => bruxo.id !== idParaApagar);
    
    // Atualizar array global
    personagens.splice(0, personagens.length, ...personagensFiltrados);

    res.status(200).json({
        success: true,
        message: `Personagem ${personagemParaRemover.nome} (ID: ${id}) foi removido dos registros do mundo ToyStory.`,
        personagemRemovido: personagemParaRemover
    });
}

// PUT /barbies/:id - Atualizar bruxo existente por ID
const updatePersonagem = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

  // Validar ID
  if (isNaN(id)) {
      return res.status(400).json({
          success: false,
          message: "ID deve ser um número válido!"
      });
  }

  const idParaEditar = parseInt(id);
  
  // Verificar se barbie existe
  const personagemExiste = personagens.find(b => b.id === idParaEditar);
  if (!personagemExiste) {
      return res.status(404).json({
          success: false,
          message: `Personagem com ID ${id} não encontrada para atualização!`
      });
  }

  // Atualizar barbie usando map
  const personagensAtualizados = personagens.map(personagem => 
      personagem.id === idParaEditar 
          ? { 
              ...personagem, 
              ...(nome && { nome }),
              ...(tipo && { tipo }),
              ...(cor && { cor }),
              ...(quantidadeEstoque && { quantidadeEstoque: parseInt(quantidadeEstoque) }),
              ...(anoFabricacao && { anoFabricacao: parseInt(anoFabricacao) }),
                }
          : personagem
  );

  // Atualizar array global
  personagens.splice(0, personagens.length, ...personagensAtualizados);

  // Buscar barbie atualizada para retorno
  const personagemAtualizado = personagens.find(b => b.id === idParaEditar);

  res.status(200).json({
      success: true,
      message: `Dados da barbie ID ${id} atualizados com sucesso!`,
      personagem: personagemAtualizado
  });
};

const getPersonagensByEstoque = (req, res) => {
    const maisEstoque = Math.max(...personagens.map(p => p.quantidadeEstoque));
    const resultado = personagens.filter(
        p => p.quantidadeEstoque === maisEstoque)

        res.status(200).json({
            success: true,
            message: "Personagem com mais estoque encontrado!",
            personagem: resultado,
        });
      }
    



export { getAllPersonagens, getByIdPersonagens, createPersonagem, updatePersonagem, deletePersonagem, getPersonagensByEstoque};
