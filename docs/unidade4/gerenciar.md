# **UC: Gerenciar agenda**

## **1. Gerenciar Agenda**
- ### **1.1 Breve Descrição**
Este caso de uso descreve como um profissional da saúde ou um agente comunitário  utiliza o ConnectCarre para gerenciar sua agenda.

### **2 Atores**
- Agentes Comunitários da saúde
- Profissionais da saúde 
## **3. Condições prévias**
- **Agente Comunitário** 
    - 3.1.1 - O Agente Comunitário deve estar logado
    - 3.1.2 - O Agente Comunitário deve possuir um perfil ativo e autorizado

- **Profissionais da saúde**
    - 3.2.1 - O Profissional da saúde deve estar logado
    - 3.2.2 - O Profissional da saúde deve possuir um perfil ativo e autorizado

## **4. Fluxo Básico**
- **Agente Comunitário**
    - 4.1.1 - O agente comunitario  seleciona a opção "Gerenciar Agenda".
    - 4.1.2 - O sistema exibe a agenda do usuário, mostrando compromissos agendados e horários disponíveis.
    - 4.1.3 - O agente comunitario  pode executar uma das seguintes ações:

            - Adicionar um novo horário disponível (FA01).
            - Modificar um horário existente (FA02).
            - Cancelar um horário previamente agendado (FA03). 
    
    - 4.1.4 - O sistema processa a ação escolhida e atualiza a agenda conforme necessário.
    - 4.1.5 - O sistema exibe uma mensagem de confirmação da operação realizada
    - 4.1.6 - O agente comunitario finaliza suas atividades e encerra a sessão no sistema.

- **Profissionais da saúde**
    - 4.2.1 - O profissional da saúde  seleciona a opção "Gerenciar Agenda".
    - 4.2.2 - O sistema exibe a agenda do usuário, mostrando compromissos agendados e horários disponíveis.
    - 4.2.3 - O profissional da saúde  pode executar uma das seguintes ações:

            - Adicionar um novo horário disponível (FA01).
            - Modificar um horário existente (FA02).
            - Cancelar um horário previamente agendado (FA03).

    - 4.2.4 - O sistema processa a ação escolhida e atualiza a agenda conforme necessário.
    - 4.2.5 - O sistema exibe uma mensagem de confirmação da operação realizada
    - 4.2.6 - O profissional da saúde finaliza suas atividades e encerra a sessão no sistema.
 
## **5. Fluxo Alternativo**
- **FA01 - Adicionar um novo horário disponível**
    - 5.1.1 - O usuário seleciona a opção "Adicionar Horário Disponível"
    - 5.1.3 - O usuário informa os detalhes do horário, como data, período, local e observações.
    - 5.1.4 - O usuário confirma a inclusão do horário.
    - 5.1.5 - O sistema salva as informações e atualiza a agenda.
    - 5.1.6 - O sistema exibe uma mensagem de confirmação. 

- **FA02 - Modificar um horário existente**
    - 5.2.1 - O sistema exibe as informações do horário.
    - 5.2.2 - O usuário edita os campos desejados, como data, horário, e local
    - 5.2.3 - O usuário confirma as alterações.
    - 5.2.4 - O sistema salva as modificações e atualiza a agenda.
    - 5.2.5 - O sistema exibe uma mensagem de confirmação.

- **FA03 - Cancelar um horário previamente agendado**
    - 5.3.1 - O sistema solicita confirmação do cancelamento.
    - 5.3.2 - O usuário confirma a exclusão do compromisso.
    - 5.3.3 - O sistema remove o compromisso e atualiza a agenda.
    - 5.3.4 - O sistema exibe uma mensagem informando que o agendamento foi cancelado.
## **6. Fluxo de Exceção**
- **FE1 - Falha na conexão com o sistema**
    - 6.1.1 - Se houver problemas de conexão, o sistema exibe uma mensagem de erro e orienta o usuario  a tentar novamente mais tarde.

- **FE2 - Tentativa de adicionar horários duplicados**
    - 6.2.1 Se o profissional tentar adicionar um horário que já existe na agenda, o sistema impede a duplicação e exibe uma mensagem informando o conflito.

- **FE3 - Modificação de horário sem informações obrigatórias**
    - 6.3.1 No passo 5.2.3 do fluxo alternativo, o usuário tenta modificar um horário sem preencher os dados obrigatórios, como data, hora e local
    - 6.3.2 O sistema exibe a mensagem: "Preencha todos os campos obrigatórios para salvar a alteração."
    - 6.3.3 O sistema impede a alteração até que os campos sejam preenchidos corretamente.


- **FE4 - Adicionar horário sem informações obrigatórias**
    - 6.4.1 No passo 5.1.4 do fluxo alternativo, o usuário tenta modificar um horário sem preencher os dados obrigatórios, como data, período, local e observações.
    - 6.4.2 O sistema exibe a mensagem: "Preencha todos os campos obrigatórios para salvar a alteração."
    - 6.4.3 O sistema impede a alteração até que os campos sejam preenchidos corretamente.
    
## **7. Regras de Negócio (RN)**
- **RN01 - Validação de horários disponíveis**
    - 7.1.1 - No passo 5.1.3 do fluxo alternativo, o sistema deve verificar se o horário não se sobrepõe a um compromisso já agendado.
    - 7.1.2. Caso haja sobreposição, o sistema deve impedir a ação e exibir a mensagem: "Este horário já está ocupado. Escolha outro horário disponível."

- **RN02 - Cancelamento de consultas agendadas**
    - 7.2.1. No passo 5.3.1 do fluxo alternativo, o sistema deve registrar a justificativa do cancelamento.

- **RN03 - Registros de alterações na agenda**
    - 7.3.1 - Toda modificação na agenda (Adicionar, alteração ou cancelamento de horário) deve ser registrada no histórico do sistema.
    - 7.3.2 - O histórico deve conter data, horário da alteração e o responsável pela modificação.

## **8. Pós-Condições**
- **8.1** Após a realização do agendamento, o novo compromisso deve estar salvo e visível na agenda do profissional.

- **8.2** Caso um horário tenha sido modificado, as alterações devem ser refletidas na agenda e notificadas ao paciente.

- **8.3** Se um horário foi cancelado, ele deve ser removido da agenda e o paciente deve ser notificado.

- **8.4** Todas as ações realizadas (adicionar, alteração ou cancelamento de agendamentos) devem estar registradas no histórico do sistema.


[Retornar para Casos de Uso](UC.md)
