# **1. REQUISITOS DE SOFTWARE**

## Histórico de revisão

|Data      |Versão    |Descrição                                |Autores|
|----------|----------|-----------------------------------------|-------|
|15/12/2024|0.1       |Adicionando os requisitos do produto     |Marcos |
|16/12/2024|0.2       |Separando os Requisitos em três colunas   |Marcos |

------------

## **1.1 Lista de Requisitos Funcionais**

Os requisitos funcionais especificam as funcionalidades que o sistema deve implementar para atender às necessidades operacionais do Panelas Grill. A seguir, apresenta-se o conjunto preliminar de requisitos.

| **ID**    | **Funcionalidade**                         | **Descrição**                                                                                     |
|-----------|--------------------------------------------|---------------------------------------------------------------------------------------------------|
| **RF01**  | Autenticar na plataforma                   | Dar acesso à plataforma a um usuário já cadastrado.                         |
| **RF02**  | Gerar relatório diário de estoque          | Disponibilizar, ao final do expediente, um relatório detalhado das entradas e saídas de itens no estoque. |
| **RF03**  | Visualizar relatório mensal de estoque     | Fornecer relatórios mensais de movimentação de estoque.                                           |
| **RF04**  | Atualizar insumos                          | Permitir a atualização das informações dos insumos no estoque.                                   |
| **RF05**  | Consultar insumos no estoque               | Permitir a consulta detalhada dos insumos disponíveis no estoque.                                |
| **RF06**  | Registrar novos insumos no estoque         | Permitir a adição de novos insumos no estoque.                                                   |
| **RF07**  | Cadastrar cardápio                         | Permitir o registro de cardápios, associando os insumos necessários.                             |
| **RF08**  | Notificar insumos em baixo estoque         | Enviar notificações automáticas sobre insumos com estoque abaixo do limite mínimo.               |
| **RF09**  | Cadastrar insumos                          | Permitir o registro de insumos utilizados na produção.                                           |
| **RF10**  | Notificar insumos com vencimento próximo   | Enviar alertas automáticos para determinados insumos com validade próxima.                       |
| **RF11**  | Analisar custo de pratos                   | Calcular o custo de pratos para auxílio na definição de preços e controle de margem.             |
| **RF12**  | Editar cardápios                           | Atualizar os insumos utilizados no cardápio.                                                     |
| **RF13**  | Excluir cardápios                          | Permitir a exclusão de cardápios na plataforma.                                                  |
| **RF14**  | Excluir insumos                            | Permitir a exclusão de insumos na plataforma.                                                    |
| **RF15**  | Oferecer dashboard de análise de indicadores | Oferecer um painel visual com gráficos e métricas, como insumos mais utilizados e itens com maior custo. |
| **RF16**  | Implementar pesquisa inteligente           | Implementar um sistema de busca avançada para encontrar insumos ou cardápios por nome, categoria ou data de criação. |
| **RF17**  | Registrar histórico de movimentações do estoque | Registrar todas as movimentações realizadas no estoque, permitindo consultas detalhadas de eventos passados. |

## **1.2 Lista de Requisitos Não Funcionais**

Os requisitos não funcionais descrevem as características de qualidade que o sistema deve possuir para garantir sua eficiência, usabilidade e manutenção.

| Código | Descrição                                                                                                                                                                                                 |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RNF01  | **Suportabilidade (Supportability)**: O sistema deve funcionar corretamente em navegadores modernos como Google Chrome (versão 90 ou superior), Mozilla Firefox (versão 88 ou superior), Safari (versão 14 ou superior), além de ser compatível com sistemas operacionais Android (versão 10 ou superior) e iOS (versão 13 ou superior), garantindo uma experiência consistente em diferentes plataformas. |
| RNF02  | **Usabilidade (Usability)**: A interface deve ser intuitiva, permitindo que os usuários realizem tarefas como localizar cardápios em poucos cliques, sem necessidade de suporte. Todas as funcionalidades principais devem ser acessíveis de forma clara e eficiente, minimizando erros e garantindo uma navegação fluida. |
| RNF03  | **Desempenho (Performance)**: O sistema deve processar e responder às solicitações de consulta de insumos em até 2 segundos, mesmo quando houver um grande volume de itens cadastrados no estoque. |
| RNF04  | **Escalabilidade (Scalability)**: O sistema deve ser capaz de suportar um grande volume de dados, sem degradação significativa no desempenho.                                                                 |
| RNF05  | **Manutenibilidade (Maintainability)**: O código do sistema deve ser bem documentado e estruturado, facilitando a manutenção e a implementação de novas funcionalidades.                                                                         |
