# Arquitetura Frontend

Este projeto é uma aplicação React que segue a metodologia de design atômico para organizar seus componentes. A estrutura de diretórios é projetada para facilitar a navegação e a compreensão do código.

## **Tecnologias Utilizadas**

Este projeto utiliza várias tecnologias e bibliotecas, incluindo:

- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/2448ed3441b6ae6c6dcf5cee7f4225ff9fe17f30/react-2.svg" alt="React" width="30" style="vertical-align:middle"/> React
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/axios.png" alt="Axios" width="30" style="vertical-align:middle"/> Axios
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/lodash.png" alt="Lodash" width="30" style="vertical-align:middle"/> Lodash
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/hookForm.png" alt="React Hook Form" width="30" style="vertical-align:middle"/> React Hook Form
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/reactQuery.png" alt="React Query" width="30" style="vertical-align:middle"/> React Query
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/reactRouter.png" alt="React Router DOM" width="30" style="vertical-align:middle"/> React Router DOM
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/2448ed3441b6ae6c6dcf5cee7f4225ff9fe17f30/react-2.svg" alt="Yup" width="30" style="vertical-align:middle"/> Yup
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/typescript.png" alt="Typescript" width="30" style="vertical-align:middle"/> TypeScript
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/01c7237cc3b8a35771cd6d23e84f8041a21b9de7/vite.svg" alt="Vite" width="30" style="vertical-align:middle"/> Vite
- <img src="https://raw.githubusercontent.com/TheGabrielGalvao/custom-icons/main/tailwind.png" alt="Tailwind" width="30" style="vertical-align:middle"/> Tailwind CSS

## **Estrutura de Diretórios**

### **`assets`**

Armazena arquivos estáticos, como imagens e textos, que são usados em toda a aplicação. Isso ajuda a manter todos os recursos em um local centralizado.

### **`components`**

Aqui, você encontrará os componentes específicos da aplicação. Eles são organizados em **`atoms`**, **`molecules`** e **`templates`**, seguindo a metodologia de design atômico:

- **`atoms`**: São os componentes mais básicos e genéricos, como botões e inputs.
- **`molecules`**: São combinações de átomos que formam um bloco funcional, como um formulário de login.
- **`templates`**: São componentes que definem padrões e comportamentos de layout, como um cabeçalho ou um layout de página.

### **`config`**

Contém as configurações específicas necessárias para o funcionamento da aplicação, como a configuração das rotas em **`routing`**.

### **`core`**

Este diretório contém os componentes e funcionalidades fundamentais da aplicação:

- **`components`**: Contém os componentes padrão da aplicação, organizados de acordo com a metodologia de design atômico.
- **`context`**: Contém os contextos padrão disponíveis para a aplicação.
- **`hooks`**: Contém hooks personalizados que auxiliam no funcionamento da aplicação.
- **`styles`**: Contém os estilos globais da aplicação.
- **`types`**: Contém as tipagens comuns da aplicação.
- **`util`**: Contém arquivos auxiliares para o funcionamento da aplicação, como helpers, constantes, enums, etc.

### **`features`**

Contém as funcionalidades da aplicação, divididas em **`Private`** e **`Public`**. As funcionalidades **`Private`** requerem autenticação para serem acessadas, enquanto as funcionalidades **`Public`** podem ser acessadas sem autenticação.

### **`models`**

Contém os arquivos de tipagem das requisições e o mapeamento de entidades usadas na aplicação.

### **`services`**

Contém os arquivos que realizam as requisições ao backend.

## **Como Começar**

Para começar a trabalhar neste projeto, você deve seguir os seguintes passos:

1. Clone o repositório.

```powershell
git clone <url-do-repositorio>
```

1. Navegue até o diretório do projeto.

```powershell
cd <nome-do-repositorio>
```

1. Instale as dependências.

```powershell
npm install
```

1. Inicie o servidor de desenvolvimento.

```powershell
npm run dev
```

## **Contribuindo**

Se você deseja contribuir para este projeto, por favor, siga as diretrizes de contribuição encontradas no arquivo CONTRIBUTING.md.

## **Licença**

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
