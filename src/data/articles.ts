import { Article, Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-read',
    title: 'Primeros Pasos',
    description: 'Leíste tu primer artículo sobre gamificación.',
    icon: 'Sparkles',
    unlocked: false,
  },
  {
    id: 'theory-master',
    title: 'Mente Psicológica',
    description: 'Completaste la lectura sobre la Teoría de la Gamificación.',
    icon: 'Brain',
    unlocked: false,
  },
  {
    id: 'pbl-architect',
    title: 'Arquitecto PBL',
    description: 'Dominaste los elementos clave y la tríada PBL.',
    icon: 'Award',
    unlocked: false,
  },
  {
    id: 'historian',
    title: 'Cronista Lúdico',
    description: 'Descubriste la historia y evolución desde Nick Pelling en 2002.',
    icon: 'History',
    unlocked: false,
  },
  {
    id: 'case-analyst',
    title: 'Auditor de Casos',
    description: 'Analizaste los casos reales de Duolingo, Nike Run Club y Forest.',
    icon: 'Target',
    unlocked: false,
  },
  {
    id: 'grand-ludologist',
    title: 'Gran Ludólogo',
    description: 'Leíste los 6 artículos de la publicación y completaste tu formación.',
    icon: 'Crown',
    unlocked: false,
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1-teoria',
    slug: 'teoria-de-la-gamificacion',
    title: 'Teoría de la Gamificación: Motivación, Modelo MDA y Psicología Lúdica',
    subtitle: 'Cómo la ciencia del comportamiento y los modelos formales transforman la interacción humana en experiencias memorables.',
    summary: 'Exploración profunda de los fundamentos psicológicos detrás del juego: la Teoría de la Autodeterminación (SDT), el modelo formal MDA (Mecánicas, Dinámicas, Estéticas) y el canal de Flow.',
    category: 'Teoría',
    tags: ['Psicología', 'Modelo MDA', 'Motivación Intrínseca', 'Flow', 'Octalysis'],
    readTimeMinutes: 7,
    date: '24 Oct 2024',
    author: {
      name: 'Dra. Elena Alarcón',
      role: 'Investigadora en Psicología Cognitiva y Diseño Lúdico',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-lime-500/30 via-emerald-500/10 to-transparent',
    acidColor: 'lime',
    iconName: 'Brain',
    xpReward: 120,
    featured: true,
    takeaways: [
      'La motivación intrínseca (autonomía, competencia y relación) sostiene el engagement a largo plazo mucho mejor que las recompensas extrínsecas.',
      'El framework MDA establece una bidireccionalidad: el diseñador crea Mecánicas, que generan Dinámicas, percibidas como Estéticas por el usuario.',
      'El estado de Flow ocurre cuando el nivel de desafío se equilibra milimétricamente con el nivel de habilidad del usuario.',
    ],
    sections: [
      {
        heading: '1. Más allá de jugar: La ciencia de la motivación humana',
        paragraphs: [
          'La gamificación no consiste en "convertir el trabajo en un videojuego", sino en aislar los principios psicológicos que hacen que los juegos sean inherentemente fascinantes y aplicarlos a entornos no lúdicos.',
          'El pilar central descansa sobre la Teoría de la Autodeterminación (Self-Determination Theory, SDT) formulada por Edward Deci y Richard Ryan. La SDT postula que los seres humanos poseemos tres necesidades psicológicas universales e innatas:',
        ],
        keyPoints: [
          'Autonomía: La necesidad de sentir que controlamos nuestras elecciones y acciones.',
          'Competencia: La sensación de dominio, progreso tangible y superación de retos significativos.',
          'Relación (Relatedness): El sentido de pertenencia, conexión y reconocimiento dentro de una comunidad.',
        ],
        quote: {
          text: 'Cuando dependes únicamente de recompensas extrínsecas (como dinero o descuentos), corres el riesgo de anular la pasión intrínseca del usuario mediante el llamado Efecto de Sobrejustificación.',
          author: 'Edward L. Deci',
        },
      },
      {
        heading: '2. El Framework MDA: Mecánicas, Dinámicas y Estéticas',
        paragraphs: [
          'Desarrollado en 2004 por Robin Hunicke, Marc LeBlanc y Robert Zubek, el modelo MDA es la herramienta conceptual más rigurosa para desglosar el diseño de juegos y sistemas gamificados.',
          'La clave del framework reside en comprender la perspectiva invertida entre el creador y el jugador:',
        ],
        highlightBox: {
          title: 'El puente MDA',
          description: 'Diseñador ➜ [Mecánicas] ➜ [Dinámicas] ➜ [Estéticas] ➜ Usuario / Jugador. Mientras el desarrollador codifica reglas y mecánicas, el usuario experimenta emociones estéticas que luego deduce hacia las mecánicas.',
          tag: 'Concepto Clave',
        },
        keyPoints: [
          'Mecánicas (Mechanics): Los componentes básicos y algoritmos del sistema (puntos, dados, niveles, límites de tiempo, turnos).',
          'Dinámicas (Dynamics): El comportamiento en tiempo real que surge cuando el usuario interactúa con las mecánicas (competencia, colaboración, estrategias, economía emergente).',
          'Estéticas (Aesthetics): Las respuestas emocionales evocadas en el usuario (sensación de fantasía, desafío, narrativa, camaradería, descubrimiento).',
        ],
      },
      {
        heading: '3. El Canal de Flow de Mihaly Csíkszentmihályi',
        paragraphs: [
          'El psicólogo Mihaly Csíkszentmihályi definió el "Flow" (Estado de Flujo) como ese momento de absorción total en el que el tiempo parece desvanecerse y la concentración es absoluta.',
          'Para mantener a un usuario en el canal de Flow, el diseñador debe calibrar dos variables clave: la dificultad del desafío frente a la habilidad percibida. Si el reto supera la habilidad, sobreviene la ansiedad; si la habilidad supera al reto, aparece el aburrimiento.',
          'Un sistema gamificado bien diseñado ajusta dinámicamente sus retos conforme el usuario perfecciona sus destrezas, garantizando un progreso sostenible.',
        ],
      },
    ],
    quiz: {
      question: '¿Cuáles son las tres necesidades psicológicas fundamentales según la Teoría de la Autodeterminación (SDT)?',
      options: [
        'Puntos, Insignias y Tablas de clasificación',
        'Autonomía, Competencia y Relación',
        'Diversión, Recompensa y Monetización',
        'Reglas, Castigos y Límites de tiempo',
      ],
      correctAnswer: 1,
      explanation: 'Deci y Ryan demostraron que la Autonomía, la Competencia y la Relación son los tres motores esenciales de la motivación intrínseca.',
    },
    references: [
      'Deci, E. L., & Ryan, R. M. (2000). Self-determination theory and the facilitation of intrinsic motivation.',
      'Hunicke, R., LeBlanc, M., & Zubek, R. (2004). MDA: A formal approach to game design and game research.',
      'Csíkszentmihályi, M. (1990). Flow: The Psychology of Optimal Experience.',
      'Chou, Yu-kai (2015). Actionable Gamification: Beyond Points, Badges, and Leaderboards.',
    ],
  },
  {
    id: 'art-2-elementos',
    slug: 'elementos-relevantes-pbl-narrativa',
    title: 'Elementos Relevantes: La Tríada PBL, Narrativa y Tipos de Jugadores',
    subtitle: 'Desarmando el kit de herramientas lúdicas: cómo estructurar puntos, insignias, tablas y arcos narrativos efectivos.',
    summary: 'Un análisis exhaustivo de los componentes constitutivos de la gamificación: Puntos, Badges y Leaderboards (PBL), barras de progreso, narrativa inmersiva y la taxonomía de jugadores de Marczewski y Bartle.',
    category: 'Mecánicas',
    tags: ['PBL', 'Badges', 'Leaderboards', 'Narrativa', 'Tipología de Jugadores'],
    readTimeMinutes: 6,
    date: '20 Oct 2024',
    author: {
      name: 'Carlos Mendoza',
      role: 'Lead Game Designer & Arquitecto de Experiencias',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-cyan-500/30 via-sky-500/10 to-transparent',
    acidColor: 'cyan',
    iconName: 'Award',
    xpReward: 100,
    takeaways: [
      'La tríada PBL (Points, Badges, Leaderboards) es solo la superficie: sin un propósito intrínseco, degenera en "pointification" vacío.',
      'Las insignias efectivas representan hitos significativos y competencia real, no meras acciones rutinarias.',
      'Los jugadores no son homogéneos: los Exploradores, Triunfadores, Socializadores y Filántropos requieren mecánicas diferenciadas.',
    ],
    sections: [
      {
        heading: '1. Desmitificando la tríada PBL (Points, Badges, Leaderboards)',
        paragraphs: [
          'La tríada PBL es el conjunto de componentes más visible y comúnmente implementado en productos digitales. Sin embargo, su eficacia depende de cómo se articula su significado:',
          '• Puntos (Points): Funcionan como retroalimentación cuantitativa inmediata. Miden el progreso, sirven como moneda virtual o establecen hitos numéricos.',
          '• Insignias (Badges): Son representaciones visuales de logros específicos. Tienen valor social y coleccionable, simbolizando pericia, perseverancia o maestría.',
          '• Tablas de Clasificación (Leaderboards): Ordenan a los usuarios según su desempeño. Aunque fomentan la competitividad, pueden resultar desmotivadoras si los novatos compiten contra veteranos inalcanzables (de ahí la necesidad de ligas relativas o tablas contextuales de amigos).',
        ],
        highlightBox: {
          title: 'Regla de Oro en PBL',
          description: 'Nunca utilices puntos como un soborno. Los puntos deben ser el reflejo visible de un logro que el usuario ya consideraba valioso por sí mismo.',
          tag: 'Buenas Prácticas',
        },
      },
      {
        heading: '2. El poder catalizador de la Narrativa y el Significado Épico',
        paragraphs: [
          'La narrativa proporciona contexto y emoción a acciones que de otro modo serían monótonas. Transforma una tarea administrativa en una "misión", o el ahorro financiero en "la construcción de una fortaleza económica".',
          'En el marco Octalysis de Yu-kai Chou, esto se denomina "Significado Épico y Vocación" (Epic Meaning & Calling): la convicción de que el usuario está participando en algo más grande que él mismo.',
        ],
        quote: {
          text: 'La narrativa es el adhesivo cognitivo que conecta una serie de mecánicas aisladas en un viaje heroico con sentido y trascendencia.',
          author: 'Jane McGonigal',
        },
      },
      {
        heading: '3. Tipologías de Jugadores: Bartle y Marczewski',
        paragraphs: [
          'No todos los usuarios responden a los mismos estímulos. Andrzej Marczewski propuso la matriz de tipos de usuarios en gamificación:',
          '1. Triunfadores (Achievers): Motivados por la maestría y superar retos difíciles.',
          '2. Filántropos (Philanthropists): Buscan ayudar a otros y aportar al bien colectivo sin esperar recompensa.',
          '3. Socializadores (Socialisers): Valoran las interacciones interpersonales y la pertenencia a redes.',
          '4. Espíritus Libres (Free Spirits): Buscan la autonomía, la exploración y la autoexpresión personalizada.',
          '5. Jugadores Tradicionales (Players): Motivados principalmente por recompensas externas y premios.',
        ],
      },
    ],
    quiz: {
      question: '¿Qué riesgo principal presentan las tablas de clasificación globales (Leaderboards) mal diseñadas?',
      options: [
        'Consumen demasiada memoria en el servidor',
        'Desmotivan a los nuevos usuarios al ver puntajes inalcanzables en los primeros puestos',
        'Impiden otorgar puntos al usuario',
        'Hacen que el contenido sea demasiado fácil',
      ],
      correctAnswer: 1,
      explanation: 'Las tablas globales suelen desmotivar a la gran mayoría de la base de usuarios; la solución estándar son ligas dinámicas semanales o tablas de amigos.',
    },
    references: [
      'Werbach, K., & Hunter, D. (2012). For the Win: How Game Thinking Can Revolutionize Your Business.',
      'Marczewski, A. (2015). User Types Hexad framework.',
      'Bartle, R. (1996). Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs.',
    ],
  },
  {
    id: 'art-3-historia',
    slug: 'historia-y-evolucion-de-la-gamificacion',
    title: 'Historia y Evolución: De Nick Pelling en 2002 a la Madurez Digital',
    subtitle: 'Una cronología crítica: cómo el término pasó de una curiosidad técnica a una disciplina formal de diseño conductual.',
    summary: 'Recorrido histórico desde la acuñación original del término por Nick Pelling en 2002, la explosión de 2010 con Foursquare y las conferencias pioneras, la travesía por el desierto del hype, hasta la consolidación científica actual.',
    category: 'Historia',
    tags: ['Historia', 'Nick Pelling', 'Foursquare', 'Evolución', 'Tendencias'],
    readTimeMinutes: 8,
    date: '15 Oct 2024',
    author: {
      name: 'Prof. Marcos Valdés',
      role: 'Historiador de Medios Digitales y Tecnología',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-purple-500/30 via-fuchsia-500/10 to-transparent',
    acidColor: 'purple',
    iconName: 'History',
    xpReward: 110,
    takeaways: [
      'El término "gamification" fue acuñado en 2002 por el programador británico Nick Pelling.',
      'El año 2010 marcó el punto de inflexión global impulsado por aplicaciones móviles como Foursquare y conferencias magistrales.',
      'Tras superar la etapa de desencanto (la saturación de "badges inútiles"), la gamificación maduró integrando psicología del comportamiento y UX riguroso.',
    ],
    sections: [
      {
        heading: '1. 2002: El origen con Nick Pelling',
        paragraphs: [
          'En el año 2002, el programador e inventor británico Nick Pelling concibió la palabra "gamification" mientras diseñaba interfaces de usuario para dispositivos electrónicos comerciales (máquinas expendedoras, cajeros y pantallas). Su visión era aplicar la velocidad y la respuesta intuitiva de los videojuegos a la interacción cotidiana.',
          'Durante varios años el término permaneció en círculos reducidos, mientras la industria tecnológica experimentaba con conceptos afines como "juegos serios" (serious games) y "computación persuasiva" (formulada por B.J. Fogg en Stanford).',
        ],
        highlightBox: {
          title: 'Hito Histórico 2002',
          description: 'Nick Pelling acuña formalmente "Gamification" definiéndola como: "Aplicar la estética y las mecánicas de los juegos a transacciones e interfaces del mundo real".',
          tag: '1er Registro Histórico',
        },
      },
      {
        heading: '2. 2010: La gran explosión del Hype',
        paragraphs: [
          'El año 2010 fue el verdadero terremoto cultural de la gamificación. Varios eventos convergieron:',
          '• El lanzamiento y masificación de Foursquare, permitiendo a millones de personas hacer "check-in" en lugares físicos para convertirse en "Alcaldes" (Mayors) y ganar badges virtuales.',
          '• La recordada charla TED de Jane McGonigal, "Gaming can make a better world", con millones de reproducciones.',
          '• La presentación de Jesse Schell en DICE 2010 vaticinando un futuro donde cada acción diaria otorgaría puntos.',
          '• En 2011 se celebró el primer "Gamification Summit" en San Francisco liderado por Gabe Zichermann.',
        ],
      },
      {
        heading: '3. Del desencanto a la madurez científica (2015 - Actualidad)',
        paragraphs: [
          'Como predijo el ciclo de sobreexpectación de Gartner, entre 2012 y 2014 la gamificación sufrió una fuerte resaca. Cientos de empresas crearon sistemas superficiales que los usuarios rechazaron por sentirse manipulados.',
          'Esto forzó a la industria a madurar: la gamificación dejó de ser vista como "añadir estrellitas doradas a un software mediocre" y se transformó en una disciplina rigurosa de Diseño Centrado en el Humano (Human-Focused Design), respaldada por la neurociencia y la economía conductual.',
          'Hoy en día, con la integración de inteligencia artificial generativa y personalización en tiempo real, la disciplina vive su era de mayor rigor y eficacia.',
        ],
      },
    ],
    quiz: {
      question: '¿Quién acuñó formalmente el término "gamification" en el año 2002?',
      options: ['Jane McGonigal', 'Gabe Zichermann', 'Nick Pelling', 'Yu-kai Chou'],
      correctAnswer: 2,
      explanation: 'El programador e inventor británico Nick Pelling fue quien creó y documentó el término por primera vez en 2002.',
    },
    references: [
      'Pelling, N. (2002). The (Not So) Secret History of Gamification.',
      'Deterding, S. et al. (2011). From game design elements to gamefulness: defining "gamification".',
      'McGonigal, J. (2011). Reality Is Broken: Why Games Make Us Better and How They Can Change the World.',
    ],
  },
  {
    id: 'art-4-caracteristicas',
    slug: 'caracteristicas-clave-reglas-feedback-balance',
    title: 'Características Clave: Reglas Claras, Feedback Inmediato y Balance',
    subtitle: 'Los principios de diseño irrenunciables para garantizar una experiencia justa, ética y adictivamente positiva.',
    summary: 'Guía práctica sobre los 4 pilares estructurales indispensables: claridad normativa, bucles de retroalimentación en tiempo real, voluntariedad y consentimiento ético, y calibración de curvas de dificultad.',
    category: 'Principios',
    tags: ['Reglas', 'Feedback Loop', 'Ética', 'Balance', 'Diseño UX'],
    readTimeMinutes: 5,
    date: '10 Oct 2024',
    author: {
      name: 'Lucía Santoro',
      role: 'Consultora Senior en Ética Digital y Gamificación',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-amber-500/30 via-yellow-500/10 to-transparent',
    acidColor: 'amber',
    iconName: 'Sliders',
    xpReward: 90,
    takeaways: [
      'El feedback debe ser inmediato, comprensible y accionable para cerrar el bucle de aprendizaje cognitivo.',
      'La voluntariedad es innegociable: forzar la gamificación elimina el elemento lúdico y genera cinismo.',
      'El diseño ético evita patrones oscuros (Dark Patterns) y explotación de dopamina destructiva.',
    ],
    sections: [
      {
        heading: '1. Reglas Transparentes y el "Círculo Mágico"',
        paragraphs: [
          'El historiador Johan Huizinga definió el "Círculo Mágico" como el espacio delimitado (físico o conceptual) donde operan voluntariamente reglas distintas a las del mundo ordinario.',
          'En un sistema gamificado, la transparencia de las reglas es el pacto sagrado entre el sistema y el usuario. Si las reglas cambian arbitrariamente o se perciben opacas, se destruye la confianza y sobreviene la frustración.',
        ],
      },
      {
        heading: '2. Feedback Inmediato: El combustible del aprendizaje',
        paragraphs: [
          'En la vida real, las consecuencias de nuestras decisiones tardan meses o años en manifestarse (por ejemplo, alimentarse bien o aprender un idioma). Los juegos resuelven esta desconexión temporal brindando feedback instantáneo.',
          'Un buen sistema gamificado proporciona retroalimentación micro (animaciones de éxito, sonidos gratificantes, barras dinámicas) y retroalimentación macro (resúmenes semanales, insignias de maestría, desbloqueo de capacidades).',
        ],
        highlightBox: {
          title: 'El Bucle de Retroalimentación Ideal',
          description: 'Acción del Usuario ➜ Detección del Sistema ➜ Respuesta Sensorial Inmediata (<100ms) ➜ Actualización de Progreso ➜ Nuevo Desafío Disponible.',
          tag: 'Arquitectura UX',
        },
      },
      {
        heading: '3. Voluntariedad y Ética Lúdica',
        paragraphs: [
          'Bernard Suits señaló que "jugar es el intento voluntario de superar obstáculos innecesarios". La clave absoluta es la palabra voluntario.',
          'Si una empresa impone un sistema gamificado obligatorio bajo amenaza de castigo laboral, deja de ser un juego y se convierte en un mecanismo de vigilancia. El diseño ético exige que el usuario pueda optar por no participar sin sufrir perjuicios.',
        ],
      },
    ],
    quiz: {
      question: '¿Por qué es fundamental el principio de voluntariedad en el diseño lúdico?',
      options: [
        'Porque permite ahorrar costos de servidores',
        'Porque si se obliga a participar, se destruye la motivación intrínseca y se percibe como imposición o vigilancia',
        'Porque los juegos no tienen reglas',
        'Porque solo los niños juegan voluntariamente',
      ],
      correctAnswer: 1,
      explanation: 'La voluntariedad es la esencia del juego; obligar a las personas anula la experiencia lúdica y genera rechazo.',
    },
    references: [
      'Huizinga, J. (1938). Homo Ludens: A Study of the Play-Element in Culture.',
      'Suits, B. (1978). The Grasshopper: Games, Life and Utopia.',
      'Kapp, K. M. (2012). The Gamification of Learning and Instruction.',
    ],
  },
  {
    id: 'art-5-usos',
    slug: 'usos-y-aplicaciones-educacion-rrhh-salud-marketing',
    title: 'Usos y Aplicaciones: Educación, RRHH, Salud y Marketing',
    subtitle: 'El impacto multisectorial: cómo industrias tradicionales resuelven problemas críticos mediante el juego.',
    summary: 'Panorama exhaustivo de casos de uso prácticos en el mundo real: revolucionar el aula en EdTech, acelerar el onboarding corporativo, sostener hábitos saludables en medicina preventiva y construir lealtad de marca.',
    category: 'Aplicaciones',
    tags: ['EdTech', 'Recursos Humanos', 'Salud', 'Marketing', 'Casos de Éxito'],
    readTimeMinutes: 7,
    date: '05 Oct 2024',
    author: {
      name: 'Martín Barrenechea',
      role: 'Estratega de Producto y Transformación Digital',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-emerald-500/30 via-teal-500/10 to-transparent',
    acidColor: 'emerald',
    iconName: 'Briefcase',
    xpReward: 110,
    takeaways: [
      'En educación, la gamificación reduce el miedo al error convirtiendo el fallo en una oportunidad iterativa.',
      'En RRHH, el onboarding gamificado reduce el tiempo de adaptación en un 40% y eleva la retención del talento.',
      'En salud, la combinación de micro-metas y visualización de progreso sostiene la adherencia a tratamientos y hábitos saludables.',
    ],
    sections: [
      {
        heading: '1. Educación y EdTech: El aula redefinida',
        paragraphs: [
          'En el modelo educativo tradicional, un examen evalúa al alumno de forma punitiva. En un entorno gamificado, el error no es un fracaso definitivo, sino un "game over" temporal que invita a intentarlo de nuevo.',
          'Plataformas como Kahoot, Quizizz y Classcraft convierten la asimilación de conceptos en dinámicas colaborativas donde los estudiantes adquieren "puntos de experiencia" (XP) a medida que demuestran maestría conceptual.',
        ],
      },
      {
        heading: '2. Recursos Humanos: De la atracción al Onboarding',
        paragraphs: [
          'Grandes consultoras como Deloitte y PwC implementaron academias de liderazgo y procesos de inducción gamificados. Los resultados son contundentes:',
          '• Incremento del 47% en la tasa de finalización de capacitaciones técnicas.',
          '• Aceleración del tiempo en el que un nuevo empleado se siente productivo e integrado en la cultura organizacional.',
        ],
        highlightBox: {
          title: 'Caso PwC: Multipoly',
          description: 'PwC Hungría creó "Multipoly", un simulador donde los candidatos vivían un día en la firma antes de ser contratados. El interés por las vacantes aumentó un 190% y la preparación de los entrevistados mejoró drásticamente.',
          tag: 'Impacto Real',
        },
      },
      {
        heading: '3. Salud, Bienestar y Adherencia a Hábitos',
        paragraphs: [
          'En el ámbito sanitario, la falta de adherencia al ejercicio físico y a los tratamientos médicos es uno de los mayores costes para la salud pública.',
          'Aplicaciones como Zombies, Run! convirtieron el acto de correr en una misión de supervivencia apocalíptica narrada en audio, logrando que millones de personas sedentarias se activaran físicamente.',
          'Asimismo, apps de salud mental como SuperBetter, diseñada por Jane McGonigal tras sufrir una conmoción cerebral, aplican mecánicas de aliados y misiones para superar la depresión y el dolor crónico.',
        ],
      },
    ],
    quiz: {
      question: '¿Cuál es una de las mayores ventajas cognitivas de la gamificación en el aprendizaje?',
      options: [
        'Obliga a los estudiantes a memorizar sin entender',
        'Elimina el estigma del error y fomenta la experimentación iterativa segura',
        'Reemplaza totalmente a los profesores',
        'Garantiza que nadie necesite estudiar',
      ],
      correctAnswer: 1,
      explanation: 'Al despenalizar el error y convertirlo en retroalimentación inmediata, se reduce la ansiedad y se potencia la curiosidad intrínseca.',
    },
    references: [
      'Kapp, K. M., Blair, L., & Mesch, R. (2014). The Gamification of Learning and Instruction Fieldbook.',
      'McGonigal, J. (2015). SuperBetter: A Revolutionary Approach to Getting Stronger, Happier, Braver and More Resilient.',
      'Deloitte Review (2013). The Engagement Economy: How Gamification is Reshaping Businesses.',
    ],
  },
  {
    id: 'art-6-ejemplos',
    slug: 'ejemplos-reales-duolingo-nike-run-club-forest',
    title: 'Ejemplos Reales: Análisis a Fondo de Duolingo, Nike Run Club y Forest',
    subtitle: 'Disección quirúrgica de tres productos líderes y las mecánicas maestras detrás de su retención colosal.',
    summary: 'Un estudio de caso técnico y comparativo analizando la arquitectura lúdica de Duolingo (rachas y ligas), Nike Run Club (comunidad y feedback háptico/auditivo) y Forest (economía virtual conectada al impacto ecológico real).',
    category: 'Casos Reales',
    tags: ['Duolingo', 'Nike Run Club', 'Forest', 'Casos de Estudio', 'Retención'],
    readTimeMinutes: 9,
    date: '01 Oct 2024',
    author: {
      name: 'Dra. Elena Alarcón & Carlos Mendoza',
      role: 'Equipo Editorial y Análisis de Producto',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=1200&auto=format&fit=crop&q=80',
    coverAccent: 'from-rose-500/30 via-pink-500/10 to-transparent',
    acidColor: 'rose',
    iconName: 'Compass',
    xpReward: 130,
    featured: true,
    takeaways: [
      'Duolingo domina la aversión a la pérdida mediante la racha (Streak), combinada con ligas semanales dinámicas de 30 personas.',
      'Nike Run Club apoya la autoeficacia mediante reconocimientos de marcas personales y celebraciones comunitarias.',
      'Forest fusiona el temporizador Pomodoro con un impacto tangible: plantar árboles verdaderos en África mediante la acumulación de monedas virtuales.',
    ],
    sections: [
      {
        heading: '1. Duolingo: El rey indiscutible de las rachas y la aversión a la pérdida',
        paragraphs: [
          'Duolingo cuenta con más de 500 millones de usuarios registrados y una retención diaria envidiada por la industria del software. Su arquitectura lúdica descansa en varios pilares sincronizados:',
          '• El Fuego de la Racha (Streak): El motor psicológico más potente. Los usuarios prefieren hacer una lección rápida antes de medianoche que perder una racha de 300 días (activación directa del Core Drive 8 de Octalysis: Pérdida y Aversión).',
          '• Ligas Dinámicas (Leaderboards Contextuales): En lugar de una tabla mundial inalcanzable, Duolingo agrupa a 30 usuarios de nivel similar cada lunes. Los 7 primeros ascienden de división (Bronce, Plata, Oro, Obsidiana, Diamante), mientras los 5 últimos descienden.',
          '• Cofres y Recompensas Variables: La dopamina se refuerza mediante recompensas no predecibles (doble XP durante 15 minutos, cofres sorpresa).',
        ],
        highlightBox: {
          title: 'Mecánica Clave: Duolingo Streak Freeze',
          description: 'Al permitir que el usuario compre "bloqueadores de racha" con gemas virtuales, la aplicación mitiga la desmotivación catastrófica en caso de emergencia, preservando el hábito a largo plazo.',
          tag: 'Diseño Antifragil',
        },
      },
      {
        heading: '2. Nike Run Club: Elevando el atletismo a través de la comunidad y el feedback',
        paragraphs: [
          'Correr en soledad suele ser una actividad solitaria y físicamente extenuante. Nike Run Club (NRC) transformó este paradigma:',
          '• Retos Colectivos Globales: "Corre 50 km este mes junto a la comunidad global".',
          '• Badges de Hitos Personales: Insignias elegantes por la carrera más rápida de 5k, mayor distancia mensual o racha de fines de semana consecutivos.',
          '• Feedback Auditivo en Vivo: Voces de entrenadores de élite y atletas olímpicos felicitando al corredor al cruzar marcas kilométricas, activando la necesidad de competencia y reconocimiento.',
        ],
      },
      {
        heading: '3. Forest: De la concentración virtual a la reforestación real',
        paragraphs: [
          'Forest es una aplicación de productividad basada en la técnica Pomodoro que aborda la adicción al smartphone con una brillante metáfora visual:',
          '• Cuando el usuario inicia una sesión de concentración (ej. 25 minutos), se planta una semilla virtual en su pantalla. Si sale de la app para revisar redes sociales, el árbol muere de inmediato.',
          '• Cada sesión exitosa genera un árbol adulto en el bosque personal del usuario y otorga monedas virtuales.',
          '• Lo extraordinario: Forest se asoció con la ONG "Trees for the Future". Los usuarios pueden canjear sus monedas virtuales para que la organización plante árboles reales en países como Camerún, Kenia y Senegal (superando más de 1.5 millones de árboles reales plantados).',
        ],
        quote: {
          text: 'Forest conecta la gratificación visual instantánea con el Propósito Trascendente (Epic Meaning): tu concentración digital reforesta el planeta real.',
          author: 'Análisis de Caso Gamifica',
        },
      },
    ],
    quiz: {
      question: '¿Qué innovadora mecánica utiliza la app "Forest" para conectar la gamificación virtual con el mundo físico?',
      options: [
        'Envía descargas eléctricas al teléfono si te distraes',
        'Permite canjear monedas virtuales acumuladas por árboles reales plantados en el planeta',
        'Te cobra dinero real si no terminas el pomodoro',
        'Bloquea permanentemente el acceso a internet',
      ],
      correctAnswer: 1,
      explanation: 'Forest colabora con Trees for the Future para plantar árboles reales cuando los usuarios canjean sus monedas ganadas concentrándose.',
    },
    references: [
      'Ahn, L. von (2013). Duolingo: Learn a Language for Free while Helping to Translate the Web.',
      'Nike Digital Sport Strategy (2020). Connected Fitness and Community Ecosystems.',
      'Seekrtech (2023). Forest App Sustainability & Impact Report.',
    ],
  },
];

export const CATEGORIES = [
  'Todos',
  'Teoría',
  'Mecánicas',
  'Historia',
  'Principios',
  'Aplicaciones',
  'Casos Reales',
] as const;

export const GLOSSARY_TERMS = [
  { term: 'PBL', definition: 'Tríada clásica de Puntos (Points), Insignias (Badges) y Tablas de clasificación (Leaderboards).' },
  { term: 'Modelo MDA', definition: 'Framework formal que desglosa los sistemas en Mecánicas, Dinámicas y Estéticas.' },
  { term: 'Flow (Flujo)', definition: 'Estado mental óptimo de concentración donde el desafío equilibra la habilidad del sujeto.' },
  { term: 'Octalysis', definition: 'Marco de 8 impulsores centrales de motivación humana creado por Yu-kai Chou.' },
  { term: 'Círculo Mágico', definition: 'Espacio conceptual donde rigen voluntariamente las reglas y dinámicas de un juego.' },
  { term: 'Nick Pelling', definition: 'Programador británico que acuñó el término "Gamification" en 2002.' },
];
