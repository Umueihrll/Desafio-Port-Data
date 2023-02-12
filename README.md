# Desafio-Port-Data 

Este desafio consiste em realizar um suite de testes utilizando as bibliotecas Jest e Puppeteer.

# Instruções.
 - Acesse a pasta Raiz.
 - Digite 'npm install' no terminal.
 - Um arquivo .env é necessário para confirmar algumas informações delicadas e permitir o funcionamento do teste com as informações: 
   - EMAIL (E-mail do úsuario do github), 
   - NOME (necessário, completo e igual ao do úsuario do github), 
   - USER (Login de úsuario do github), 
   - SENHA (com a senha do úsuario do github).* (pelo menos um dos campos USER ou EMAIL precisam ser preenchidos para que possa ser feito o login no github.)
 - Scripts: 
   - 'npm test', para iniciar a busca do jest pelos arquivo teste e inicia-lo.
   - 'npm run headless', para iniciar um preview com headless-False, para visualização de cada passo.***
 - OBS: Por algum motivo a primeira vez que o teste é chamado ele falha por conectividade(não consegui identificar a configuração necessária para que esse comportamento não se repita.), Porém da segunda chamada, em diante, os testes funcionam normalmente.
