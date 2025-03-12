# Widelab RN Utils

Uma biblioteca de funções utilitárias para projetos desenvolvidos com React Native. Esta biblioteca fornece uma coleção de funções úteis para facilitar o desenvolvimento de aplicativos móveis, incluindo manipulação de strings, formatação de datas, validação de dados e muito mais.

## Instalação

Você pode instalar a biblioteca usando npm:

```bash
npm install widelab-rn-utils
```

## Uso

Aqui está um exemplo de como usar algumas das funções utilitárias fornecidas pela biblioteca:

```typescript
import { WDRNDimensions, WDRNFiles, WDRNStyles } from 'widelab-rn-utils';

// Converter extensão para tipo MIME
const mimeType = WDRNFiles.extensionToMimeType('jpg');
console.log(mimeType); // Saída: image/jpeg

// Ler conteúdo de um arquivo em base64
const base64Content = await WDRNFiles.getFileBase64('file:///path/to/file.jpg');
console.log(base64Content); // Saída: data:image/jpeg;base64,...

// Obter dimensões da janela
console.log(WDRNDimensions.window); // Saída: { width: ..., height: ..., scale: ..., fontScale: ... }

// Gerar estilo de sombra para um componente com profundidade 5
const shadowStyle = WDRNStyles.shadowGenerator(5);
console.log(shadowStyle); // Saída: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.34, shadowRadius: 3.27, elevation: 5 }
```

## Funcionalidades

- **Manipulação de Arquivos**: Funções para mover e copiar arquivos, ler arquivos, converter extensão em MIME type e etc..
- **Dimensões**: Obtém as dimensões da janela ou da tela do dispositivo.
- **Estilos**: Criar sombras usando elevation, manipular imagens, temas e etc..

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de novas funcionalidades, encontrar bugs ou quiser melhorar a documentação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com ❤️ por Widelab
