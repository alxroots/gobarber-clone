# Recuperação de senha
**RF**
- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar mailTrap para testar envio em ambientes de desenvolvimento;
- Utilizar amazon SES para envio em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);\

**RN**
 - O link enviado por email para resetar senha deve expirar em 2h;
 - O usuário precisa confirmar a nova senha a resetar sua senha;
# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu perfil (nome email e senha)
**RN**
- O usuário não pode alterar seu email para um já em uso
- para atualizar sua senha o usuário deve informar a senha antiga
- Para atualizar sua senha o usuário deve confirmar a nova senha
# Painel do prestador
**RF**
- Usuario deve poder listar seus agendamentos de um dia especifico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**
- Os agendamentos do prestador no dia deverão ser armazanado em cache
- As notificações do prestador devem ser armazenadas em MongoDB;
- As notificações do prestador deve ser enviads em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um estado de lida ou não lida para que o prestador possa controlar
# Agendamento de serviços
**RF**
- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuaŕio deve poder listar os horários disponiveis em um dia especifoc de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador 

**RNF**
- A listagem de prestadores deve ser armazenadas em cache;

**RN**
- Cada agendamento deve durar uma hora exatamente
- Os agendammentos deve estar disponivels entre as 8h até as 17
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário passado
- O usuario não pode agendar horário consigo mesmo.
