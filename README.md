# Simulador de Consórcio Inteligente

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

> Uma aplicação web reativa de alta performance para simulação de cenários de consórcio (imóveis e veículos), rodando 100% no *Client-Side*.

---

## O Problema & A Solução

Simuladores financeiros tradicionais costumam depender de requisições a servidores externos (*Backend*) para cada ajuste de valor feito pelo usuário, gerando gargalos de carregamento, queda na retenção de leads e uma experiência de uso engessada.

Este projeto resolve essa dor trazendo a **computação financeira para a borda (no navegador do cliente)**: recalcula parcelas, taxas de administração, fundos de reserva e cronogramas de amortização em **milissegundos**, sem nenhuma chamada externa.

---

## Funcionalidades Principais

* **Reatividade Instantânea:** Atualização de cálculos acionada por *sliders* visuais em tempo real.
* **Dashboard Integrado:** Gráficos dinâmicos de distribuição financeira construídos com `Recharts`.
* **Exportação Nativa para PDF:** Geração de relatório limpo utilizando regras avançadas de `@media print` no CSS (zero peso de bibliotecas externas de conversão).
* **Theme Switcher:** Modo Claro e Modo Escuro persistidos e fluidos via CSS Variables.
* **Extrato de Amortização:** Tabela expansível gerando a evolução mês a mês do saldo devedor.

---

## Arquitetura e Boas Práticas

Este projeto foi estruturado focando em **Clean Code** e separação de conceitos:

1. **Separation of Concerns (SoC):** Toda a matemática financeira e lógica de negócio foram isoladas no Custom Hook `useConsorcio()`, mantendo a camada de visualização (`App.jsx`) limpa e declarativa.
2. **Otimização de Performance:** Uso estratégico do hook `useMemo()` para garantir que loops pesados (como a geração dos 240 meses da tabela de evolução) só sejam reprocessados quando os parâmetros de entrada sofrerem mutação real.
3. **Internalização (i18n):** Uso estrito da API nativa `Intl.NumberFormat` para garantir a precisão monetária do padrão `pt-BR / BRL`.

---

## Como executar o projeto na sua máquina

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.

```bash
# 1. Clone este repositório
git clone https://github.com/prifloriano/simulador-consorcio.git

# 2. Acesse a pasta do projeto
cd simulador-consorcio

# 3. Instale as dependências
npm install

# 4. Execute o servidor de desenvolvimento
npm run dev

```