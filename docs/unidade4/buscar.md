# **UC: Buscar Serviços de Saúde**

## **1. Breve Descrição**

O caso de uso "Buscar Serviço de Saúde" permite que os pacientes da comunidade Vila Esperança localizem serviços de saúde próximos através do aplicativo ConnectCare. O objetivo é facilitar o acesso a unidades de saúde, campanhas comunitárias e agentes de saúde, superando barreiras geográficas e tecnológicas.

## **2. Atores**

- **2.1** Paciente

## **3. Condições Prévias**

- **3.1** Aplicativo instalado e configurado no dispositivo do paciente.
- **3.2** Paciente registrado no aplicativo ConnectCare.

## **4. Fluxo Básico de Eventos**

- **4.1** O paciente acessa o aplicativo ConnectCare.
- **4.2** O sistema solicita que o paciente insira informações básicas, como nome, idade e sintomas.
- **4.3** O paciente insere os dados solicitados.
- **4.4** O sistema utiliza os dados fornecidos para sugerir serviços de saúde próximos, incluindo unidades de saúde, campanhas de vacinação e agentes comunitários.
- **4.5** O paciente visualiza a lista de serviços disponíveis e pode aplicar filtros de localização, tipo de atendimento e disponibilidade.
- **4.6** O paciente seleciona o serviço desejado.
- **4.7** O sistema exibe informações detalhadas sobre o serviço, incluindo localização, horários e documentos necessários.
- **4.8** O caso de uso é encerrado quando o paciente visualiza as informações ou decide realizar o agendamento.

## **5. Fluxos Alternativos**

- **5.1** *Busca sem Conexão Estável*  
  - Se o paciente não tiver conexão à internet, o sistema exibe informações previamente armazenadas no dispositivo.  
  - O paciente pode visualizar serviços de saúde básicos e campanhas previamente carregadas.  
  - O fluxo retorna ao passo 4.8 do Fluxo Básico.

- **5.2** *Nenhum Serviço Disponível*  
  - Se não houver serviços de saúde disponíveis na região, o sistema exibe uma mensagem informando a indisponibilidade.  
  - O sistema sugere alternativas, como entrar em contato com um agente comunitário.  
  - O fluxo retorna ao passo 4.8 do Fluxo Básico.

## **6. Fluxos de Exceção**

- **6.1** *Dados Insuficientes*  
  - Se o paciente não fornecer informações suficientes, o sistema solicita a complementação dos dados.  
  - O paciente insere os dados faltantes ou cancela a busca.  
  - O fluxo retorna ao passo 4.3 do Fluxo Básico.

- **6.2** *Erro no Sistema*  
  - Se ocorrer um erro técnico durante a busca, o sistema exibe uma mensagem de erro.  
  - O paciente pode tentar novamente ou fechar o aplicativo.  
  - O fluxo é encerrado.

## **7. Regras de Negócio**

- **7.1** O sistema deve funcionar em dispositivos com conexão limitada à internet.
- **7.2** O aplicativo deve ser acessível para usuários com baixa alfabetização digital.

## **8. Pós-Condições**

- **8.1** O paciente localiza serviços de saúde relevantes e pode prosseguir para o agendamento.
- **8.2** O histórico de busca é atualizado no sistema para futuras consultas.

## **9. Pontos de Extensão**

- **9.1** —
- **9.2** —

## **10. Requisitos Especiais**

- **10.1** Proteção de dados sensíveis conforme as regulamentações de privacidade.
- **10.2** O aplicativo deve ser otimizado para dispositivos móveis de baixo desempenho.

## **11. Informações Adicionais**

- **11.1** O caso de uso está relacionado a outros casos como "Registrar Paciente", "Agendar Consulta" e "Enviar Feedback".
- **11.2** —

[Retornar para Casos de Uso](UC.md)