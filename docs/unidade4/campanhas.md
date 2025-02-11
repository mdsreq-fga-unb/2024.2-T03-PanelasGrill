# **UC: Gerenciar Iniciativas de Saúde**

## **1 Breve Descrição**
O caso de uso permite que a Organização Parceira possa cadastrar e atualizar se necessário campanhas de saúde (vacinação, ações educativas e mutirão de atendimento).

## **2 Atores**
- **2.1** Organização Parceira

## **3. Condições Prévias**
- **3.1** A organização parceira deve estar previamente cadastrada e validada no sistema.
- **3.2** O sistema deve estar online e operacional para a realização das operações de cadastro, promoção e geração de relatórios.
- **3.3** [PE03] O sistema deve atualizar constantemente os feedbacks dos pacientes que participaram das campanhas para visualização do monitoramento

## **4. Fluxo Básico de Eventos**
- **4.1** O usuário acessa a área destinada ao gerenciamento das iniciativas de saúde, podendo escolher entre registrar nova campanha, atualizar campanha existente [FA01] e monitor impacto das campanhas ativas [PE01].
- **4.2** O usuário seleciona o tipo de iniciativa (campanha de vacinação, mutirão de atendimento e ação educativa).
- **4.3** O usuário preenche dados obrigatórios, como público-alvo, localização e duração.
- **4.4** O usuário submete o cadastro. [FE01]
- **4.5** O sistema registra a iniciativa no banco de dados .
- **4.6** O sistema promove a campanha para a faixa etária e/ou pessoas com as doenças especificadas e que estão em uma área próxima da localização informada.
- **4.7** O caso de uso é encerrado

## **5. Fluxos Alternativos**
- **5.1 [FA01]** Atualizar campanha
    - **5.1.1** O sistema verifica se há campanhas ativas dessa organização [FE02]
    - **5.1.2** O usuário visualiza uma lista de campanhas ativas da sua organização 
    - **5.1.2** O usuário escolhe a campanha que deseja alterar e retorna ao 4.2

## **6. Fluxos de Exceção**
- **6.1 [FE01]** Validação do formulário
    - **6.1.1** O sistema identifica se há inconsistências no formulário enviado, a partir da [RN01], se não houver retorna para o 4.5
    - **6.1.2** O sistema exibe uma mensagem do erro no preenchimento do formulário e retorna para 4.3
- **6.2 [FE02]** Visualizar campanhas
    - **6.2.1** O sistema identifica se há iniciativas ativas da organização parceira, se não houver exibe mensagem de que não há campanhas ativas e coloca o usuário no fluxo básico 4.2 para criação de uma campanha de saúde
    - **6.2.2** O sistema retorna uma lista das campanhas ativas

## **7. Regras de Negócio**
- **7.1 RN01** O público-alvo deve ter 2 campos, um de faixa etária e outro de condições de saúde, ao menos um dos campos deve estar preenchido (exemplo: "Pessoas acima de 50 anos" ou "Pacientes que possuem doenças cardíacas"), a localização deve estar preenchida e a data e a hora da iniciativa também, caso não esteja não será validado.

## **8. Pós-Condições**
- **8.1** [PC01] A iniciativa de saúde é registrada no banco de dados e está disponível para futuras consultas e edições.
- **8.2** [PC02] O sistema executa a promoção da campanha para os usuários segmentados, enviando notificação sobre a campanha de acordo com os critérios definidos.

## **9. Pontos de Extensão**
- **9.1 Monitorar impacto das campanhas** [PE01] O usuário pode visualizar o feedback dos pacientes que participaram das campanhas, tendo como pré-condição [FE02]

[Retornar para Casos de Uso](UC.md)
