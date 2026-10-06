// Every fact on the site comes from the client's content doc (CARETECH-Site.docx).

export const site = {
	name: 'CareTech',
	legalName: 'CareTech IT',
	url: 'https://caretechit.com.br',
	slogan: ['Tecnologia que cuida.', 'Inteligência que transforma.'],
	description:
		'A CareTech é especializada em Tecnologia da Informação, Inteligência de Dados e Transformação Digital, com experiência em ambientes críticos de saúde. Atendimento nacional.',
	founded: 2022,
	founderYears: 15
}

export const contact = {
	whatsappDisplay: '(41) 9822-2437',
	whatsappHref:
		'https://wa.me/554198222437?text=' +
		encodeURIComponent('Olá, CareTech! Gostaria de conversar sobre um projeto.'),
	email: 'contato@caretechit.com.br',
	coverage: 'Atendimento Nacional'
}

export const routes = {
	home: '/',
	about: '/sobre',
	services: '/servicos',
	cases: '/cases',
	contact: '/contato',
	privacy: '/lgpd-compliance'
}

export const nav = [
	{ label: 'Início', href: routes.home },
	{ label: 'Sobre', href: routes.about },
	{ label: 'Serviços', href: routes.services },
	{ label: 'Cases', href: routes.cases },
	{ label: 'Contato', href: routes.contact },
	{ label: 'LGPD & Compliance', href: routes.privacy }
]

const photo = (slot: string, alt: string) => ({ src: `/img/photos/${slot}.jpg`, alt })

// One graded series: Magnific generations (hero, hero cards) and licensed Shutterstock photos.
// Slots and art direction live in _docs/imagery-brief.md; each file embeds its own origin.
export const images = {
	hero: photo('hero', 'Profissional caminhando por um corredor hospitalar à noite com um notebook'),
	heroCardA: photo('hero-card-a', 'Mãos conectando um cabo de rede em um rack de comunicação'),
	heroCardB: photo('hero-card-b', 'Enfermeira trabalhando no computador do posto de enfermagem à noite'),
	intro: photo('intro', 'Profissional de saúde consultando um tablet em um corredor hospitalar'),
	band: photo('band', 'Técnico caminhando pelo corredor de uma sala de servidores'),
	ge: photo('ge', 'Duas pessoas analisando relatórios impressos em um escritório à noite'),
	os: photo('os', 'Técnico iluminando um rack de servidores com uma lanterna'),
	pe: photo('pe', 'Especialista acompanhando painéis de dados em uma sala de monitoramento'),
	id: photo('id', 'Óculos refletindo gráficos de dados exibidos em uma tela'),
	in: photo('in', 'Cabos de rede azuis conectados a um switch iluminado'),
	ia: photo('ia', 'Pessoa em uma sala escura entre duas grandes telas de dados'),
	case1: photo('case1', 'Técnico instalando equipamentos em um rack de TI hospitalar'),
	case2: photo('case2', 'Equipe trabalhando à noite com notebook e relatórios sob a luz de uma luminária'),
	about: photo('about', 'Fachada de um edifício hospitalar com janelas em sequência')
}

export type Faq = { q: string; a: string }

export type Service = {
	slug: string
	code: string
	title: string
	short: string
	summary: string
	lead: string
	listLabel: string
	items: string[]
	image: { src: string; alt: string }
	phrase: string
	// two short paragraphs: the problem, then how CareTech works on it
	approach: string[]
	faq: Faq[]
}

export const services: Service[] = [
	{
		slug: 'gestao-estrategica-de-tecnologia',
		code: 'GE',
		title: 'Gestão Estratégica de Tecnologia',
		short: 'Gestão Estratégica',
		summary: 'Atuamos como parceiros executivos na gestão de ambientes de TI.',
		lead:
			'Da governança aos indicadores, assumimos a gestão da tecnologia ao lado da sua diretoria, com a mesma régua de quem já respondeu pela TI inteira de uma instituição hospitalar.',
		listLabel: 'Inclui',
		items: [
			'Transformação Digital',
			'Gestão operacional',
			'Planejamento estratégico',
			'Governança de TI',
			'Gestão de fornecedores',
			'Gestão de contratos',
			'Gestão de indicadores',
			'Gestão de equipe',
			'Processos'
		],
		image: images.ge,
		phrase: 'Tecnologia sem estratégia gera custos. Tecnologia com inteligência gera resultados.',
		approach: [
			'Em muitas organizações, a TI cresce sem direção: contratos espalhados, fornecedores sem acompanhamento, equipe sobrecarregada e nenhum indicador que mostre se a tecnologia está ajudando o negócio. É o retrato da baixa maturidade tecnológica, um dos desafios mais recorrentes que encontramos.',
			'A CareTech atua como parceira executiva: estrutura governança e processos, organiza contratos e fornecedores, define indicadores e conduz o planejamento estratégico ao lado da diretoria. É a mesma abordagem que aplicamos ao assumir a gestão integral da TI de uma instituição hospitalar de grande porte, onde disponibilidade e segurança da informação não admitem improviso.'
		],
		faq: [
			{
				q: 'A CareTech pode assumir a gestão completa da TI?',
				a: 'Sim. A CareTech já assumiu a gestão integral da área de TI de uma instituição hospitalar de grande porte, estruturando processos, governança, indicadores e a evolução tecnológica da organização.'
			},
			{
				q: 'O que é governança de TI?',
				a: 'É o conjunto de processos, papéis e indicadores que garante que a tecnologia apoie os objetivos da organização: como as decisões de TI são tomadas, como os investimentos são priorizados e como os resultados são acompanhados.'
			},
			{
				q: 'A gestão estratégica de TI serve para empresas fora da saúde?',
				a: 'Sim. A experiência vem de ambientes hospitalares, mas planejamento, governança, contratos, fornecedores e indicadores são desafios de qualquer organização que depende de tecnologia.'
			}
		]
	},
	{
		slug: 'operacoes-e-sustentacao-tecnologica',
		code: 'OS',
		title: 'Operações e Sustentação Tecnológica',
		short: 'Operações e Sustentação',
		summary: 'Garantimos estabilidade, disponibilidade e continuidade operacional.',
		lead:
			'Em ambientes onde a operação não pode parar, estabilidade é requisito. Cuidamos da base que sustenta tudo: infraestrutura, redes, atendimento e monitoramento.',
		listLabel: 'Soluções',
		items: ['Infraestrutura', 'Redes', 'Service Desk', 'Suporte Técnico', 'Outsourcing', 'Monitoramento'],
		image: images.os,
		phrase: 'Mais do que suporte. Inteligência para o seu negócio.',
		approach: [
			'Infraestrutura instável, rede que cai e chamados sem resposta param a operação. Em hospitais e em outros ambientes críticos, o custo de uma parada vai muito além do financeiro.',
			'Cuidamos da base tecnológica da sua organização: infraestrutura, redes, service desk, suporte técnico e monitoramento, com a opção de outsourcing da operação. O objetivo é estabilidade, disponibilidade e continuidade operacional, acompanhadas por processos e indicadores que mostram como a operação está de fato.'
		],
		faq: [
			{
				q: 'O que está incluído em operações e sustentação?',
				a: 'Infraestrutura, redes, service desk, suporte técnico, monitoramento e, quando faz sentido, o outsourcing da operação de TI.'
			},
			{
				q: 'A CareTech faz outsourcing de TI?',
				a: 'Sim. O outsourcing é uma das soluções desta frente, para organizações que preferem confiar a operação de TI a um parceiro especializado.'
			},
			{
				q: 'Por que a experiência em hospitais faz diferença na sustentação?',
				a: 'Porque em um hospital a TI não pode parar. Quem já sustentou esse tipo de ambiente trata disponibilidade e continuidade como requisito, não como meta.'
			}
		]
	},
	{
		slug: 'projetos-e-especialistas-sob-demanda',
		code: 'PE',
		title: 'Projetos e Especialistas Sob Demanda',
		short: 'Especialistas Sob Demanda',
		summary:
			'Disponibilizamos profissionais altamente qualificados para projetos estratégicos e operações críticas.',
		lead:
			'Quando falta gente especializada, o projeto para. Alocamos os perfis certos para a sua operação ou para o seu projeto, pelo tempo que ele precisar.',
		listLabel: 'Perfis',
		items: [
			'Especialistas em Dados',
			'Analistas de BI',
			'Analistas de Sistemas',
			'Analista de negócio',
			'Analistas de Infraestrutura',
			'Analista de suporte'
		],
		image: images.pe,
		phrase: 'Conectando tecnologia, pessoas e resultados.',
		approach: [
			'A escassez de profissionais especializados é um dos desafios mais recorrentes em TI: projetos atrasam, a operação fica dependente de poucas pessoas e o conhecimento se perde quando alguém sai.',
			'Alocamos especialistas em dados e analistas de BI, de sistemas, de negócio, de infraestrutura e de suporte, tanto para projetos estratégicos quanto para reforçar operações críticas, pelo tempo que for necessário. Os profissionais trabalham com a mesma visão de negócio que orienta todos os serviços da CareTech.'
		],
		faq: [
			{
				q: 'Quais perfis a CareTech disponibiliza?',
				a: 'Especialistas em dados, analistas de BI, analistas de sistemas, analistas de negócio, analistas de infraestrutura e analistas de suporte.'
			},
			{
				q: 'Os profissionais atuam em projetos ou na operação?',
				a: 'Nos dois. A alocação atende projetos estratégicos e também operações críticas que precisam de reforço.'
			},
			{
				q: 'Por quanto tempo um especialista fica alocado?',
				a: 'Pelo tempo que o projeto ou a operação precisar.'
			}
		]
	},
	{
		slug: 'inteligencia-de-dados-e-analytics',
		code: 'ID',
		title: 'Inteligência de Dados e Analytics',
		short: 'Dados e Analytics',
		summary: 'Transformação de dados em inteligência para tomada de decisão.',
		lead:
			'Dado que ninguém usa é custo. Estruturamos indicadores, painéis e a gestão à vista para que cada decisão da sua diretoria tenha um número confiável por trás.',
		listLabel: 'Soluções',
		items: [
			'Business Intelligence',
			'Weknow',
			'Power BI',
			'Dashboards executivos',
			'Indicadores estratégicos',
			'Gestão à Vista',
			"KPI's",
			'Analytics'
		],
		image: images.id,
		phrase: 'Transformamos dados em decisões e decisões em resultados.',
		approach: [
			'Quase toda organização tem dados, mas poucas conseguem usá-los para decidir. Relatórios que não batem, planilhas paralelas e indicadores em que ninguém confia levam a decisões por intuição.',
			'Estruturamos Business Intelligence, dashboards executivos e indicadores estratégicos com ferramentas como Power BI e Weknow, e implantamos a gestão à vista para que a informação certa esteja na frente de quem decide. A experiência com preparação, saneamento e validação de dados garante que os números partam de uma base confiável.'
		],
		faq: [
			{
				q: 'Com quais ferramentas de BI a CareTech trabalha?',
				a: 'Entre elas, Power BI e Weknow, aplicadas em dashboards executivos, indicadores estratégicos e gestão à vista.'
			},
			{
				q: 'O que é gestão à vista?',
				a: 'É a prática de deixar os indicadores mais importantes visíveis para quem opera e para quem decide, em painéis atualizados, para que os problemas apareçam cedo e a equipe acompanhe os resultados.'
			},
			{
				q: 'E se os dados da empresa não forem confiáveis?',
				a: 'Esse costuma ser o primeiro passo. A CareTech tem experiência em preparação, saneamento e validação de dados, como no apoio a uma migração de ERP, para que os indicadores partam de uma base confiável.'
			}
		]
	},
	{
		slug: 'integracoes-e-automacoes',
		code: 'IN',
		title: 'Integrações e Automações',
		short: 'Integrações e Automações',
		summary: 'Integramos sistemas e processos para aumentar eficiência operacional.',
		lead:
			'Sistemas que não conversam geram retrabalho. Conectamos aplicações, automatizamos fluxos e migramos dados com o cuidado que uma operação crítica exige.',
		listLabel: 'Aplicações',
		items: [
			'Integração entre sistemas',
			'Automação de processos',
			'Fluxos operacionais',
			'ETL',
			'Migração de dados'
		],
		image: images.in,
		phrase: 'A evolução digital começa com decisões inteligentes.',
		approach: [
			'Quando os sistemas não conversam, a equipe vira a integração: digita a mesma informação duas vezes, exporta planilhas e corrige inconsistências à mão. O resultado é retrabalho, erro e risco operacional.',
			'Integramos sistemas, automatizamos processos e fluxos operacionais e construímos rotinas de ETL e de migração de dados. Em um projeto de migração de ERP, atuamos na preparação, no saneamento e na validação dos dados, reduzindo inconsistências e o risco para a continuidade do negócio.'
		],
		faq: [
			{
				q: 'A CareTech faz migração de dados entre sistemas?',
				a: 'Sim. Em um projeto de migração de ERP, atuamos na preparação, no saneamento e na validação dos dados, com redução de inconsistências e menor risco operacional.'
			},
			{
				q: 'O que é ETL?',
				a: 'ETL (extração, transformação e carga) é o processo de buscar dados em diferentes sistemas, tratá-los e carregá-los em um destino comum, como um data warehouse ou uma ferramenta de BI.'
			},
			{
				q: 'Qual a diferença entre integração e automação?',
				a: 'A integração faz os sistemas trocarem informações entre si; a automação executa tarefas e fluxos sem intervenção manual. Juntas, eliminam retrabalho e reduzem erros.'
			}
		]
	},
	{
		slug: 'inteligencia-artificial',
		code: 'IA',
		title: 'Inteligência Artificial',
		short: 'Inteligência Artificial',
		summary: 'Aplicação de tecnologias de IA para ganho de produtividade e inovação.',
		lead:
			'IA com propósito: aplicada onde gera produtividade de verdade, com governança e segurança da informação desde o primeiro dia.',
		listLabel: 'Aplicações',
		items: [
			'Automação de processos',
			'Assistentes virtuais',
			'Análise de dados',
			'IA Generativa',
			'Processamento inteligente de informações'
		],
		image: images.ia,
		phrase: 'Seu parceiro estratégico em transformação digital.',
		approach: [
			'A inteligência artificial entrou na agenda das organizações, mas aplicada sem objetivo claro ela gera custo e risco, principalmente quando há dados sensíveis envolvidos.',
			'Aplicamos IA onde ela gera produtividade: automação de processos, assistentes virtuais, análise de dados, IA generativa e processamento inteligente de informações. Cada iniciativa nasce com governança e segurança da informação, em linha com o compromisso da CareTech com a LGPD.'
		],
		faq: [
			{
				q: 'Em quais áreas a IA pode ser aplicada?',
				a: 'Automação de processos, assistentes virtuais, análise de dados, IA generativa e processamento inteligente de informações, sempre onde houver ganho real de produtividade.'
			},
			{
				q: 'Como fica a segurança dos dados em projetos de IA?',
				a: 'Governança e segurança da informação entram desde o primeiro dia, em linha com a LGPD e com o compromisso da CareTech com a confidencialidade.'
			},
			{
				q: 'O que é IA generativa?',
				a: 'É a categoria de inteligência artificial que cria conteúdo novo, como textos, resumos e respostas, a partir de dados e instruções. Aplicada com critério, acelera tarefas como atendimento, análise de documentos e produção de relatórios.'
			}
		]
	}
]

export const getService = (slug: string) => services.find(s => s.slug === slug)

// Shown on Contato. Every answer restates facts already on the site; anything else waits for the client.
export const faq: Faq[] = [
	{
		q: 'A CareTech atende apenas instituições de saúde?',
		a: 'Não. A CareTech nasceu na gestão de TI em ambientes de saúde, onde disponibilidade e segurança da informação são críticas, e leva essa experiência para organizações de qualquer setor que precisem de gestão de TI, dados ou transformação digital.'
	},
	{
		q: 'Em quais regiões a CareTech atende?',
		a: 'Em todo o Brasil. O atendimento é nacional.'
	},
	{
		q: 'Quais serviços a CareTech oferece?',
		a: 'Seis frentes: gestão estratégica de tecnologia, operações e sustentação, projetos e especialistas sob demanda, inteligência de dados e analytics, integrações e automações e inteligência artificial.'
	},
	{
		q: 'Como começar um projeto com a CareTech?',
		a: `Conte o desafio da sua operação pelo WhatsApp ${contact.whatsappDisplay}, pelo e-mail ${contact.email} ou pelo formulário desta página. A partir dessa conversa, entendemos o cenário e indicamos o melhor caminho.`
	},
	{
		q: 'Qual é a experiência da CareTech?',
		a: 'A empresa foi fundada em 2022 a partir de mais de 15 anos de experiência do seu fundador em ambientes corporativos complexos, especialmente na saúde. Entre os projetos está a gestão integral da TI de uma instituição hospitalar de grande porte.'
	},
	{
		q: 'Como a CareTech trata dados pessoais e informações confidenciais?',
		a: 'Com medidas técnicas, administrativas e organizacionais que garantem confidencialidade, integridade e disponibilidade, em conformidade com a LGPD. Pelo mesmo motivo, os nomes dos clientes dos nossos cases são preservados.'
	}
]

export const challenges = [
	{
		label: 'Escassez de especialistas',
		full: 'Escassez de profissionais especializados',
		code: 'PE',
		answer: 'Projetos e Especialistas Sob Demanda',
		text: 'Profissionais qualificados alocados em projetos estratégicos e operações críticas, pelo tempo que for preciso.',
		href: '/servicos/projetos-e-especialistas-sob-demanda'
	},
	{
		label: 'Dados sem estratégia',
		full: 'Dificuldade na utilização estratégica dos dados',
		code: 'ID',
		answer: 'Inteligência de Dados e Analytics',
		text: 'BI, indicadores e gestão à vista para transformar dados em inteligência para a tomada de decisão.',
		href: '/servicos/inteligencia-de-dados-e-analytics'
	},
	{
		label: 'Baixa maturidade',
		full: 'Baixa maturidade tecnológica',
		code: 'GE',
		answer: 'Gestão Estratégica de Tecnologia',
		text: 'Governança, planejamento e indicadores para estruturar a TI e elevar sua maturidade.',
		href: '/servicos/gestao-estrategica-de-tecnologia'
	},
	{
		label: 'Visão de negócio',
		full: 'Falta de parceiros com visão de negócio',
		code: 'VN',
		answer: 'Nosso diferencial: visão de negócio',
		text: 'Muitas empresas entregam tecnologia. A CareTech entrega tecnologia conectada aos objetivos estratégicos da organização.',
		href: '/sobre'
	},
	{
		label: 'Transformação digital',
		full: 'Necessidade crescente de transformação digital',
		code: 'IA',
		answer: 'Integrações, Automações e IA',
		text: 'Sistemas integrados, processos automatizados e inteligência artificial aplicada onde gera produtividade.',
		href: '/servicos/integracoes-e-automacoes'
	}
]

export const cases = [
	{
		slug: 'gestao-completa-de-ti-hospitalar',
		code: 'CASE 01',
		sector: 'Saúde',
		title: 'Gestão Completa de TI para Instituição Hospitalar',
		body:
			'A CareTech assumiu a gestão integral do setor de Tecnologia da Informação de uma instituição hospitalar de grande porte, atuando na estruturação dos processos, governança, indicadores e evolução tecnológica da organização.',
		results: [
			'Melhoria da maturidade tecnológica',
			'Estruturação de indicadores',
			'Fortalecimento da governança',
			'Maior eficiência operacional'
		],
		image: images.case1
	},
	{
		slug: 'migracao-de-erp',
		code: 'CASE 02',
		sector: 'ERP',
		title: 'Apoio Especializado em Migração de ERP',
		body:
			'Participação ativa em projeto de migração de sistema ERP, realizando preparação, saneamento e validação de dados.',
		results: [
			'Redução de inconsistências',
			'Melhor qualidade dos dados',
			'Menor risco operacional',
			'Apoio à continuidade do negócio'
		],
		image: images.case2
	}
]

export const getCase = (slug: string) => cases.find(c => c.slug === slug)

export const values = [
	'Ética',
	'Transparência',
	'Confiança',
	'Inovação',
	'Excelência',
	'Qualidade',
	'Prudência',
	'Respeito',
	'Confidencialidade',
	'Alta Performance',
	'Comprometimento com Resultados'
]

export const compliance = [
	'Transparência',
	'Ética',
	'Integridade',
	'Confidencialidade',
	'Segurança da Informação',
	'Conformidade Legal'
]
