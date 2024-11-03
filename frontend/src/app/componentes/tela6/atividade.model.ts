// nota.model.ts
export interface Nota {
  texto: string; // Exemplo de propriedade que Nota pode ter
  dia: number;   // Propriedade específica para Nota
}

// atividade.model.ts
export interface Atividade {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  data: string;
}
