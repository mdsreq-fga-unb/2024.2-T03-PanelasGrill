# CASOS DE USO - ConnectCare

**Casos De Uso** são uma técnica de modelagem utilizada na engenharia de software para capturar e descrever os requisitos funcionais de um sistema a partir da perspectiva dos usuários. Em essência, eles representam as interações entre os "atores" e o sistema, detalhando como esses atores utilizam os recursos disponíveis para alcançar um objetivo específico.

O estudo de caso escolhido pelo grupo foi o **ConnectCare** que é um aplicativo que foi concebido com a missão principal de reduzir as desigualdades no acesso à saúde em comunidades mais vulneráveis, tendo como principal função conectar pacientes a profissionais e serviços de saúde por meio da tecnologia de uma maneira eficiente e acessível.

**Diagrama de Casos de Uso**:

<div style="text-align:center;">
    <iframe width="1534" height="868" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=uml.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1jFgbUHnHkhjGAVR4HeIKUZ9j6qGjQXYi%26export%3Ddownload" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>
</div>


**Todos os Casos de Uso:**

| Caso de Uso                         | Ator                           | Objetivo                                             | Resultado                                         |
|--------------------------------------|--------------------------------|------------------------------------------------------|--------------------------------------------------|
| Criar perfil paciente               | Paciente                       | Criar um novo perfil no sistema                     | Perfil do paciente criado                        |
| Receber notificação                 | Paciente                       | Ser notificado sobre eventos e consultas            | Notificação recebida                             |
| Buscar serviços de saúde            | Paciente                       | Encontrar serviços de saúde disponíveis             | Lista de serviços exibida                        |
| Agendar consulta                    | Paciente                       | Marcar uma consulta com profissional                | Consulta agendada                                |
| Receber confirmação da consulta      | Paciente                       | Confirmar que a consulta foi agendada               | Confirmação recebida                             |
| Realizar feedback                    | Paciente                       | Avaliar atendimento ou serviço                      | Feedback registrado                              |
| Receber pontos de fidelidade         | Paciente                       | Ganhar pontos ao dar feedback                       | Pontos adicionados ao usuário                    |
| Consultar histórico do paciente      | Profissional de Saúde          | Acessar informações médicas do paciente             | Histórico exibido                                |
| Registrar atendimentos               | Profissional de Saúde          | Registrar informações sobre atendimentos            | Atendimento registrado                           |
| Atualizar prontuário do paciente     | Profissional de Saúde          | Manter informações médicas atualizadas              | Prontuário atualizado                            |
| Criar perfil profissional            | Agente Comunitário de Saúde e Profissional de Saúde   | Criar um perfil para profissionais                  | Perfil criado                                    |
| Gerenciar agenda                     | Agente Comunitário de Saúde e Profissional de Saúde  | Controlar horários e compromissos                   | Agenda gerenciada                                |
| Registrar visitas                    | Agente Comunitário de Saúde  | Registrar visitas feitas a pacientes                | Visita registrada                                |
| Criar relatório da comunidade        | Agente Comunitário de Saúde  | Produzir um relatório sobre a situação da comunidade | Relatório gerado                                 |
| Gerenciar iniciativas de saúde       | Organização Parceira           | Criar e administrar campanhas de saúde              | Iniciativa cadastrada                            |
| Monitorar impacto das campanhas      | Organização Parceira           | Avaliar o sucesso de iniciativas de saúde           | Relatório de impacto gerado                      |
| Monitorar indicadores de uso         | Administrador do Sistema     | Acompanhar métricas de uso do sistema               | Indicadores monitorados                          |
| Gerenciar usuários                   | Administrador do Sistema     | Administrar contas e permissões                     | Usuários gerenciados                             |
| Responder dúvidas e feedback dos usuários | Administrador do Sistema | Atender solicitações e dúvidas                      | Dúvidas respondidas                              |
| Analisar informações de parceiro     | Administrador do Sistema     | Avaliar e validar dados de organizações parceiras   | Informações analisadas                           |



**Especificação dos Casos de Uso**:

Caso de Uso: [Criar perfil paciente](criar.md)

Caso de Uso: [Agendar consulta](agendar.md)

Caso de Uso: [Gerenciar agenda](gerenciar.md)

Caso de Uso: [Buscar Serviços de Sáude](buscar.md)

Caso de Uso: [Gerenciar iniciativas de sáude](campanhas.md)