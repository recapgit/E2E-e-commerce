# Teste E2E - Compra no QA Practice

Teste automatizado com Playwright e TypeScript que simula uma compra completa no e-commerce de prática do site [QA Practice](https://www.qapractice.com/practice-ecommerece-website): busca do produto, carrinho, endereço de envio, pagamento e confirmação da compra (4 unidades de Coca Cola).

O projeto usa o padrão Page Object Model, com cada página do fluxo em uma classe separada.

## Estrutura

A estrutura é composta pela pasta `pages`, contendo os métodos para cada página do fluxo, sendo cada método uma ação (adicionar ao carrinho, preencher dados, etc), e o arquivo `end2end ecommerce.test.ts` que contém o código e as verificações principais deste teste.

## O que mudou

* O teste que estava todo em um único arquivo foi dividido em classes dentro da pasta `pages`, cada uma com métodos para uma ação (`searchProduct`, `addToCart`, `goToCart`, `fillShippingDetails`, `fillPaymentDetails`, entre outros).
* Os seletores ficaram como propriedades das classes, então qualquer mudança na página só exige ajuste em um lugar.
* Os dados de envio e de pagamento passam a ser recebidos por interfaces (`ShippingData` e `PaymentData`).
* O arquivo de teste ficou só com a sequência do fluxo, chamando os métodos das páginas.

## Como Instalar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npx playwright install
```

## Executando os testes

```bash
# todos os testes
npx playwright test

# com a interface do playwright
npx playwright test --ui

# apenas o teste de compra
npx playwright test tests/compra.spec.ts

# abrir o relatório da última execução
npx playwright show-report
```
