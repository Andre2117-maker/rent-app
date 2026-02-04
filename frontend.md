🛠️ Rent App – Sistema de Gestão e Reserva de Equipamentos
Este projeto foi desenvolvido durante minha experiência de voluntariado, com o objetivo de criar uma interface moderna e resiliente para um sistema de gerenciamento de ativos. O foco principal foi a integração de um frontend robusto com um backend pré-existente, lidando com autenticação, comandos IoT e fluxos complexos de reserva.

🌟 Diferenciais do Projeto
Diferente de um catálogo comum, este sistema oferece uma experiência de gestão completa:

Controle IoT: Envio de comandos via protocolo MQTT para acionamento remoto de equipamentos.

Gestão Administrativa: CRUD completo (Criar, Ler, Editar e Deletar) de equipamentos com validação de dados.

Fluxo de Autenticação: Sistema de login com proteção de rotas e gestão de perfil de usuário.

Reserva Inteligente: Histórico centralizado e sistema de agendamento que permite múltiplas reservas por ativo.

🚀 Tecnologias
Frontend: React 19, TypeScript, Vite.

UI/UX: Material UI (MUI).

Integração: Axios para consumo de API REST.

Padronização: ESLint, Prettier e Commitizen para commits semânticos.

🛠️ Soluções de Engenharia Aplicadas
Neste projeto, apliquei conceitos avançados de frontend para garantir a qualidade do software:

Resiliência à Falhas do Servidor: Implementei tratamentos de exceção globais (especialmente no Login), onde erros de rede ou de servidor (500) são capturados e informados ao usuário via alertas visuais, evitando que a aplicação "trave".

Abstração de Complexidade (UX): No cadastro de itens, ocultei a necessidade de lidar com UUIDs técnicos. O usuário interage apenas com nomes e menus de seleção, enquanto o sistema gerencia a integridade dos IDs em segundo plano.

Feedback de Comandos (Logs): Criei um console de logs em tempo real para monitorar o status das ordens enviadas via MQTT, garantindo que o usuário saiba exatamente se um comando foi processado com sucesso.

Skeleton Screens: Para uma experiência mais fluida, utilizei estados de carregamento que imitam o layout dos cards, reduzindo a percepção de tempo de espera durante o consumo da API.

💻 Como acessar e testar localmente
Siga os passos abaixo para rodar o projeto no seu computador:

Clonar o repositório:

Bash
git clone https://github.com/Andre2117-maker/rent-app.git
cd rent-app
Trocar para a branch de desenvolvimento:

Bash
git checkout develop
Instalar as dependências:

Bash
npm install
Instalar o pacote de ícones (MUI Icons):

Bash
npm install @mui/icons-material
Iniciar a aplicação:

Bash
npm run dev
📈 Evolução Pós-Feedback
Após a apresentação técnica, o projeto foi atualizado com:

[x] Botões de ação rápida (Editar/Deletar) em cada card de equipamento.

[x] Lógica de reserva atualizada: o botão "Reservar" não é mais desativado, permitindo agendamentos em janelas de horários diferentes para o mesmo item.
