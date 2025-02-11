# **UC: Criar perfil paciente**

# 1. Criar perfil paciente

### **1.1 Breve Descrição**
Este caso de uso permite ao paciente cadastrar seu perfil no "ConnectCare", fornecendo informações pessoais e de saúde básicas. O perfil é utilizado para personalizar sugestões de serviços de saúde e garantir atendimento mais eficiente.


### **2 Atores**
- **2.1** Paciente

## **3. Fluxo Básico de Eventos**
- **3.1** O paciente acessa o aplicativo "ConnectCare".
- **3.2** O sistema exibe a opção "Criar Perfil".
- **3.3** O paciente preenche os campos obrigatórios:
- **3.4** O sistema valida os dados inseridos [FE01][FE02].
- **3.5** O paciente confirma o cadastro.
- **3.6** O sistema salva o perfil e exibe uma mensagem de sucesso.


## **4. Fluxos Alternativos**
- **4.1** [FA01] Editar Perfil Existente
    *   Após o passo 3.7, o paciente seleciona "Editar Perfil".
    *   O sistema permite atualizar informações (ex.: adicionar novas condições de saúde).
    *   O paciente salva as alterações, e o sistema atualiza o perfil.


- **4.2** [FA02] Cancelar Criação
    *   No passo 3.3, se o paciente selecionar "Cancelar", o sistema retorna à tela inicial.


## **5. Fluxos de Exceção**
- **5.1** [FE01] Dados Incompletos
    *   No passo 3.4, se campos obrigatórios não forem preenchidos, o sistema exibe: "Preencha os campos obrigatórios para continuar". Retorna ao passo 3.3.


- **5.2** [FE02] Dados Inválidos
    *   No passo 3.4, se a idade for inserida em formato incorreto (ex.: texto), o sistema exibe: "Formato inválido. Insira números". Retorna ao passo 3.3.


## **6. Pré-Condições**
- **6.1** O paciente deve ter acesso ao aplicativo "ConnectCare".
- **6.2** O paciente deve fornecer informações válidas para completar o cadastro do perfil.


## **7. Pós-Condições**
- **7.1** O perfil do paciente é armazenado no sistema.
- **7.2** O paciente recebe sugestões de serviços de saúde com base nas informações cadastradas.


## **8. Pontos de Extensão**
- **8.1** Integração com histórico médico futuro: O perfil poderá ser vinculado a registros de consultas e exames.


## **9. Requisitos Especiais**
- **9.1** O sistema deve funcionar em dispositivos simples e conexões limitadas [RN03].
- **9.2** Os campos obrigatórios devem ser destacados e informados ao usuário caso estejam vazios.


## **10. Informações Adicionais**
- **10.1** A interface deve ser simplificada para facilitar o cadastro em comunidades com baixa alfabetização digital.
- **10.2** Os dados de localização são usados apenas para sugerir serviços próximos.


## **11. Regras de Negócio**
- **11.2** RN01: As sugestões de serviços devem considerar idade, condições de saúde e localização.
- **11.3** RN02: O aplicativo deve permitir o cadastro offline, sincronizando dados quando houver conexão.
- **11.4** RN04: A idade do paciente deve ser um número inteiro positivo.
[Retornar para Casos de Uso](UC.md)


[Retornar para Casos de Uso](UC.md)
