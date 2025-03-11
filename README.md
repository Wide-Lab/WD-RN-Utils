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
import { formatDate, validateEmail } from 'widelab-rn-utils';

// Formatar uma data
const formattedDate = formatDate(new Date());
console.log(formattedDate); // Saída: 11/03/2025

// Validar um endereço de email
const isValidEmail = validateEmail('example@example.com');
console.log(isValidEmail); // Saída: true
```

## Funcionalidades

- **Manipulação de Strings**: Funções para manipulação e formatação de strings.
- **Formatação de Datas**: Funções para formatação de datas em diferentes formatos.
- **Validação de Dados**: Funções para validação de emails, números de telefone, etc.
- **E muito mais**: Novas funções utilitárias serão adicionadas conforme necessário.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de novas funcionalidades, encontrar bugs ou quiser melhorar a documentação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com ❤️ por Widelab
