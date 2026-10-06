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
// Slots and art direction live in docs/imagery-brief.md; each file embeds its own origin.
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
		phrase: 'Tecnologia sem estratégia gera custos. Tecnologia com inteligência gera resultados.'
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
		phrase: 'Mais do que suporte. Inteligência para o seu negócio.'
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
		phrase: 'Conectando tecnologia, pessoas e resultados.'
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
		phrase: 'Transformamos dados em decisões e decisões em resultados.'
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
		phrase: 'A evolução digital começa com decisões inteligentes.'
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
		phrase: 'Seu parceiro estratégico em transformação digital.'
	}
]

export const getService = (slug: string) => services.find(s => s.slug === slug)

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
