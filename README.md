# Andressa Matos

Site estático de gastronomia para eventos, com página inicial e portfólio.

## Páginas e arquivos

- `index.html`: apresentação e três destaques com acesso ao portfólio.
- `portfolio.html`: 13 fotos e 8 vídeos, filtros por categoria e visualização ampliada.
- `styles.css` e `site.js`: identidade visual e comportamento compartilhados.
- `portfolio.css` e `portfolio.js`: galeria, filtros e visualizador acessível por teclado.
- `images/`: fotografias originais do site.
- `media/`: fotos WebP, miniaturas, vídeos MP4 e capas extraídas dos vídeos.

Não há dependências de instalação nem etapa de compilação. Sirva esta pasta com um servidor HTTP estático ou publique todos esses arquivos juntos, preservando os caminhos relativos. Para uma prévia local com Python: `python -m http.server 8000`.

Os vídeos só são solicitados ao abrir um item. Fechar o visualizador interrompe a reprodução. Escape fecha; as setas navegam entre os trabalhos do filtro selecionado. As fotos e os links diretos para vídeos continuam disponíveis sem JavaScript.

Para acrescentar um trabalho, inclua um `article.work-card` em `portfolio.html`, com sua categoria e um link `data-photo` ou `data-video`. Use descrições verificadas, miniaturas e uma capa para cada vídeo. O contato existente é mantido em `site.js`.
