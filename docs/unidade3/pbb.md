# **PBB - Unidade 3**


O conteúdo apresenta um estudo de caso da "TechFix", uma empresa especializada em serviços de manutenção e suporte técnico para empresas e residências, que enfrenta desafios significativos em suas operações.

## **1 - CANVAS PBB**

Canvas para a elaboração e a criação de um Product Backlog.

<div style="text-align:center;">
    <iframe width="768" height="432" src="https://miro.com/app/board/uXjVLwUsifU=/" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>
</div>

#
#

## **2 - Histórias derivadas do CANVAS PBB**

Histórias geradas apartir dos PBIs

| **ID**                         | **Eu, como**                                | **Quero**                                                                                          | **Para**                                                                                          |
|---------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| US01  | Técnico de campo | Registrar diagnósticos dos equipamentos | Para garantir que as informações sobre os serviços prestados estejam salvas.                                                                                          |
| US02 | Técnico de campo | Consultar agenda de serviço | Para poder acompanhar a minha agenda de serviço                                                                                        |
| US03 | Técnico de campo | Consultar status de serviço  | Para identificar a etapa atual da solicitação                                                                                      |
| US04 | Técnico de campo | Consultar feedback dos clientes  | Para entender áreas de acerto e oportunidades de melhoria.                                                                                     |
| US05 | Técnico de campo | consultar o histórico detalhado dos equipamentos | Para monitorar as manutenções realizadas e planejar serviços futuros com mais eficiência.                                                                                       |
| US06 | Atendente | Consultar disponibilidade da agenda | Para verificar os horários disponíveis                                                                                        |
| US07 | Atendente | Criar atendimento do cliente  | Para registrar o atendimento do cliente na agenda e garantir que o serviço seja agendado corretamente. |
| US08 | Atendente | Cancelar atendimento do cliente | Para apagar algum atendimento que foi cancelado                                                                                       |
| US09 | Atendente | Editar atendimento do cliente | Para editar algum atendimento quando houver alguma mudança                                                                                       |
| US10    | Cliente Corporativo      | Solicitar serviço                                            | Para solicitar atendimento.                                                      |
| US11    | Cliente Corporativo      | Visualizar as minhas solicitações de serviço                 | Para acompanhar todas as solicitações de serviço.                                      |
| US12    | Cliente Corporativo      | Acessar o diagnóstico do equipamento                         | Para visualizar o diagnóstico que o técnico fez.                                       |
| US13    | Cliente Corporativo      | Avaliar serviço prestado                                     | Para mandar feedback sobre o serviço que foi prestado.                                     |
| US14    | Cliente Corporativo      | Acessar status do serviço                                    | Para acompanhar o conserto do equipamento.                                                 |
| US15    | Gerente de operações     | Consultar a agenda de serviços                               | Para acompanhar as operações diárias.                                                           |
| US16    | Gerente de operações     | Consultar relatório de desempenho da equipe                  | Para visualizar o desempenho individual da equipe de técnicos.                            |
| US17    | Gerente de operações     | Consultar dashboard de visão geral das operações             | Para acompanhar as etapas dos serviços.                                                   |
| US18    | Gerente de operações     | Consultar o relatório de avaliação do cliente                | Para acompanhar os feedbacks dos clientes.                                                 |
| US19    | Gerente de operações     | Exportar para Excel o dashboard de visão geral das operações | Para extrair do sistema e apresentar em outros lugares o relatório.                   |
| US20    | Gerente de operações     | Exportar para PDF o relatório de avaliação do cliente        | Para extrair do sistema e apresentar em outros lugares o relatório.                   |
| US21    | Gerente de operações     | Exportar para PDF o relatório de desempenho da equipe        | Para extrair do sistema e apresentar em outros lugares o relatório.                   |


## **3 - Histórias com critérios de aceitação declarados**

#
#
<ol>
  <li>
    <strong>US01:  Eu, como técnico de campo, quero registrar diagnóstico dos equipamentos, para garantir que as informações sobre os serviços prestados estejam salvas  </strong>
    <ul>
      <li><strong>A -</strong>O técnico deve anexar fotos ou vídeos relacionados ao diagnóstico.</li>
      <li><strong>B -</strong> O técnico deve preencher todos os campos obrigatórios(Cliente, Técnico responsavel, Data, Número de protocolo Tipo de problema e descrição) para concluir o registro.</li>
      <li><strong>C -</strong> As informações registradas devem ser salvas automaticamente no sistema central.</li>
    </ul>
  </li>
  <li>
    <strong>US02: Eu, como técnico de campo, quero consultar a agenda de serviço, para poder acompanhar a minha agenda de serviço</strong>
    <ul>
      <li><strong>A -</strong> A agenda exibe o endereço, tipo de serviço e informações adicionais do cliente para cada atendimento.
      </li>
      <li><strong>B -</strong> As mudanças na agenda devem ser atualizadas automaticamente no sistema do técnico</li>
      <li><strong>C -</strong> Cada atendimento deve possui um indicador de status (Pendente,em andamento,concluído e cancelado)</li>
    </ul>
  </li>
  <li>
    <strong>US05:  Eu, como técnico de campo,  quero  consultar históricos dos equipamentos, para monitorar as manutenções realizadas e planejar serviços futuros com mais eficiência.</strong>
    <ul>
      <li><strong>A -</strong> É permitido buscar o histórico de um equipamento por numero de protocolo ou cliente.
      </li>
      <li><strong>B -</strong> Sempre que um novo serviço for registrado, o histórico é atualizado automaticamente, garantindo que as informações estejam completas e atualizadas.</li>
      <li><strong>C -</strong> Apenas técnicos autorizados podem acessar o histórico dos equipamentos vinculados aos seus atendimentos.</li>
    </ul>
  </li>
  <li>
    <strong>US06: Eu. como atendente, quero consultar a disponibilidade da agenda, para verificar os horários disponíveis </strong>
    <ul>
      <li><strong>A -</strong> A disponibilidade da agenda é atualizada automaticamente, refletindo alterações feitas por outros atendentes ou eventos no sistema.
      </li>
      <li><strong>B -</strong> A agenda pode ser filtrada por técnico, data, tipo de serviço e localização.</li>
      <li><strong>C -</strong> O atendente pode consultar informações do técnico, como especialidades e região de atendimento, ao verificar a disponibilidade.</li>
      <li><strong>D -</strong> A atendente pode clicar em um horário disponível para iniciar o processo de agendamento.</li>
    </ul>
  </li>
  <li>
    <strong>US07: Eu, como atendente, quero criar atendimento do cliente, para registrar o atendimento do cliente na agenda e garantir que o serviço seja agendado corretamente. </strong>
    <ul>
      <li><strong>A -</strong> A atendente deve registrar as informações obrigatórias do cliente (nome, contato e endereço) do serviço solicitado.
      </li>
      <li><strong>B -</strong> O agendamento aparece imediatamente na agenda dos técnicos e no painel de controle.</li>
      <li><strong>C -</strong> O sistema verifica automaticamente a disponibilidade do técnico antes de confirmar o agendamento.</li>
    </ul>
  </li>
  <li>
    <strong>US10: Eu, como cliente corporativo, quero solicitar serviço, para solicitar atendimento. </strong>
    <ul>
      <li><strong>A -</strong> O cliente deve preencher campos obrigatórios(Nome, Endereço, tipo de aparelho).
      </li>
      <li><strong>B -</strong> Após o envio, o cliente recebe uma confirmação de que a solicitação foi registrada com sucesso, gerando um número de protocolo.</li>
      <li><strong>C -</strong> O cliente deve receber notificações por e-mail ou SMS informando o status da solicitação, incluindo a confirmação do agendamento e atualizações sobre o progresso.</li>
    </ul>
  </li>
   <li>
    <strong>US12: Eu, como cliente corporativo quero acessar o diagnóstico do equipamento, para que possa visualizar o diagnóstico que o técnico fez.</strong>
    <ul>
      <li><strong>A -</strong> O diagnóstico inclui informações detalhadas fornecidas pelo técnico, como problema e causa fornecidas na descrição.
      </li>
      <li><strong>B -</strong> O diagnóstico fica disponível no sistema assim que o técnico o registra, garantindo que o cliente tenha acesso às informações mais recentes.</li>
    </ul>
  </li>
  <li>
    <strong>US16: Eu,como gerente de operações quero consultar relatório de desempenho de equipe, para visualizar o desempenho individual da equipe de técnicos.</strong>
    <ul>
      <li><strong>A -</strong> O relatório apresenta o desempenho individual de cada técnico (Total de serviços realizados e percentual de feedbacks positivos recebidos).
      </li>
      <li><strong>B -</strong> O gerente pode filtrar os dados (Período e Região).</li>
      <li><strong>C -</strong> O relatório inclui gráficos (barras, linhas, ou radar) que mostram o desempenho de forma visual e intuitiva.</li>
    </ul>
  </li>
  <li>
    <strong>US17: Eu, como gerente de operações, quero consultar dashboard de visão geral de operações,  para poder acompanhar as etapas dos serviços </strong>
    <ul>
      <li><strong>A -</strong> O dashboard deve mostrar o número de serviços em cada etapa (Pendente, em andamento, cancelado e concluído).
      </li>
      <li><strong>B -</strong> O dashboard deve ser atualizado automaticamente em tempo real para refletir mudanças nas etapas dos serviços.</li>
      <li><strong>C -</strong> O gerente pode filtrar os dados por técnico, região, tipo de serviço ou período de tempo.</li>
    </ul>
  </li>
  <li>
    <strong>US18:  Eu, como gerente de operações , quero consultar relatório de avaliação do cliente, para acompanhar os feedbacks dos clientes.</strong>
    <ul>
      <li><strong>A -</strong>O sistema deve exibir um relatório consolidado com os feedbacks recebidos dos clientes, incluindo avaliações numéricas (1 a 5 estrelas) e comentários textuais.
      </li>
      <li><strong>B -</strong> O gerente pode filtrar o relatório por data, técnico, tipo de serviço ou região.</li>
      <li><strong>C -</strong> O relatório deve ser atualizado automaticamente conforme novos feedbacks são registrados, garantindo que as informações estejam sempre atualizadas.</li>
    </ul>
  </li>
</ol>

#
#

## **4 - BDD das histórias**

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórias de Usuário</title>
</head>
<body>
    <ol>
        <li>
            <strong>US01:</strong> Eu, como técnico de campo, quero registrar o diagnóstico dos equipamentos, para garantir que as informações sobre os serviços prestados estejam salvas.
            <ol type="a">
                <li>
                    <strong>Técnico registra diagnóstico com foto ou vídeo</strong>
                    <ul>
                        <li><strong>Dado que</strong> o técnico está na tela de registro de diagnóstico,</li>
                        <li><strong>Quando</strong> ele anexar uma foto ou vídeo relacionado ao diagnóstico,como 'foto_diagnostico.jpg' ou 'video_diagnostico.mp4',"</li>
                        <li><strong>Então</strong> o sistema deve permitir a anexação e exibir a mídia corretamente.</li>
                    </ul>
                </li>
                <li>
                    <strong>Técnico não preenche algum campo obrigatório,como Cliente, Técnico responsável, Data, Número de protocolo, Tipo de problema e Descrição.</strong>
                    <ul>
                        <li><strong>Dado que</strong> o técnico não preenche algum campo obrigatório,como Cliente, Técnico responsável, Data, Número de protocolo, Tipo de problema e Descrição.</li>
                        <li><strong>Quando</strong> ele tentar concluir o registro do diagnóstico,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro indicando que os campos obrigatórios precisam ser preenchidos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Técnico preenche todos os campos obrigatórios,como Cliente, Técnico responsavel, Data, Número de protocolo Tipo de problema e descrição e anexa mídia</strong>
                    <ul>
                        <li><strong>Dado que</strong> o técnico preenche todos os campos obrigatórios, como Cliente, Técnico responsavel, Data, Número de protocolo Tipo de problema e descrição e anexa uma foto ou vídeo, como 'foto_diagnostico.jpg' ou 'video_diagnostico.mp4'</li>
                        <li><strong>Quando</strong> ele concluir o registro,</li>
                        <li><strong>Então</strong> o sistema deve salvar automaticamente as informações no sistema central e exibir uma confirmação de que o diagnóstico foi registrado com sucesso.</li>
                    </ul>
                </li>
                <li>
                    <strong>Falha ao salvar informações no sistema central</strong>
                    <ul>
                        <li><strong>Dado que</strong> o técnico preenche todos os campos obrigatórios,como Cliente, Técnico responsavel, Data, Número de protocolo Tipo de problema e descrição e anexa uma foto ou vídeo,como 'foto_diagnostico.jpg' ou 'video_diagnostico.mp4'.</li>
                        <li><strong>Quando</strong> o sistema falha ao tentar salvar as informações no sistema central,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro informando que houve uma falha ao salvar os dados.</li>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <strong>US07:</strong> Eu, como atendente, quero criar atendimento do cliente, para registrar o atendimento do cliente na agenda e garantir que o serviço seja agendado corretamente.
            <ol type="a">
                <li>
                    <strong>Atendente cria agendamento com todos os dados obrigatórios,como nome, contato e endereço.</strong>
                    <ul>
                        <li><strong>Dado que</strong> o atendente está na tela de criação de agendamento.</li>
                        <li><strong>Quando</strong> ele preenche todos os campos obrigatórios,como nome, contato e endereço.</li>
                        <li><strong>Então</strong> o sistema deve registrar o agendamento e exibir uma confirmação de que o agendamento foi criado com sucesso.</li>
                    </ul>
                </li>
                <li>
                    <strong>Atendente não preenche algum campo obrigatório,como nome, contato e endereço</strong>
                    <ul>
                        <li><strong>Dado que</strong> o atendente está na tela de criação de agendamento,</li>
                        <li><strong>Quando</strong> ele tenta criar o agendamento sem preencher todos os campos obrigatórios,como nome, contato e endereço.</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro indicando que todos os campos obrigatórios precisam ser preenchidos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Atendente cria agendamento para uma data e hora indisponível</strong>
                    <ul>
                        <li><strong>Dado que</strong> o atendente está na tela de criação de agendamento,</li>
                        <li><strong>Quando</strong> ele tenta agendar para uma data e hora que já está ocupada,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro indicando que a data e hora escolhida já estão ocupadas.</li>
                    </ul>
                </li>
                <li>
                    <strong>Atendente cria agendamento e sistema falha ao salvar</strong>
                    <ul>
                        <li><strong>Dado que</strong> o atendente preenche todos os campos obrigatórios,como nome, contato e endereço.</li>
                        <li><strong>Quando</strong> ele tenta criar o agendamento,</li>
                        <li><strong>Então</strong> o sistema falha ao tentar salvar o agendamento e exibe uma mensagem de erro informando que não foi possível salvar o agendamento.</li>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <strong>US10:</strong> Eu, como cliente corporativo, quero solicitar serviço, para solicitar atendimento.
            <ol type="a">
                <li>
                    <strong>Cliente corporativo solicita serviço com todos os dados obrigatórios,como Nome, endereço e tipo de aparelho.</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela de solicitação de serviço.</li>
                        <li><strong>Quando</strong> ele preenche todos os campos obrigatórios,como Nome, endereço e tipo de aparelho.</li>
                        <li><strong>Então</strong> o sistema deve registrar a solicitação e exibir uma confirmação de que o serviço foi solicitado com sucesso.</li>
                    </ul>
                </li>
                <li>
                    <strong>Cliente corporativo não preenche algum campo obrigatório, como nome, endereço e tipo de aparelho.</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela de solicitação de serviço,</li>
                        <li><strong>Quando</strong> ele tenta enviar a solicitação sem preencher todos os campos obrigatórios, como nome, endereço etipo de aparelho.</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro indicando que todos os campos obrigatórios precisam ser preenchidos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Cliente corporativo solicita serviço com dados inválidos</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela de solicitação de serviço,</li>
                        <li><strong>Quando</strong> ele preenche algum campo, como nome, endereço e tipo de aparelho,com dados inválidos,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro indicando o problema com os dados fornecidos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Cliente corporativo cancela a solicitação de serviço</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela de solicitação de serviço,</li>
                        <li><strong>Quando</strong> ele decide cancelar a solicitação,</li>
                        <li><strong>Então</strong> o sistema deve descartar as informações inseridas e retornar à tela principal sem registrar a solicitação.</li>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <strong>US12:</strong> Eu, como cliente corporativo, quero acessar o diagnóstico do equipamento, para que possa visualizar o diagnóstico que o técnico fez.
            <ol type="a">
                <li>
                    <strong>Cliente corporativo acessa diagnóstico disponível</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela inicial do sistema,</li>
                        <li><strong>E</strong> há diagnósticos disponíveis para o equipamento,</li>
                        <li><strong>Quando</strong> ele seleciona o equipamento desejado e solicita visualizar o diagnóstico,</li>
                        <li><strong>Então</strong> o sistema deve exibir o diagnóstico correspondente com todas as informações registradas pelo técnico.</li>
                    </ul>
                </li>
                <li>
                    <strong>Cliente corporativo tenta acessar diagnóstico de equipamento sem registro</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela inicial do sistema,</li>
                        <li><strong>E</strong> não há diagnóstico disponível para o equipamento,</li>
                        <li><strong>Quando</strong> ele tenta acessar o diagnóstico,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem informando que não há diagnóstico registrado para o equipamento selecionado.</li>
                    </ul>
                </li>
                <li>
                    <strong>Falha ao carregar diagnóstico do equipamento</strong>
                    <ul>
                        <li><strong>Dado que</strong> o cliente corporativo está na tela inicial do sistema,</li>
                        <li><strong>Quando</strong> ele tenta acessar o diagnóstico e ocorre uma falha no sistema,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem de erro informando que não foi possível carregar o diagnóstico e orientar o cliente a tentar novamente mais tarde.</li>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            <strong>US16:</strong> Eu, como gerente de operações, quero consultar relatório de desempenho de equipe, para visualizar o desempenho individual da equipe de técnicos.
            <ol type="a">
                <li>
                    <strong>Gerente consulta relatório com dados disponíveis</strong>
                    <ul>
                        <li><strong>Dado que</strong> o gerente está na tela de relatórios,</li>
                        <li><strong>E</strong> há dados disponíveis sobre o desempenho da equipe,</li>
                        <li><strong>Quando</strong> ele solicita o relatório de desempenho,</li>
                        <li><strong>Então</strong> o sistema deve exibir o relatório com informações detalhadas sobre o desempenho individual dos técnicos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Gerente tenta consultar relatório sem dados disponíveis</strong>
                    <ul>
                        <li><strong>Dado que</strong> o gerente está na tela de relatórios,</li>
                        <li><strong>E</strong> não há dados disponíveis para o período selecionado,</li>
                        <li><strong>Quando</strong> ele tenta gerar o relatório,</li>
                        <li><strong>Então</strong> o sistema deve exibir uma mensagem informando que não há dados disponíveis para o período selecionado e sugerir ajustes no filtro de datas.</li>
                    </ul>
                </li>
                <li>
                    <strong>Gerente aplica filtros no relatório</strong>
                    <ul>
                        <li><strong>Dado que</strong> o gerente está na tela de relatórios,</li>
                        <li><strong>E</strong> deseja visualizar dados específicos,</li>
                        <li><strong>Quando</strong> ele aplica filtros como período, tipo de atendimento ou técnico específico,</li>
                        <li><strong>Então</strong> o sistema deve atualizar o relatório exibindo apenas as informações que correspondem aos filtros aplicados.</li>
                    </ul>
                </li>
            </ol>
        </li>
    </ol>
</body>
</html>

