export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

const clinicName = "Dr. Jaime Pinzón Odontología Especializada";

export const faqGroups: FaqGroup[] = [
  {
    id: "citas",
    title: "Citas y primera consulta",
    items: [
      {
        question: "¿Cómo puedo solicitar una cita?",
        answer:
          "Puedes solicitar tu cita comunicándote con nuestro equipo de atención a través de nuestros canales de contacto. Te orientaremos para encontrar el día y horario más conveniente y te brindaremos la información necesaria antes de tu consulta.",
      },
      {
        question: "¿Qué debo llevar a mi primera cita?",
        answer:
          "Si no cuentas con estudios previos, no te preocupes. Durante el proceso de atención te indicaremos cuáles son necesarios y te entregaremos la orden correspondiente para que puedas realizarlos en el laboratorio o centro de diagnóstico indicado. De esta manera, podremos contar con la información necesaria para realizar una valoración completa y establecer el diagnóstico y plan de tratamiento más adecuado para ti.",
      },
      {
        question: "¿Qué sucede durante la primera consulta?",
        answer:
          "En la primera consulta realizamos una valoración integral de tu salud oral, escuchamos tus necesidades y antecedentes y evaluamos las condiciones particulares de tu caso. A partir de esta valoración podremos recomendarte el tratamiento más adecuado.",
      },
      {
        question: "¿Es necesario realizar una valoración antes de iniciar un tratamiento?",
        answer:
          "Sí. Cada paciente tiene necesidades diferentes, por lo que consideramos fundamental realizar una valoración profesional antes de establecer un diagnóstico, plan de tratamiento y presupuesto.",
      },
      {
        question: "¿Atienden pacientes adultos?",
        answer:
          "Sí. La ortodoncia y los tratamientos odontológicos especializados no son exclusivos para niños o adolescentes. Los adultos también pueden beneficiarse de diferentes alternativas de tratamiento, siempre después de una valoración profesional.",
      },
    ],
  },
  {
    id: "ortodoncia",
    title: "Ortodoncia",
    items: [
      {
        question: "¿A qué edad se recomienda realizar una valoración de ortodoncia?",
        answer:
          "No existe una única edad para iniciar una valoración. En los niños y adolescentes, una evaluación oportuna permite identificar alteraciones en el desarrollo de los dientes y los maxilares. En adultos también es posible realizar tratamientos de ortodoncia, dependiendo de sus condiciones de salud oral.",
      },
      {
        question: "¿Cómo sé si necesito ortodoncia?",
        answer:
          "Algunas señales pueden ser dientes apiñados, espacios entre los dientes, alteraciones en la mordida, dificultad para realizar una adecuada higiene oral o inconformidad con la posición de los dientes. Sin embargo, únicamente una valoración especializada puede determinar si necesitas tratamiento.",
      },
      {
        question: "¿Cuánto dura un tratamiento de ortodoncia?",
        answer:
          "La duración depende de factores como la complejidad del caso, la edad, las condiciones de salud oral y la respuesta de cada paciente al tratamiento. Por eso, el tiempo se establece de manera individual después de realizar la valoración y el diagnóstico.",
      },
      {
        question: "¿Qué tipos de brackets manejan?",
        answer:
          "Contamos con diferentes alternativas de ortodoncia. Durante la valoración podremos explicarte las opciones disponibles y recomendarte la alternativa más adecuada de acuerdo con tus necesidades, características clínicas y expectativas.",
      },
      {
        question: "¿Qué son los brackets cerámicos?",
        answer:
          "Son brackets fabricados con materiales de apariencia más discreta que permiten realizar tratamientos de ortodoncia manteniendo una estética más natural. Su indicación dependerá de las características de cada caso.",
      },
      {
        question: "¿La ortodoncia es dolorosa?",
        answer:
          "Es posible experimentar cierta sensibilidad, presión o incomodidad, especialmente después de algunas citas de control. Estas molestias suelen ser temporales y forman parte del proceso de adaptación al tratamiento.",
      },
    ],
  },
  {
    id: "periodoncia",
    title: "Periodoncia",
    items: [
      {
        question: "¿Qué es la Periodoncia?",
        answer:
          "La Periodoncia es la especialidad odontológica encargada de la prevención, diagnóstico y tratamiento de las enfermedades que afectan las encías y los tejidos que sostienen los dientes.",
      },
      {
        question: "¿Cómo puedo saber si tengo problemas en las encías?",
        answer:
          "Algunos signos de alerta son sangrado durante el cepillado, inflamación, enrojecimiento, mal aliento persistente, sensibilidad o movilidad de los dientes. Si presentas alguno de estos síntomas, es recomendable realizar una valoración periodontal.",
      },
      {
        question: "¿Por qué me sangran las encías?",
        answer:
          "El sangrado puede estar relacionado con inflamación o enfermedad de las encías, aunque existen diferentes causas. No debe considerarse normal o ignorarse cuando ocurre de manera frecuente. Una valoración profesional permite identificar la causa y determinar el tratamiento adecuado.",
      },
      {
        question: "¿Una limpieza dental es lo mismo que un tratamiento periodontal?",
        answer:
          "No necesariamente. La limpieza dental hace parte del cuidado preventivo de la salud oral, mientras que el tratamiento periodontal está dirigido a tratar enfermedades específicas de las encías y los tejidos que soportan los dientes. El procedimiento indicado dependerá de la condición de cada paciente.",
      },
      {
        question: "¿La enfermedad periodontal puede causar pérdida de dientes?",
        answer:
          "Cuando las enfermedades periodontales no son diagnosticadas y tratadas oportunamente, pueden afectar los tejidos y el hueso que sostienen los dientes y, en casos avanzados, contribuir a su pérdida. Por eso es importante realizar controles periódicos y atender los signos de alerta.",
      },
    ],
  },
  {
    id: "atencion",
    title: "Atención y tratamientos",
    items: [
      {
        question: "¿Puedo conocer el valor del tratamiento antes de la valoración?",
        answer:
          "El costo depende del diagnóstico, las necesidades particulares de cada paciente y el tratamiento indicado. Por esta razón, primero realizamos una valoración y posteriormente presentamos un plan de tratamiento y su respectivo presupuesto.",
      },
      {
        question: "¿Puedo recibir un plan de tratamiento personalizado?",
        answer:
          "Sí. Nuestro objetivo es que cada paciente reciba una atención acorde con sus necesidades. Después de la valoración y el diagnóstico, te explicaremos las alternativas disponibles y el plan recomendado para tu caso.",
      },
      {
        question: "¿Qué pasa si tengo una urgencia odontológica?",
        answer:
          "Si presentas dolor intenso, inflamación, sangrado, traumatismo o alguna situación que requiera atención inmediata, comunícate con nuestro equipo para orientarte sobre la disponibilidad y el tipo de atención que necesitas.",
      },
      {
        question: `¿Por qué elegir ${clinicName}?`,
        answer: `En ${clinicName} creemos que cada sonrisa tiene necesidades diferentes. Contamos con profesionales con experiencia y formación especializada, comprometidos con ofrecer una atención cercana, responsable y personalizada, acompañando a cada paciente durante las diferentes etapas de su tratamiento.`,
      },
      {
        question: "¿Cómo puedo saber cuál es el tratamiento adecuado para mí?",
        answer:
          "El primer paso es realizar una valoración. A partir de ella podremos conocer tu estado de salud oral, identificar tus necesidades y explicarte las diferentes alternativas de tratamiento. Nuestro propósito es que tomes decisiones informadas y con la tranquilidad de contar con acompañamiento profesional.",
      },
    ],
  },
  {
    id: "rehabilitacion",
    title: "Prótesis e implantes",
    items: [
      {
        question: "¿Realizan prótesis dentales?",
        answer: `Sí. En ${clinicName} realizamos diferentes tipos de prótesis dentales, diseñadas de acuerdo con las necesidades, condiciones clínicas y expectativas de cada paciente. Nuestro objetivo es recuperar tanto la función como la estética de la sonrisa.`,
      },
      {
        question: "¿Realizan prótesis dentales removibles?",
        answer:
          "Sí. Contamos con opciones de prótesis removibles para pacientes que requieren reemplazar uno o varios dientes. Durante la valoración determinamos cuál es la alternativa más adecuada para cada caso.",
      },
      {
        question: "¿Realizan prótesis dentales totales?",
        answer:
          "Sí. Realizamos prótesis totales para pacientes que han perdido todos los dientes de una o ambas arcadas. Buscamos recuperar la función masticatoria, la comodidad y la estética de la sonrisa.",
      },
      {
        question: "¿Realizan coronas dentales?",
        answer:
          "Sí. Realizamos coronas dentales como alternativa para restaurar dientes que presentan pérdida importante de estructura, fracturas, desgaste u otras condiciones que requieren una rehabilitación. La indicación y el tipo de corona dependerán de la valoración de cada paciente.",
      },
      {
        question: "¿Realizan implantes dentales?",
        answer:
          "Sí. Realizamos tratamientos con implantes dentales para reemplazar dientes ausentes. El implante permite ofrecer una solución fija y funcional, siempre que las condiciones del paciente sean adecuadas para este tipo de tratamiento.",
      },
      {
        question: "¿Qué es una rehabilitación sobre implantes?",
        answer:
          "Es un tratamiento que permite recuperar dientes ausentes mediante una restauración que se soporta sobre implantes dentales. Dependiendo de cada caso, puede utilizarse para reemplazar uno, varios o incluso todos los dientes de una arcada.",
      },
      {
        question: "¿Puedo realizarme una prótesis sobre implantes?",
        answer:
          "Sí. Ofrecemos rehabilitación sobre implantes, incluyendo diferentes alternativas de prótesis según la cantidad de dientes que necesites reemplazar y tus condiciones clínicas. Primero realizamos una valoración para determinar la opción más adecuada.",
      },
      {
        question:
          "¿Cuál es la diferencia entre una prótesis removible, una prótesis total y una prótesis sobre implantes?",
        answer:
          "La principal diferencia está en la forma en que la prótesis se sostiene. Las prótesis removibles pueden reemplazar uno o varios dientes y pueden retirarse para su limpieza. Las prótesis totales están indicadas cuando se han perdido todos los dientes de una arcada. Las prótesis sobre implantes utilizan implantes dentales como soporte, proporcionando una solución más estable y funcional en los casos en que estén indicadas.",
      },
      {
        question: "¿Cómo sé qué tipo de prótesis necesito?",
        answer:
          "Cada caso es diferente. Durante la valoración evaluamos tu salud oral, los dientes presentes, las condiciones de los tejidos y tus necesidades funcionales y estéticas. Con esta información podremos explicarte las alternativas disponibles y recomendarte la más adecuada.",
      },
      {
        question: "¿Es posible reemplazar un solo diente perdido?",
        answer:
          "Sí. Dependiendo de las condiciones del paciente, existen diferentes alternativas para reemplazar un diente ausente, entre ellas un implante dental con su respectiva rehabilitación. La opción indicada se determina después de una valoración profesional.",
      },
      {
        question: "¿Puedo mejorar la estética de mis dientes con rehabilitación oral?",
        answer:
          "Sí. Algunos tratamientos de rehabilitación oral permiten recuperar dientes deteriorados y mejorar aspectos como forma, tamaño, función y apariencia. El tratamiento se diseña de manera personalizada según las necesidades de cada paciente.",
      },
      {
        question: "¿Los implantes dentales son para todas las personas?",
        answer:
          "No necesariamente. Para determinar si un paciente es candidato a implantes se deben evaluar diferentes factores relacionados con su salud oral y las condiciones de los tejidos que recibirán el tratamiento. Por eso es indispensable realizar una valoración previa.",
      },
    ],
  },
];

export const faqs: FaqItem[] = faqGroups.flatMap((group) => group.items);

export const homeFaqs = faqs.slice(0, 5);
