# Políticas de Boas Práticas para Branch


## 1. **Nomeação de Branches**
   - **Feature**: `feature/nome-da-funcionalidade` (e.g., `feature/login`).
   - **Bugfix**: `bugfix/corrigir-erro` (e.g., `bugfix/erro-validacao`).
   - **Hotfix**: `hotfix/corrigir-urgente` (e.g., `hotfix/fix-prod-error`).
   - **Release**: `release/v1.0.0` (e.g., `release/v1.2.0`).

## 2. **Fluxo de Trabalho**
   - **`main`**: Sempre a versão de produção estável. Não trabalhe diretamente nela.
   - **`develop`**: Base para novas funcionalidades. Faça merge de features e bugfixes aqui.
   - **Branches de Funcionalidade**: Crie uma branch para cada nova funcionalidade, com base em `develop`.
   - **Merge**: Mergue para `develop` ao concluir a tarefa. Use Pull Requests (PRs) para revisão.

## 3. **Pull Requests**
   - **Descreva claramente**: Explique o que foi feito e o que está sendo resolvido.
   - **Aprovação**: Todos os PRs devem ser revisados antes do merge.
   - **Testes**: Garanta que todos os testes passem antes de fazer o merge.

## 4. **Commits**
   - **Mensagens claras**: Utilize mensagens concisas e explicativas para cada commit.
   - **Commits pequenos**: Faça commits frequentes e com mudanças pequenas.

## 5. **Merge**
   - **Rebase**: Realize rebase para manter a branch atualizada antes de abrir o PR.
   - **Evite commits grandes**: Faça o merge com commits pequenos para facilitar a revisão.

# 📁 Histórico de versão

| Versão |    Data    |                    Descrição                    |     Autor      |
|:------:|:----------:|:-----------------------------------------------:|:--------------:|
|  1.0   | 11/11/2024 | Adicionando políticas de boas práticas para branch            | Marcos Vieira|