## Teste Outsera
> Olá pessoal, bom dia, boa tarde ou boa noite, segue meu teste seguindo os critérios, por vocês solicitado, veja que esse 
> teste foi feito com o [Nest.js]("https://nestjs.com/"), optei por ele para agilizar o desenvolvimento e porque sei que ele 
> tem bastante adesão do mercado, desde já, muito obrigado, e espero ter atendido as espectátivas.

### Para rodar:
Para rodar em modo de desenvolvimento, basta rodar o famigerado `pnpm start:dev`, visto que usei o pnpm para rodar esse projeto,
no modo de produção, evidentemente precisamos rodar o `pnpm build` e depois basta rodar o comando `pnpm start:prod`.

### Api:

Quando vocês rodarem, a aplicação possuí um swagger onde poderão testar a api via ui web, mas caso queira rodar usando um client
diferente, segue o curl:
```
curl -X 'GET' \
  'http://localhost:3000/api/producers/range/wins' \
  -H 'accept: application/json'
```

### Isso é tudo pessoal:
Bom acredito que seja isso, referente a regra, note que, eu discriminei os producers de maneira que mesmos as parcerias estão 
caracterizadas de forma separada, não sei se era essa a ideia, mas, pareceu fazer mais sentido na ocasião.
Obrigado, e até mais.
