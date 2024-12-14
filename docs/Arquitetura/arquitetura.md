# **Arquitetura de software**

## **padrão MTV (Model-Template-View)**

<center>
  ![Arquitetura](../imagens/arquitetura.png)
</center>


A escolha do padrão MTV (Model-Template-View) para o nosso projeto foi devido à sua clara separação de responsabilidades, que permite dividir a lógica da aplicação (Models), a interface de usuário (Templates) e o controle (Views). Essa abordagem facilita a manutenção, escalabilidade e o entendimento do código, características essenciais para o sucesso do desenvolvimento. Além disso, o Django implementa o padrão MTV de forma nativa, oferecendo ferramentas e abstrações que simplificam o desenvolvimento e organizam o projeto de maneira lógica e intuitiva.

Outro ponto relevante é a facilidade de manutenção e testabilidade proporcionada pelo MTV, já que cada componente pode ser desenvolvido e testado de forma isolada. Por exemplo, os Models podem ser validados sem depender da interface, e os Templates podem ser ajustados sem interferir na lógica de negócios. Essa flexibilidade é acompanhada pela possibilidade de criar interfaces dinâmicas e reutilizáveis com Templates, garantindo maior personalização e adaptação às necessidades dos usuários finais.

A decisão também foi influenciada pela otima comunidade do Django e sua documentação extensa, que fornece suporte para o padrão MTV e facilita a resolução de problemaes, além de acelerar a integração de novos desenvolvedores ao projeto. Por fim, o MTV se destaca pela eficiência no desenvolvimento de aplicações web, aproveitando funcionalidades integradas como o ORM, o sistema de roteamento de URLs e a renderização de templates, o que otimiza tempo e recursos ao longo do desenvolvimento.
