# Waldeck - Soluções Logísticas

Landing page profissional para capturar leads de empresas interessadas em soluções de logística digital.

## 🚀 Funcionalidades

### ✨ Interface Moderna
- Design responsivo com gradientes azuis
- Animações suaves e micro-interações
- Layout otimizado para desktop e mobile
- Header limpo e profissional

### 📝 Formulário Avançado
- Questionário completo para qualificação de leads
- Validação em tempo real
- Estados de loading e feedback visual
- Envio automático de dados
- Confirmação de sucesso/erro

### 🎯 Perguntas de Qualificação
- Área de negócio
- Dimensão do estoque
- Número de clientes ativos
- Relacionamento com fornecedores
- Tecnologias atuais utilizadas
- Nível de urgência
- Benefícios esperados
- Prazo para implementação

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Grid e Flexbox
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome** - Ícones profissionais

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🎨 Personalização

### Cores Principais
- Azul Primário: `#007bff`
- Azul Secundário: `#0056b3`
- Verde WhatsApp: `#25D366`

### Tipografia
- Fonte Principal: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

## 📋 Como Usar

1. **Abrir o projeto**: Abra o arquivo `index.html` em um navegador
2. **Preencher formulário**: Responda todas as perguntas obrigatórias
3. **Enviar dados**: Clique em "Enviar Respostas"
4. **Receber feedback**: Veja a confirmação de envio

## 🔧 Configuração do Backend

Para receber os dados do formulário, configure um dos seguintes serviços:

### Formspree (Recomendado)
1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Obtenha seu endpoint
4. Substitua `YOUR_FORM_ID` no arquivo `script.js`

### Netlify Forms
1. Deploy o site no Netlify
2. Configure o formulário no painel
3. O Netlify detectará automaticamente o form

### Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure uma tabela para armazenar os dados
3. Implemente a função `sendDataToSupabase()`

## 📊 Dados Coletados

O formulário coleta as seguintes informações:

```json
{
  "area_negocio": "Logística e Transporte",
  "dimensao_estoque": "Até 100 itens",
  "clientes_ativos": "Até 50 clientes",
  "relacao_fornecedores": "Manual (e-mail, telefone)",
  "tecnologias_atuais": ["Planilhas", "Site ou Aplicativo Online"],
  "urgencia": "Urgente",
  "beneficios": ["Aumentar a Produtividade", "Reduzir Custos"],
  "prazo": "Nos próximos 3 meses",
  "email": "contato@empresa.com"
}
```

## 🎯 Próximas Melhorias

- [ ] Integração com CRM
- [ ] Analytics e tracking
- [ ] Testes A/B
- [ ] Otimização SEO
- [ ] PWA capabilities
- [ ] Multi-language support

## 📞 Contato

Para mais informações sobre as soluções de logística:
- WhatsApp: [+55 21 96412-0231](https://wa.me/5521964120231)

## 📄 Licença

© 2024 Waldeck. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para transformar negócios de logística**
