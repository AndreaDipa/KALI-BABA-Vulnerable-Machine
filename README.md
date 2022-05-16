 # KALI BABA' Vulnerable Application

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

 Table of Contents:

  - [Paths](#paths)
    - [Local User](#local-user)
    - [Priv Esc](#priv-esc)
  - [TO-DO](#to-do)
    - [Importanti](#importanti)
  - [Sitemap](#sitemap)

 ## Paths

 ### Local User

- [ ] JWT
  - [tutorial](https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/) 
  - L'idea è quella di dare accesso attraverso un token ad una pagina di upload riservata ad utenti admin e caricare una reverse shell
- [ ] EJS
  - [tutorial](https://dev.to/boiledsteak/simple-remote-code-execution-on-ejs-web-applications-with-express-fileupload-3325) 
  - L'idea è quella di usare una CVE relativa a EJS per accedere ad una pagina di upload riservata ad admin e caricare una resverse shell 
- [ ] NoSQL o SQL 
  - L'idea è quella di trovare le credenziali di admin attraverso injecion, decriptarle ed accedere alla pagina di upload 

 ### Priv Esc

 - [ ] NFS
 - [ ] Docker
 - [ ] suid-sgid-capabilities/crontab/sudo -l
 - [ ] kernel-exploitation

## TO-DO 

### Importanti

- [ ] Cancellare History dei comandi
- [ ] cancellare .git
- [ ] cancellare eventuali log

## Sitemap

Index (Landing Page)
Products/Menu (Lista Kebab)
Register 
Login
About us (possibile enumeration nomi utenti)
Contact (possibile bait)
Upload (Admin Secret Page)

Occhio allo user che esegue pm2.