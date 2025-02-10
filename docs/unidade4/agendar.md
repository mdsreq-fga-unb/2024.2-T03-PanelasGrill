# 1. Agendar Consulta

## **1.1 Breve Descrição**

Este caso de uso permite ao paciente realizar o agendamento de um serviço de saúde através do Connect Care. O paciente pode filtrar por especialidade, selecionar data e horário, visualizar locais e profissionais disponíveis, e confirmar o agendamento. O paciente também pode gerenciar seus agendamentos, incluindo cancelar ou remarcar consultas, e acompanhar o status de seus agendamentos.

## **1.2 Atores**

- Paciente

## **2. Fluxo Básico de Eventos**

- **2.1** O usuário seleciona a opção “Agendar serviço de saúde”.
- **2.2** O sistema apresenta as opções: Realizar novo agendamento, Remarcar agendamento [FA01], Cancelar agendamento [FA02], Consultar agendamentos [FA03].
- **2.3** O usuário seleciona a opção de realizar um novo agendamento.
- **2.4** O usuário seleciona a especialidade desejada. [FE03][RN01]
- **2.5** O usuário seleciona a data desejada. [FE03][RN01]
- **2.6** O sistema valida a data. [FE01][FE02][RN03]
- **2.7** O sistema mostra os horários e locais disponíveis. [FE04][RN02]
- **2.8** O usuário seleciona um agendamento único. [FA04]
- **2.9** O sistema apresenta um resumo do agendamento.
- **2.10** O usuário confirma o agendamento.
- **2.11** O sistema apresenta uma mensagem de agendamento realizado com sucesso.
- **2.12** O caso de uso é encerrado.

## **3. Fluxos Alternativos**

- **3.1** **[FA01] Remarcar Agendamento**:
  1. No passo 2.2, o usuário seleciona a opção "Remarcar agendamento".
  2. O sistema exibe os agendamentos ativos do paciente. [FE05][RN02]
  3. O paciente escolhe um agendamento para remarcar. [FE06][RN04]
  4. O paciente seleciona uma nova opção e confirma a remarcação.
  5. O sistema atualiza o status do agendamento.
  6. O sistema emite uma mensagem de sucesso.

- **3.2** **[FA02] Cancelar Agendamento**:
  1. No passo 2.2, o usuário seleciona a opção "Cancelar agendamento".
  2. O sistema exibe os agendamentos ativos do paciente. [FE05][RN02]
  3. O paciente escolhe um agendamento para cancelar. [FE06][RN04]
  4. O sistema solicita confirmação do cancelamento.
  5. O paciente confirma e o sistema remove o agendamento.

- **3.3** **[FA03] Consultar Agendamentos**:
  1. No passo 2.2, o usuário seleciona a opção "Consultar agendamentos".
  2. O sistema exibe a lista de agendamentos futuros e passados. [FE05][RN02]
  3. O usuário aciona um agendamento específico.
  4. O sistema exibe as informações:
     - Data e horário
     - Especialidade
     - Profissional de saúde
     - Local de atendimento.

- **3.4** **[FA04] Sair do Agendamento**:
  1. No passo 2.8, se o sistema não apresentar uma data que agrade o usuário, ele pode selecionar a opção "cancelar" e sair do agendamento.

## **4. Fluxos de Exceção**

- **4.1** **[FE01] Data anterior à atual**: "As datas devem ser maiores que a de hoje". O caso de uso retorna ao passo 2.5.
- **4.2** **[FE02] Data com mais de um ano à frente**: "As datas não devem ser de mais de um ano". O caso de uso retorna ao passo 2.5.
- **4.3** **[FE03] Cliente não digitou as informações necessárias**: O sistema impede que o cliente avance para o próximo passo caso as informações estejam incompletas.
- **4.4** **[FE04] Sem disponibilidade para a data ou especialidade selecionada**: O sistema emite um alerta de falta de disponibilidade e retorna ao passo 2.5.
- **4.5** **[FE05] Nenhum agendamento no sistema**: O usuário não possui nenhum agendamento no sistema. O usuário retorna ao passo anterior.
- **4.6** **[FE06] Impossibilidade de ajuste no agendamento**: O usuário é impedido de realizar a tarefa e volta ao passo 2.1.

## **5. Pré-Condições**

- **5.1** Paciente autenticado no sistema.
- **5.2** Disponibilidade de profissionais de saúde e locais.

## **6. Pós-Condições**

- **6.1** Consulta registrada no sistema.
- **6.2** Notificação enviada ao paciente e ao profissional de saúde.

## **7. Pontos de Extensão**

- **7.1** **Receber confirmação da consulta**: O sistema deve enviar uma confirmação ao paciente após o agendamento ser realizado com sucesso.

## **8. Requisitos Especiais**

- **8.1** O sistema deve validar as datas selecionadas para garantir que sejam posteriores à data atual e não ultrapassem um ano. [RN03]
- **8.2** O sistema deve garantir que o paciente possa cancelar ou remarcar consultas apenas até 24 horas antes do horário marcado. [RN04]

## **9. Informações Adicionais**

- **9.1** O sistema deve fornecer uma interface amigável e intuitiva para facilitar o agendamento.
- **9.2** O sistema deve enviar notificações automáticas para o paciente e o profissional de saúde após o agendamento.

## **10. Regras de Negócio**

- **10.1** **[RN01] Validação dos Dados**: Para que o sistema realize o pré-agendamento, é necessário que a especialidade e a data estejam selecionadas corretamente.
- **10.2** **[RN02] Agrupamento por Agenda**: O sistema fornece agendamentos agrupados com a especialidade, data, horário e local.
- **10.3** **[RN03] Validação das Datas**: As datas preenchidas devem seguir os seguintes critérios:
  - Ser posteriores ou iguais ao dia atual.
  - Ser de até um ano após o dia atual.
- **10.4** **[RN04] Cancelamento e Remarcação**: O paciente pode cancelar ou remarcar consultas apenas até 24 horas antes do horário marcado.

[Retornar para Casos de Uso](UC.md)