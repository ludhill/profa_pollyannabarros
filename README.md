9Este projeto consiste em montar 
portifolio para expor os serviços 
educacionais prestados pela Professora
Pollyanna Barros.

Para funcionamento deste projeto requer 
um entendimento dos componentes do bootstrap
na sua versão 5.3, foi utilizado alguns exemplos 
disponibilizados na própria pagina do framework.

Foi utilizado a biblioteca angular-cli-ghpages
conforme apresetado pelo Paulo Eduardo Melo em seu
video no youtube acessado em 07/12/2024: 
https://youtu.be/PbgVbCb3zuE?si=DPP_0khuoy58o13k
com objetivo de tornar o deploy mais ágil!

imagens utilizadas geradas por MetaIa do Facebook.

Desenvolvedores:
Lucas Denner

# ProfaPollyannaPortifolio

#This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

#Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

#Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

#Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

#Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

#Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

#To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




----


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leitor de JSON de Procedimentos e Ferramentas</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        .container { max-width: 900px; margin: 0 auto; background-color: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h1, h2 { color: #0056b3; }
        input[type="file"] { margin-bottom: 20px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background-color: #e9e9e9; cursor: pointer; }
        #output { background-color: #f9f9f9; border: 1px solid #eee; padding: 15px; margin-top: 20px; border-radius: 6px; }
        .procedure-item { border-bottom: 1px dashed #ccc; padding-bottom: 10px; margin-bottom: 10px; }
        .procedure-item:last-child { border-bottom: none; }
        .procedure-item h3 { margin-top: 0; color: #333; }
        ul { list-style-type: none; padding-left: 0; }
        ul li { background-color: #e0f2f7; margin-bottom: 5px; padding: 8px 12px; border-radius: 4px; border: 1px solid #cceeff; }
        .error { color: red; font-weight: bold; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Carregar e Visualizar Procedimentos e Ferramentas</h1>

        <p>Selecione um arquivo JSON (com a estrutura de procedimentos/ferramentas) do seu computador:</p>
        <input type="file" id="jsonFileInput" accept=".json">

        <div id="output">
            <p>Nenhum arquivo JSON carregado.</p>
        </div>
        <p class="error" id="errorMessage"></p>
    </div>

    <script>
        document.getElementById('jsonFileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const outputDiv = document.getElementById('output');
            const errorMessageSpan = document.getElementById('errorMessage');

            outputDiv.innerHTML = '<p>Nenhum arquivo JSON carregado.</p>';
            errorMessageSpan.textContent = '';

            if (!file) {
                errorMessageSpan.textContent = 'Nenhum arquivo selecionado.';
                return;
            }

            // Opcional: verificar o tipo MIME para garantir que é um JSON
            if (file.type && file.type !== 'application/json') {
                errorMessageSpan.textContent = 'Por favor, selecione um arquivo JSON (.json).';
                return;
            }

            const reader = new FileReader();

            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result); // Parseia o JSON lido

                    // Valida a estrutura básica do JSON
                    if (!data.procedimentos || !Array.isArray(data.procedimentos) ||
                        !data.ferramentas || !Array.isArray(data.ferramentas)) {
                        throw new Error('A estrutura do arquivo JSON não é a esperada (faltam "procedimentos" ou "ferramentas").');
                    }

                    displayData(data); // Chama a função para exibir os dados
                    errorMessageSpan.textContent = ''; // Limpa qualquer erro anterior

                } catch (error) {
                    outputDiv.innerHTML = ''; // Limpa a saída
                    errorMessageSpan.textContent = 'Erro ao processar o arquivo JSON: ' + error.message;
                    console.error("Erro ao processar JSON:", error);
                }
            };

            reader.onerror = function(e) {
                errorMessageSpan.textContent = 'Erro ao ler o arquivo: ' + reader.error;
                console.error("Erro ao ler o arquivo:", reader.error);
            };

            reader.readAsText(file); // Lê o arquivo como texto
        });

        function displayData(data) {
            const outputDiv = document.getElementById('output');
            let htmlContent = '<h2>Procedimentos e Suas Ferramentas:</h2>';

            if (data.procedimentos.length === 0) {
                htmlContent += '<p>Nenhum procedimento cadastrado.</p>';
            } else {
                data.procedimentos.forEach(procedimento => {
                    htmlContent += `<div class="procedure-item">
                                        <h3>${procedimento.nome}</h3>
                                        <h4>Ferramentas Necessárias:</h4>
                                        <ul>`;
                    if (procedimento.ferramentas && procedimento.ferramentas.length > 0) {
                        procedimento.ferramentas.forEach(ferramentaId => {
                            const ferramenta = data.ferramentas.find(f => f.id === ferramentaId);
                            if (ferramenta) {
                                htmlContent += `<li>${ferramenta.nome} (ID: ${ferramenta.id})</li>`;
                            } else {
                                htmlContent += `<li>Ferramenta com ID ${ferramentaId} não encontrada.</li>`;
                            }
                        });
                    } else {
                        htmlContent += `<li>Nenhuma ferramenta especificada para este procedimento.</li>`;
                    }
                    htmlContent += `</ul></div>`;
                });
            }

            outputDiv.innerHTML = htmlContent;
        }
    </script>
</body>
</html>


