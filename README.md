# 🏠 Casa Pronta - Projeto em Nuvem
Este repositório contém a aplicação estática criada para o cenário da imobiliária "Casa Pronta", desenvolvida como parte de um projeto prático de computação em nuvem.

# 📌 Cenário
A imobiliária Casa Pronta deseja disponibilizar remotamente informações e fotos de imóveis para facilitar o atendimento a clientes externos.

☁️ Arquitetura da Solução
💻 Site estático com HTML e CSS

☁️ Hospedado na Azure via App Service (PaaS)

⚙️ Infraestrutura provisionada com Terraform

🔁 Deploy automatizado com GitHub Actions

# 🚀 Tecnologias Utilizadas
Azure App Service (PaaS)

Terraform (Infraestrutura como Código)

GitHub Actions (CI/CD)

HTML + CSS

# 🛠️ Como funciona
O Terraform cria a infraestrutura na Azure:

App Service Plan

Web App

O código do site é enviado para o GitHub.

A cada push na branch main, o GitHub Actions:

Zipa os arquivos do site

Realiza o deploy automático para a Azure

# 📂 Estrutura do Projeto
markdown
Copiar
Editar
casapronta-site/
├── index.html
├── style.css
└── .github/
    └── workflows/
        └── deploy.yml

# 🌍 Acesse o site
Você pode ver o site publicado aqui:
👉 https://app-casapronta.azurewebsites.net

# 👥 Equipe
Amanda Galvão
Khyra Oliveira
Mario Beltão
Sabrina Vidal
Vinícios Pontes