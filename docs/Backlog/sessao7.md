# **1 REQUISITOS DE SOFTWARE**

## Histórico de revisão

|Data      |Versão    |Descrição                                |Autores|
|----------|----------|-----------------------------------------|-------|
|15/12/2024|0.1       |Adicionando os requisitos do produto     |Marcos |

------------

## **1.1 Lista de Requisitos Funcionais**

Os requisitos funcionais especificam as funcionalidades que o sistema deve implementar para atender às necessidades operacionais do Panelas Grill. A seguir, apresenta-se o conjunto preliminar de requisitos.

| Código | Descrição                                                                                     |
|--------|-----------------------------------------------------------------------------------------------|
| RF01   | Logar na plataforma                     |
| RF02   | Gerar relatório diário de movimentação de estoque|
| RF03   | Visualizar relatório de entrada e saída de estoque (Mensal)|
| RF04   | Atualizar insumos do estoque |
| RF05   | Consultar estoque      |
| RF06   | Registrar insumos no estoque                |
| RF07   | Cadastrar cardápio     |
| RF08   | Notificar insumos em baixo estoque |
| RF09   | Cadastrar insumos                |
| RF10   | Notificar estoque próximo ao vencimento |
| RF11   | Analisar custo de pratos: |
| RF12   | Editar o cardápio                             |
| RF13   | Excluir cardápios                          |
| RF14   | Excluir insumo                               |
| RF15   | Dashboard de análise de indicadores|
| RF16   | Pesquisa inteligente|
| RF17   | Histórico de movimentações no estoque|

## **1.2 Lista de Requisitos Não Funcionais**

Os requisitos não funcionais descrevem as características de qualidade que o sistema deve possuir para garantir sua eficiência, usabilidade e manutenção.

| Código | Descrição                                                                                                                                                                                                 |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RNF01  | **Suportabilidade (Supportability)**: O sistema deve funcionar corretamente em navegadores modernos como Google Chrome (versão 90 ou superior), Mozilla Firefox (versão 88 ou superior), Safari (versão 14 ou superior), além de ser compatível com sistemas operacionais Android (versão 10 ou superior) e iOS (versão 13 ou superior), garantindo uma experiência consistente em diferentes plataformas. |
| RNF02  | **Usabilidade (Usability)**: A interface deve ser intuitiva, permitindo que os usuários realizem tarefas como localizar cardápios em poucos cliques, sem necessidade de suporte. Todas as funcionalidades principais devem ser acessíveis de forma clara e eficiente, minimizando erros e garantindo uma navegação fluida. |
| RNF03  | **Desempenho (Performance)**: O sistema deve processar e responder às solicitações de consulta de insumos em até 2 segundos, mesmo quando houver um grande volume de itens cadastrados no estoque. |
| RNF04  | **Escalabilidade (Scalability)**: O sistema deve ser capaz de suportar um grande volume de dados, sem degradação significativa no desempenho.                                                                 |
| RNF05  | **Manutenibilidade (Maintainability)**: O código do sistema deve ser bem documentado e estruturado, facilitando a manutenção e a implementação de novas funcionalidades.                                                                         |
