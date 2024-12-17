# **4. Priorização do Backlog e MVP**

## Histórico de revisão

|Data      |Versão    |Descrição                                |Autores|
|----------|----------|-----------------------------------------|-------|
|15/12/2024|0.1       |Desenvolvimento da priorização para o MVP|Marcos |

## 4.1 Priorização do Backlog

Para critério de priorização do backlog, utilizamos os indicadores: complexidade técnica e valor de négocio. Seus graus e descrições são apresentados na tabela a seguir:

|Grau de Complexidade Técnica|Descrição|
|----------------------------|---------|
|1                           |Tabelas de fácil e rápida execuçao, que demandam conhecimentos básicos.|
|2                           |Compreende tarefas com um grau de complexidade um pouco maior, mas ainda não apresenta muitos desafios.|
|3                           |Requer habilidades técnicas intermediárias, envolvendo desafios técnicos moderados.|
|4                           |Compreende tarefas mais desafiadoras, exigem conhecimentos técnicos avançados.|
|5                           |Inclui atividades complexas, demandam conhecimentos técnicos excepcionais e são de difícil execução.|

|Grau de Valor de Negócio|Descrição|
|------------------------|---------|
|1                       |Impacto mínimo no negócio, gerando poucos benefícios e com pouco impacto nos resultados gerais do negócio.|
|2                       |Traz benefícios úteis, mas contribuindo ainda de forma limitada para os objetivos do negócio.|
|3                       |Gera um valor significativo, contribuindo para melhorias relevantes no negócio.|
|4                       |Gera um alto impacto, gerando melhorias visíveis e competitivas.|
|5                       |Oferece um valor de negócio excepcional, transformando o negócio e diferenciando dos outros, criando oportunidades de liderança no mercado.|

### 4.2 Tabela de Priorização

Para calcular a priorização, utilizamos os User Stories (US) como base. Cada US é avaliado em termos de valor de negócio e complexidade técnica. A combinação desses dois fatores nos permite determinar a prioridade de cada item no backlog, ajudando a focar nos itens que trazem maior valor com menor esforço. O valor do resultado é dado pela fórmula:

```plaintext
2 * Valor de Negócio - Complexidade Técnica
```

| **US**  | **Valor de Negócio** | **Complexidade Técnica** | **Resultado** |
|---------|----------------------|--------------------------|---------------|
| **US04**|5                     |2                         |8              |
| **US02**|5                     |3                         |7              |
| **US10**|5                     |3                         |7              |
| **US08**|4                     |2                         |6              |
| **US14**|5                     |4                         |6              |
| **US09**|4                     |3                         |5              |
| **US11**|4                     |3                         |5              |
| **US03**|4                     |4                         |4              |
| **US13**|3                     |2                         |4              |
| **US01**|3                     |3                         |3              |
| **US05**|3                     |3                         |3              |
| **US12**|2                     |2                         |2              |
| **US16**|3                     |4                         |2              |
| **US06**|2                     |3                         |1              |
| **US07**|2                     |3                         |1              |
| **US15**|2                     |3                         |1              |

## 4.3 Definição do MVP  

Com base na priorização do backlog, foram selecionadas para o MVP as histórias de usuário com resultado **igual ou maior que 3**. Esse critério assegura que o MVP abranja funcionalidades essenciais, como controle de acesso, consulta de insumos, geração de relatórios e gerenciamento de estoque e cardápios, atendendo às demandas principais do sistema.

### 4.4 Tabela de Histórias de Usuário no MVP  

---

| **US**  | **Título**                                | **Descrição**                                                                                 |
|---------|------------------------------------------|---------------------------------------------------------------------------------------------|
| **US01** | Logar na plataforma                      | Eu como usuário quero logar na plataforma para acessar as informações de estoque e suas ferramentas. |
| **US02** | Gerar relatório diário                   | Eu como usuário quero gerar um relatório diário de movimentação de estoque ao final do expediente. |
| **US03** | Acessar relatórios mensais               | Eu como usuário quero acessar relatórios mensais de movimentação de estoque.                 |
| **US04** | Consultar insumos disponíveis            | Eu como usuário quero consultar os insumos disponíveis no estoque para planejar a produção e reposições. |
| **US05** | Editar insumos disponíveis               | Eu como usuário quero editar os insumos disponíveis para que os dados reflitam a realidade.  |
| **US08** | Consultar histórico de movimentações     | Eu como usuário quero consultar histórico de movimentações para rastrear alterações e verificar inconsistências. |
| **US09** | Cadastrar cardápio                       | Eu como usuário quero cadastrar o cardápio associando os insumos necessários para facilitar a organização e planejamento da cozinha. |
| **US10** | Registrar novos insumos                  | Eu como usuário quero registrar novos insumos utilizados na produção para manter o controle de estoque atualizado. |
| **US11** | Editar insumos associados ao cardápio    | Eu como usuário quero editar os insumos associados a um cardápio para refletir mudanças na receita ou produção. |
| **US13** | Excluir insumos                          | Eu como usuário quero excluir insumos que não são mais utilizados para manter o cadastro atualizado. |
| **US14** | Analisar custo de cada prato             | Eu como usuário quero analisar o custo de cada prato produzido para definir preços adequados e controlar margem. |

---
