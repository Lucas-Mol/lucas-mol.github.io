/* Translations — EN / PT-BR */
window.I18N = {
  "en": {
    "meta.title": "Lucas Mol — Senior Software Engineer",
    "meta.desc": "Lucas Mol — Senior Software Engineer focused on backend, distributed systems and software architecture. Java, Spring Boot, Go, Kafka, AWS. Open to remote (US/CA time zones) and relocation.",
    "nav.skip": "Skip to content",
    "nav.hello": "Hello",
    "nav.about": "About",
    "nav.arch": "Architecture",
    "nav.journey": "Journey",
    "nav.stack": "Stack & Labs",
    "nav.contact": "Contact",
    "nav.cv": "Download CV",
    "nav.menu": "Open menu",
    "nav.menuClose": "Close menu",
    "hint": "Scroll to follow the request",
    "hello.hello": "Hello!",
    "hello.roleSub": "· Backend & Distributed Systems",
    "hello.intro": "I design and modernize backend systems for mission-critical, high-traffic platforms — resilient microservices, asynchronous flows and architecture that holds up under real load.",
    "hello.open": "Open to remote (US/CA time zones) & relocation",
    "hello.talk": "Get in touch",
    "about.eyebrow": "About",
    "about.h2": "I build backends that hold up when it matters.",
    "about.p1": "Senior Software Engineer with 7+ years designing and modernizing backend systems in Java and Go — from 24/7 multi-tenant microservices to legacy migrations. I care about architecture that survives real traffic: asynchronous flows, resilience patterns and observability by default.",
    "about.p2": "Currently pursuing an MBA in Software Architecture and going deeper into AppSec & DevSecOps.",
    "about.photoAlt": "Portrait of Lucas Mol",
    "about.place": "Brazil",
    "about.m1": "years building and modernizing software",
    "journey.eyebrow": "Journey",
    "journey.h2": "Every stop added a layer.",
    "journey.hint": "Select a station to open it",
    "stack.eyebrow": "Stack & Labs",
    "stack.h2": "Some tools I work with.",
    "stack.g1": "Languages",
    "stack.g3": "Data & Messaging",
    "stack.g5": "Observability",
    "stack.site": "This portfolio",
    "stack.siteD": "Plain HTML, CSS and JavaScript — horizontal parallax, bilingual content, no frameworks.",
    "stack.repo": "View repo",
    "stack.ghD": "Public repositories, experiments and study projects.",
    "stack.profile": "View profile",
    "contact.eyebrow": "Contact",
    "contact.h2": "Let's talk.",
    "contact.sub": "Open to remote roles and relocation, working in your team's time zone.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.msg": "Message",
    "contact.msgPh": "Tell me about the role or project",
    "contact.send": "Send message",
    "contact.sent": "Your email app is opening with the message ready to send.",
    "contact.invalid": "Fill in your name, a valid email and a message.",
    "contact.subject": "Contact from portfolio — ",
    "stations": [
      {
        "year": "2018",
        "role": "Software Development Intern",
        "org": "Centro Universitário UniCarioca",
        "period": "Aug 2018 – Feb 2020",
        "bullets": [
          "Facial-recognition authentication prototype with OpenCV and machine learning",
          "Learning-assessment app for early childhood education",
          "Web apps in Java and C# supporting master's research"
        ],
        "tags": [
          "Java",
          "C#",
          "OpenCV"
        ]
      },
      {
        "year": "2021",
        "role": "Software Developer",
        "org": "CAPGov – COPPETEC (UFRJ)",
        "period": "Nov 2021 – Jul 2024",
        "bullets": [
          "High-availability RESTful APIs and full-stack JSF apps with EJB, using TDD and DDD",
          "Performance overhauls on critical services through query optimization and concurrency tuning"
        ],
        "tags": [
          "Java EE",
          "JSF",
          "EJB",
          "TDD",
          "DDD"
        ]
      },
      {
        "year": "2024",
        "role": "Tech Lead / Senior Developer",
        "org": "CAPGov – COPPETEC (UFRJ)",
        "period": "Jul 2024 – Oct 2025",
        "bullets": [
          "Led a team of 4 on systems for a state Public Defender's Office",
          "Migrated a Java 8 monolith into 4 Spring Boot microservices and Go schedulers",
          "OIDC / OAuth 2.0 single sign-on across multiple services"
        ],
        "tags": [
          "Spring Boot",
          "Go",
          "OIDC",
          "OAuth 2.0",
          "AWS"
        ]
      },
      {
        "year": "2025",
        "role": "Senior Software Engineer",
        "org": "Dock",
        "period": "Nov 2025 – Present",
        "bullets": [
          "24/7 multi-tenant microservices on a high-volume platform",
          "Moved latency-bound third-party integrations to asynchronous processing",
          "Deadline propagation and canary deploys with Helm and ArgoCD"
        ],
        "tags": [
          "Java",
          "Spring Boot",
          "Kafka",
          "AWS",
          "Kubernetes"
        ]
      }
    ],
    "about.f2t": "Distributed systems",
    "about.f2": "multi-tenant microservices running 24/7",
    "about.f3t": "Architecture",
    "about.f3": "DDD, event-driven design and legacy modernization",
    "about.f4t": "Resilience",
    "about.f4": "timeouts, rollbacks and observability by default",
    "arch.eyebrow": "Architecture",
    "arch.h2": "Architectures I work with.",
    "arch.sub": "Pick one to watch a request — and its response — travel through it.",
    "arch.cta": "Watch simulation",
    "sim.req": "Request",
    "sim.res": "Response",
    "sim.internal": "Smaller dots are internal calls",
    "sim.prev": "Previous",
    "sim.next": "Next",
    "sim.close": "Close",
    "sim.how": "How it flows",
    "contact.tzTitle": "Working on your team's hours",
    "contact.tzSub": "I adapt my schedule to the company's time zone — North America or Europe.",
    "contact.zPacific": "Pacific",
    "contact.zEastern": "Eastern",
    "contact.zCentral": "Central Europe",
    "contact.zMe": "Me — Brazil",
    "contact.zMeSub": "Brasília time",
    "contact.tzNote": "Live local times.",
    "archs": {
      "micro": {
        "title": "Microservices",
        "desc": "Independent services behind a gateway, each owning its own data.",
        "nodes": {
          "client": [
            "Client",
            "request"
          ],
          "gateway": [
            "API Gateway",
            "auth · routing"
          ],
          "svcA": [
            "Service A",
            "business domain"
          ],
          "svcB": [
            "Service B",
            "business domain"
          ],
          "dbA": [
            "Database A",
            "owned by A"
          ],
          "dbB": [
            "Database B",
            "owned by B"
          ]
        },
        "steps": [
          "The client calls a single entry point.",
          "The gateway authenticates and routes to the right service.",
          "Service A reads its own data and calls Service B.",
          "Service B answers from its own database.",
          "The response travels back along the same path."
        ]
      },
      "event": {
        "title": "Event-driven (async)",
        "desc": "Accept the request fast and finish the work in the background.",
        "nodes": {
          "client": [
            "Client",
            "request"
          ],
          "api": [
            "API",
            "validate · publish"
          ],
          "broker": [
            "Message broker",
            "event log"
          ],
          "worker": [
            "Worker",
            "consumer"
          ],
          "external": [
            "External provider",
            "third party"
          ],
          "db": [
            "Database",
            "results"
          ]
        },
        "steps": [
          "The client sends the request.",
          "The API validates it and publishes an event.",
          "The client gets an acknowledgement right away — no waiting on slow dependencies.",
          "A worker consumes the event and calls the external provider.",
          "The result is stored; the client is notified or checks the status later."
        ]
      },
      "hex": {
        "title": "Hexagonal (ports & adapters)",
        "desc": "Business rules at the center, isolated from frameworks, databases and APIs.",
        "nodes": {
          "client": [
            "Client",
            "request"
          ],
          "inAdapter": [
            "Inbound adapter",
            "HTTP · messages"
          ],
          "useCase": [
            "Use case",
            "inbound port"
          ],
          "domain": [
            "Domain model",
            "business rules"
          ],
          "outAdapter": [
            "Outbound adapter",
            "outbound port"
          ],
          "db": [
            "Database",
            "persistence"
          ]
        },
        "labels": {
          "adapters": "Adapters",
          "core": "Core"
        },
        "steps": [
          "The request enters through an inbound adapter.",
          "The adapter calls a use case through an inbound port.",
          "Domain rules decide — with no infrastructure code involved.",
          "An outbound port persists the result through an adapter.",
          "The response returns through the same ports."
        ]
      },
      "strangler": {
        "title": "Strangler fig migration",
        "desc": "Replace a legacy system route by route, with no big-bang rewrite.",
        "nodes": {
          "client": [
            "Client",
            "request"
          ],
          "facade": [
            "Routing facade",
            "route by route"
          ],
          "newA": [
            "New service A",
            "migrated"
          ],
          "newB": [
            "New service B",
            "migrated"
          ],
          "legacy": [
            "Legacy monolith",
            "being retired"
          ]
        },
        "labels": {
          "migrated": "migrated routes",
          "remaining": "remaining routes"
        },
        "steps": [
          "All traffic goes through a routing facade.",
          "Routes already migrated are served by new services.",
          "Remaining routes still reach the legacy system.",
          "Each release moves more routes, until the legacy system can be switched off."
        ]
      },
      "multi": {
        "title": "Multi-tenant platform",
        "desc": "One platform serving many clients, with isolated context and data.",
        "nodes": {
          "tA": [
            "Tenant A",
            "client company"
          ],
          "tB": [
            "Tenant B",
            "client company"
          ],
          "tC": [
            "Tenant C",
            "client company"
          ],
          "gateway": [
            "Gateway",
            "tenant resolution"
          ],
          "services": [
            "Shared services",
            "tenant context"
          ],
          "dA": [
            "Data A",
            "isolated"
          ],
          "dB": [
            "Data B",
            "isolated"
          ],
          "dC": [
            "Data C",
            "isolated"
          ]
        },
        "steps": [
          "Every request carries the tenant's identity.",
          "The gateway resolves the tenant, its limits and configuration.",
          "Shared services run with the tenant context propagated.",
          "Data access is scoped to that tenant only.",
          "The response returns without ever crossing tenant boundaries."
        ]
      },
      "sso": {
        "title": "Single sign-on",
        "desc": "One login across many applications, with token-based access to APIs (OIDC / OAuth 2.0).",
        "nodes": {
          "user": [
            "User",
            "browser"
          ],
          "appA": [
            "Application A",
            "client app"
          ],
          "appB": [
            "Application B",
            "client app"
          ],
          "idp": [
            "Identity provider",
            "login · tokens"
          ],
          "api": [
            "Protected API",
            "validates token"
          ]
        },
        "steps": [
          "The user opens Application A.",
          "Application A redirects to the identity provider to log in.",
          "The provider returns a signed token.",
          "Application A calls an API with the token; the API validates it.",
          "Application B reuses the same session — no second login."
        ]
      }
    }
  },
  "pt": {
    "meta.title": "Lucas Mol — Senior Software Engineer",
    "meta.desc": "Lucas Mol — Senior Software Engineer com foco em backend, sistemas distribuídos e arquitetura de software. Java, Spring Boot, Go, Kafka, AWS. Aberto a remoto (fusos EUA/Canadá) e relocação.",
    "nav.skip": "Pular para o conteúdo",
    "nav.hello": "Olá",
    "nav.about": "Sobre",
    "nav.arch": "Arquitetura",
    "nav.journey": "Trajetória",
    "nav.stack": "Stack & Labs",
    "nav.contact": "Contato",
    "nav.cv": "Baixar CV",
    "nav.menu": "Abrir menu",
    "nav.menuClose": "Fechar menu",
    "hint": "Role para seguir a requisição",
    "hello.hello": "Olá!",
    "hello.roleSub": "· Backend & Sistemas Distribuídos",
    "hello.intro": "Projeto e modernizo sistemas backend para plataformas críticas e de alto tráfego — microsserviços resilientes, fluxos assíncronos e arquitetura que aguenta carga real.",
    "hello.open": "Aberto a remoto (fusos EUA/Canadá) e relocação",
    "hello.talk": "Fale comigo",
    "about.eyebrow": "Sobre",
    "about.h2": "Construo backends que se sustentam quando mais importa.",
    "about.p1": "Senior Software Engineer com mais de 7 anos projetando e modernizando sistemas backend em Java e Go — de microsserviços multi-tenant 24/7 a migrações de legado. Me importo com arquitetura que sobrevive a tráfego real: fluxos assíncronos, padrões de resiliência e observabilidade desde o início.",
    "about.p2": "Cursando MBA em Arquitetura de Software e me aprofundando em AppSec & DevSecOps.",
    "about.photoAlt": "Retrato de Lucas Mol",
    "about.place": "Brasil",
    "about.m1": "anos construindo e modernizando software",
    "journey.eyebrow": "Trajetória",
    "journey.h2": "Cada parada somou uma camada.",
    "journey.hint": "Selecione uma estação para abri-la",
    "stack.eyebrow": "Stack & Labs",
    "stack.h2": "Algumas ferramentas com que trabalho.",
    "stack.g1": "Linguagens",
    "stack.g3": "Dados & Mensageria",
    "stack.g5": "Observabilidade",
    "stack.site": "Este portfólio",
    "stack.siteD": "HTML, CSS e JavaScript puros — parallax horizontal, conteúdo bilíngue, sem frameworks.",
    "stack.repo": "Ver repositório",
    "stack.ghD": "Repositórios públicos, experimentos e projetos de estudo.",
    "stack.profile": "Ver perfil",
    "contact.eyebrow": "Contato",
    "contact.h2": "Vamos conversar.",
    "contact.sub": "Aberto a vagas remotas e a relocação, trabalhando no fuso do seu time.",
    "contact.name": "Nome",
    "contact.email": "E-mail",
    "contact.msg": "Mensagem",
    "contact.msgPh": "Conte sobre a vaga ou o projeto",
    "contact.send": "Enviar mensagem",
    "contact.sent": "Seu app de e-mail está abrindo com a mensagem pronta para enviar.",
    "contact.invalid": "Preencha seu nome, um e-mail válido e a mensagem.",
    "contact.subject": "Contato pelo portfólio — ",
    "stations": [
      {
        "year": "2018",
        "role": "Estagiário de Desenvolvimento",
        "org": "Centro Universitário UniCarioca",
        "period": "Ago 2018 – Fev 2020",
        "bullets": [
          "Protótipo de autenticação com reconhecimento facial usando OpenCV e machine learning",
          "Aplicativo de avaliação de aprendizagem na educação infantil",
          "Aplicações web em Java e C# apoiando pesquisas de mestrado"
        ],
        "tags": [
          "Java",
          "C#",
          "OpenCV"
        ]
      },
      {
        "year": "2021",
        "role": "Desenvolvedor de Software",
        "org": "CAPGov – COPPETEC (UFRJ)",
        "period": "Nov 2021 – Jul 2024",
        "bullets": [
          "APIs RESTful de alta disponibilidade e aplicações full-stack JSF com EJB, usando TDD e DDD",
          "Otimizações de performance em serviços críticos com ajuste de queries e concorrência"
        ],
        "tags": [
          "Java EE",
          "JSF",
          "EJB",
          "TDD",
          "DDD"
        ]
      },
      {
        "year": "2024",
        "role": "Tech Lead / Desenvolvedor Sênior",
        "org": "CAPGov – COPPETEC (UFRJ)",
        "period": "Jul 2024 – Out 2025",
        "bullets": [
          "Liderei um time de 4 devs em sistemas para uma Defensoria Pública estadual",
          "Migração de um monólito Java 8 para 4 microsserviços Spring Boot e schedulers em Go",
          "Single sign-on com OIDC / OAuth 2.0 entre múltiplos serviços"
        ],
        "tags": [
          "Spring Boot",
          "Go",
          "OIDC",
          "OAuth 2.0",
          "AWS"
        ]
      },
      {
        "year": "2025",
        "role": "Senior Software Engineer",
        "org": "Dock",
        "period": "Nov 2025 – Atual",
        "bullets": [
          "Microsserviços multi-tenant 24/7 em uma plataforma de alto volume",
          "Migração de integrações lentas com terceiros para processamento assíncrono",
          "Deadline propagation e deploys canary com Helm e ArgoCD"
        ],
        "tags": [
          "Java",
          "Spring Boot",
          "Kafka",
          "AWS",
          "Kubernetes"
        ]
      }
    ],
    "about.f2t": "Sistemas distribuídos",
    "about.f2": "microsserviços multi-tenant rodando 24/7",
    "about.f3t": "Arquitetura",
    "about.f3": "DDD, design orientado a eventos e modernização de legado",
    "about.f4t": "Resiliência",
    "about.f4": "timeouts, rollbacks e observabilidade desde o início",
    "arch.eyebrow": "Arquitetura",
    "arch.h2": "Arquiteturas com que trabalho.",
    "arch.sub": "Escolha uma para ver a requisição — e a resposta — percorrendo o sistema.",
    "arch.cta": "Ver simulação",
    "sim.req": "Requisição",
    "sim.res": "Resposta",
    "sim.internal": "Pontos menores são chamadas internas",
    "sim.prev": "Anterior",
    "sim.next": "Próxima",
    "sim.close": "Fechar",
    "sim.how": "Como flui",
    "contact.tzTitle": "No horário do seu time",
    "contact.tzSub": "Adapto minha rotina ao fuso da empresa — América do Norte ou Europa.",
    "contact.zPacific": "Pacífico",
    "contact.zEastern": "Leste",
    "contact.zCentral": "Europa Central",
    "contact.zMe": "Eu — Brasil",
    "contact.zMeSub": "horário de Brasília",
    "contact.tzNote": "Horários locais ao vivo.",
    "archs": {
      "micro": {
        "title": "Microsserviços",
        "desc": "Serviços independentes atrás de um gateway, cada um dono dos próprios dados.",
        "nodes": {
          "client": [
            "Cliente",
            "requisição"
          ],
          "gateway": [
            "API Gateway",
            "auth · roteamento"
          ],
          "svcA": [
            "Serviço A",
            "domínio de negócio"
          ],
          "svcB": [
            "Serviço B",
            "domínio de negócio"
          ],
          "dbA": [
            "Banco A",
            "do serviço A"
          ],
          "dbB": [
            "Banco B",
            "do serviço B"
          ]
        },
        "steps": [
          "O cliente chama um único ponto de entrada.",
          "O gateway autentica e roteia para o serviço certo.",
          "O Serviço A lê seus próprios dados e chama o Serviço B.",
          "O Serviço B responde a partir do próprio banco.",
          "A resposta volta pelo mesmo caminho."
        ]
      },
      "event": {
        "title": "Orientada a eventos (async)",
        "desc": "Aceita a requisição rápido e termina o trabalho em segundo plano.",
        "nodes": {
          "client": [
            "Cliente",
            "requisição"
          ],
          "api": [
            "API",
            "valida · publica"
          ],
          "broker": [
            "Message broker",
            "log de eventos"
          ],
          "worker": [
            "Worker",
            "consumidor"
          ],
          "external": [
            "Provedor externo",
            "terceiro"
          ],
          "db": [
            "Banco",
            "resultados"
          ]
        },
        "steps": [
          "O cliente envia a requisição.",
          "A API valida e publica um evento.",
          "O cliente recebe a confirmação na hora — sem esperar dependências lentas.",
          "Um worker consome o evento e chama o provedor externo.",
          "O resultado é salvo; o cliente é notificado ou consulta o status depois."
        ]
      },
      "hex": {
        "title": "Hexagonal (ports & adapters)",
        "desc": "Regras de negócio no centro, isoladas de frameworks, bancos e APIs.",
        "nodes": {
          "client": [
            "Cliente",
            "requisição"
          ],
          "inAdapter": [
            "Adapter de entrada",
            "HTTP · mensagens"
          ],
          "useCase": [
            "Caso de uso",
            "porta de entrada"
          ],
          "domain": [
            "Modelo de domínio",
            "regras de negócio"
          ],
          "outAdapter": [
            "Adapter de saída",
            "porta de saída"
          ],
          "db": [
            "Banco",
            "persistência"
          ]
        },
        "labels": {
          "adapters": "Adapters",
          "core": "Núcleo"
        },
        "steps": [
          "A requisição entra por um adapter de entrada.",
          "O adapter chama um caso de uso por uma porta de entrada.",
          "As regras de domínio decidem — sem código de infraestrutura envolvido.",
          "Uma porta de saída persiste o resultado por meio de um adapter.",
          "A resposta volta pelas mesmas portas."
        ]
      },
      "strangler": {
        "title": "Migração Strangler Fig",
        "desc": "Substitui um sistema legado rota por rota, sem reescrita big-bang.",
        "nodes": {
          "client": [
            "Cliente",
            "requisição"
          ],
          "facade": [
            "Fachada de roteamento",
            "rota por rota"
          ],
          "newA": [
            "Novo serviço A",
            "migrado"
          ],
          "newB": [
            "Novo serviço B",
            "migrado"
          ],
          "legacy": [
            "Monólito legado",
            "em desativação"
          ]
        },
        "labels": {
          "migrated": "rotas migradas",
          "remaining": "rotas restantes"
        },
        "steps": [
          "Todo o tráfego passa por uma fachada de roteamento.",
          "Rotas já migradas são atendidas pelos novos serviços.",
          "As rotas restantes ainda chegam ao sistema legado.",
          "Cada release migra mais rotas, até o legado poder ser desligado."
        ]
      },
      "multi": {
        "title": "Plataforma multi-tenant",
        "desc": "Uma plataforma atendendo muitos clientes, com contexto e dados isolados.",
        "nodes": {
          "tA": [
            "Tenant A",
            "empresa cliente"
          ],
          "tB": [
            "Tenant B",
            "empresa cliente"
          ],
          "tC": [
            "Tenant C",
            "empresa cliente"
          ],
          "gateway": [
            "Gateway",
            "resolução do tenant"
          ],
          "services": [
            "Serviços compartilhados",
            "contexto do tenant"
          ],
          "dA": [
            "Dados A",
            "isolados"
          ],
          "dB": [
            "Dados B",
            "isolados"
          ],
          "dC": [
            "Dados C",
            "isolados"
          ]
        },
        "steps": [
          "Toda requisição carrega a identidade do tenant.",
          "O gateway resolve o tenant, seus limites e configurações.",
          "Os serviços compartilhados rodam com o contexto do tenant propagado.",
          "O acesso a dados fica restrito àquele tenant.",
          "A resposta volta sem nunca cruzar a fronteira entre tenants."
        ]
      },
      "sso": {
        "title": "Single sign-on",
        "desc": "Um login para várias aplicações, com acesso a APIs via token (OIDC / OAuth 2.0).",
        "nodes": {
          "user": [
            "Usuário",
            "navegador"
          ],
          "appA": [
            "Aplicação A",
            "app cliente"
          ],
          "appB": [
            "Aplicação B",
            "app cliente"
          ],
          "idp": [
            "Provedor de identidade",
            "login · tokens"
          ],
          "api": [
            "API protegida",
            "valida o token"
          ]
        },
        "steps": [
          "O usuário abre a Aplicação A.",
          "A Aplicação A redireciona para o provedor de identidade para o login.",
          "O provedor devolve um token assinado.",
          "A Aplicação A chama uma API com o token; a API o valida.",
          "A Aplicação B reaproveita a mesma sessão — sem segundo login."
        ]
      }
    }
  }
};
