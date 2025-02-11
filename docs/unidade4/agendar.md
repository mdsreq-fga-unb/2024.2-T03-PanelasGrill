# **UC: Agendar Consulta**

## **1 Breve Descrição**

Este caso de uso permite ao paciente realizar o agendamento de um serviço de saúde através do Connect Care. O paciente pode filtrar por especialidade, selecionar data e horário, visualizar locais e profissionais disponíveis, e confirmar o agendamento. O paciente também pode gerenciar seus agendamentos, incluindo cancelar ou remarcar consultas, e acompanhar o status de seus agendamentos.

## **2 Atores**

- **2.1** Paciente

## **3. Condições Prévias**

- **3.1** Paciente autenticado no sistema.
- **3.2** Disponibilidade de profissionais de saúde e locais.

## **4. Fluxo Básico de Eventos**

- **4.1** O usuário seleciona a opção “Agendar serviço de saúde”.
- **4.2** O sistema apresenta as opções: Realizar novo agendamento, Remarcar agendamento [FA01], Cancelar agendamento [FA02], Consultar agendamentos [FA03].
- **4.3** O usuário seleciona a opção de realizar um novo agendamento.
- **4.4** O usuário seleciona a especialidade desejada. [FE03][RN01]
- **4.5** O usuário seleciona a data desejada. [FE03][RN01]
- **4.6** O sistema valida a data. [FE01][FE02][RN03]
- **4.7** O sistema mostra os horários e locais disponíveis. [FE04][RN02]
- **4.8** O usuário seleciona um agendamento único. [FA04]
- **4.9** O sistema apresenta um resumo do agendamento.
- **4.10** O usuário confirma o agendamento.
- **4.11** O sistema apresenta uma mensagem de agendamento realizado com sucesso.
- **4.12** O caso de uso é encerrado.

## **5. Fluxos Alternativos**

- **5.1** **[FA01] Remarcar Agendamento**:
  1. No passo 4.2, o usuário seleciona a opção "Remarcar agendamento".
  2. O sistema exibe os agendamentos ativos do paciente. [FE05][RN02]
  3. O paciente escolhe um agendamento para remarcar. [FE06][RN04]
  4. O paciente seleciona uma nova opção e confirma a remarcação.
  5. O sistema atualiza o status do agendamento.
  6. O sistema emite uma mensagem de sucesso.

- **5.2** **[FA02] Cancelar Agendamento**:
  1. No passo 4.2, o usuário seleciona a opção "Cancelar agendamento".
  2. O sistema exibe os agendamentos ativos do paciente. [FE05][RN02]
  3. O paciente escolhe um agendamento para cancelar. [FE06][RN04]
  4. O sistema solicita confirmação do cancelamento.
  5. O paciente confirma e o sistema remove o agendamento.

- **5.3** **[FA03] Consultar Agendamentos**:
  1. No passo 4.2, o usuário seleciona a opção "Consultar agendamentos".
  2. O sistema exibe a lista de agendamentos futuros e passados. [FE05][RN02]
  3. O usuário aciona um agendamento específico.
  4. O sistema exibe as informações:
     - Data e horário
     - Especialidade
     - Profissional de saúde
     - Local de atendimento.

- **5.4** **[FA04] Sair do Agendamento**:
  1. No passo 4.8, se o sistema não apresentar uma data que agrade o usuário, ele pode selecionar a opção "cancelar" e sair do agendamento.

## **6. Fluxos de Exceção**

- **6.1** **[FE01] Data anterior à atual**: "As datas devem ser maiores que a de hoje". O caso de uso retorna ao passo 4.5.
- **6.2** **[FE02] Data com mais de um ano à frente**: "As datas não devem ser de mais de um ano". O caso de uso retorna ao passo 4.5.
- **6.3** **[FE03] Cliente não digitou as informações necessárias**: O sistema impede que o cliente avance para o próximo passo caso as informações estejam incompletas.
- **6.4** **[FE04] Sem disponibilidade para a data ou especialidade selecionada**: O sistema emite um alerta de falta de disponibilidade e retorna ao passo 4.5.
- **6.5** **[FE05] Nenhum agendamento no sistema**: O usuário não possui nenhum agendamento no sistema. O usuário retorna ao passo anterior.
- **6.6** **[FE06] Impossibilidade de ajuste no agendamento**: O usuário é impedido de realizar a tarefa e volta ao passo 4.1.

## **7. Regras de Negócio**

- **7.1** **[RN01] Validação dos Dados**: Para que o sistema realize o pré-agendamento, é necessário que a especialidade e a data estejam selecionadas corretamente.
- **7.2** **[RN02] Agrupamento por Agenda**: O sistema fornece agendamentos agrupados com a especialidade, data, horário e local.
- **7.3** **[RN03] Validação das Datas**: As datas preenchidas devem seguir os seguintes critérios:
  - Ser posteriores ou iguais ao dia atual.
  - Ser de até um ano após o dia atual.
- **7.4** **[RN04] Cancelamento e Remarcação**: O paciente pode cancelar ou remarcar consultas apenas até 24 horas antes do horário marcado.

## **8. Pós-Condições**

- **8.1** Consulta registrada no sistema.
- **8.2** Notificação enviada ao paciente e ao profissional de saúde.

## **9. Pontos de Extensão**

- **9.1** **Receber confirmação da consulta**: O sistema deve enviar uma confirmação ao paciente após o agendamento ser realizado com sucesso.

## **10. Requisitos Especiais**

- **10.1** O sistema deve validar as datas selecionadas para garantir que sejam posteriores à data atual e não ultrapassem um ano. [RN03]
- **10.2** O sistema deve garantir que o paciente possa cancelar ou remarcar consultas apenas até 24 horas antes do horário marcado. [RN04]

## **11. Informações Adicionais**

- **11.1** O sistema deve fornecer uma interface amigável e intuitiva para facilitar o agendamento.
- **11.2** O sistema deve enviar notificações automáticas para o paciente e o profissional de saúde após o agendamento.


[Retornar para Casos de Uso](UC.md)