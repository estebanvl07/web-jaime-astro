export type ServiceDetail = {
  slug: string;
  title: string;
  category: string;
  categoryIntro: string;
  whatIs: string;
  whatFor: string;
  features: string[];
  idealFor: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "alineadores-dentales",
    title: "Alineadores dentales",
    category: "Ortodoncia",
    categoryIntro:
      "La ortodoncia no se trata únicamente de tener los dientes derechos. También busca mejorar la forma en que los dientes superiores e inferiores encajan, facilitar la higiene oral y lograr una sonrisa equilibrada.",
    whatIs:
      "Los alineadores dentales son dispositivos transparentes y removibles fabricados de manera personalizada para cada paciente. Se utilizan en una secuencia planificada para realizar movimientos progresivos de los dientes hasta alcanzar la posición deseada. Son una alternativa estética a los brackets tradicionales, especialmente atractiva para pacientes que desean realizar un tratamiento de ortodoncia de una manera más discreta.",
    whatFor:
      "Pueden utilizarse para corregir diferentes problemas de posición dental, como dientes apiñados, espacios entre los dientes y determinadas alteraciones de la mordida. Antes de iniciar el tratamiento se realiza una valoración para determinar si los alineadores son adecuados para tu caso y establecer los objetivos del tratamiento.",
    features: [
      "Son transparentes y discretos.",
      "Son removibles.",
      "Se fabrican de manera personalizada.",
      "Permiten retirarlos para comer y realizar la higiene oral.",
      "Se utilizan diferentes alineadores durante el tratamiento.",
      "Requieren controles periódicos para evaluar la evolución.",
      "El resultado depende, entre otros factores, del uso adecuado de los alineadores.",
      "Su indicación depende de las condiciones y necesidades de cada paciente.",
    ],
    idealFor:
      "Quieres mejorar la posición de tus dientes y buscas una alternativa de ortodoncia más discreta.",
  },
  {
    slug: "ortodoncia-de-autoligado",
    title: "Ortodoncia de autoligado",
    category: "Ortodoncia",
    categoryIntro:
      "La ortodoncia no se trata únicamente de tener los dientes derechos. También busca mejorar la forma en que los dientes superiores e inferiores encajan, facilitar la higiene oral y lograr una sonrisa equilibrada.",
    whatIs:
      "La ortodoncia de autoligado es un sistema de ortodoncia fija que utiliza brackets con un mecanismo propio para sujetar el arco dental, sin utilizar las tradicionales ligaduras de goma. Al igual que otros sistemas de ortodoncia, trabaja mediante fuerzas controladas que permiten realizar movimientos progresivos de los dientes.",
    whatFor:
      "Permite corregir problemas relacionados con la posición de los dientes, como apiñamiento, espacios y diferentes alteraciones de la mordida. Es una alternativa para pacientes que necesitan un tratamiento fijo y que buscan un sistema diferente a la ortodoncia convencional.",
    features: [
      "Es un tratamiento de ortodoncia fija.",
      "Utiliza brackets con un mecanismo de autoligado.",
      "No requiere las tradicionales ligaduras de goma.",
      "Permite realizar movimientos dentales controlados.",
      "Requiere controles periódicos.",
      "Puede utilizarse para diferentes tipos de problemas de alineación dental.",
      "El tiempo de tratamiento depende de la complejidad de cada caso.",
      "Requiere compromiso del paciente con la higiene oral y las citas de control.",
    ],
    idealFor:
      "Necesitas corregir la posición de tus dientes y prefieres un sistema de ortodoncia fija con tecnología de autoligado.",
  },
  {
    slug: "ortodoncia-convencional",
    title: "Ortodoncia convencional",
    category: "Ortodoncia",
    categoryIntro:
      "La ortodoncia no se trata únicamente de tener los dientes derechos. También busca mejorar la forma en que los dientes superiores e inferiores encajan, facilitar la higiene oral y lograr una sonrisa equilibrada.",
    whatIs:
      "Es el sistema de ortodoncia tradicional que utiliza brackets, arcos y ligaduras para mover progresivamente los dientes hacia posiciones más adecuadas. Es uno de los tratamientos más utilizados y permite abordar una amplia variedad de problemas de alineación dental y mordida.",
    whatFor:
      "Puede utilizarse para corregir dientes torcidos, apiñamiento, espacios entre los dientes y diferentes alteraciones de la mordida. Además de mejorar la apariencia de la sonrisa, la correcta alineación de los dientes puede facilitar la higiene oral y contribuir a una mejor función.",
    features: [
      "Es un tratamiento fijo.",
      "Utiliza brackets y arcos de ortodoncia.",
      "Permite realizar movimientos dentales progresivos y controlados.",
      "Puede utilizarse en diferentes tipos de maloclusiones.",
      "Requiere controles periódicos.",
      "La duración depende de la complejidad de cada caso.",
      "El resultado requiere compromiso con las citas y las indicaciones del tratamiento.",
    ],
    idealFor:
      "Buscas una opción de ortodoncia fija y necesitas corregir la posición de tus dientes o tu mordida.",
  },
  {
    slug: "ortopedia-maxilar",
    title: "Ortopedia maxilar",
    category: "Ortodoncia",
    categoryIntro:
      "La ortodoncia no se trata únicamente de tener los dientes derechos. También busca mejorar la forma en que los dientes superiores e inferiores encajan, facilitar la higiene oral y lograr una sonrisa equilibrada.",
    whatIs:
      "La ortopedia maxilar se enfoca en el crecimiento y desarrollo de los maxilares y de las estructuras que forman la cara. Tiene especial importancia durante la infancia y adolescencia, cuando todavía existe crecimiento. A través de diferentes aparatos y estrategias de tratamiento, se busca guiar el desarrollo de las estructuras maxilares y mejorar determinadas alteraciones de la mordida.",
    whatFor:
      "Puede ayudar a abordar problemas relacionados con el crecimiento de los maxilares, determinadas alteraciones de la mordida y falta de espacio para los dientes. Una evaluación temprana permite identificar algunas alteraciones durante el crecimiento y determinar si existe la oportunidad de intervenir oportunamente.",
    features: [
      "Está especialmente indicada en pacientes que se encuentran en crecimiento.",
      "Busca guiar el desarrollo de los maxilares.",
      "Puede utilizar diferentes tipos de aparatos.",
      "Puede contribuir a mejorar determinadas alteraciones de la mordida.",
      "Requiere seguimiento periódico.",
      "El tratamiento se adapta a la edad y desarrollo de cada paciente.",
      "La valoración temprana puede ser importante para determinar la mejor alternativa de tratamiento.",
    ],
    idealFor:
      "Eres padre o madre y notas que tu hijo tiene problemas de mordida, dientes que no están saliendo correctamente o una posición anormal de los maxilares.",
  },
  {
    slug: "raspaje-y-alisado-radicular",
    title: "Raspaje y alisado radicular",
    category: "Periodoncia",
    categoryIntro:
      "La periodoncia se encarga de la prevención, diagnóstico y tratamiento de las enfermedades que afectan las encías y los tejidos que sostienen los dientes. Cuidar las encías es fundamental para conservar los dientes y mantener una boca saludable.",
    whatIs:
      "Es un procedimiento de limpieza profunda que permite eliminar el sarro, la placa bacteriana y otros depósitos que se encuentran adheridos a las superficies de los dientes, especialmente debajo de la línea de la encía. A diferencia de una limpieza dental convencional, este procedimiento está dirigido a zonas más profundas que no pueden limpiarse adecuadamente con un cepillado habitual.",
    whatFor:
      "Ayuda a controlar la inflamación y la infección de las encías y a eliminar los depósitos bacterianos que pueden afectar los tejidos que sostienen los dientes. Puede formar parte del tratamiento de pacientes con enfermedad periodontal.",
    features: [
      "Es un procedimiento de limpieza profunda.",
      "Permite trabajar debajo de la línea de la encía.",
      "Ayuda a eliminar acumulaciones de sarro y bacterias.",
      "Puede contribuir a disminuir inflamación y sangrado.",
      "Puede requerir varias sesiones dependiendo de la condición periodontal.",
      "Requiere una valoración previa.",
      "Debe acompañarse de una adecuada higiene oral y controles periódicos.",
    ],
    idealFor:
      "Tus encías sangran, tienes mucho sarro, inflamación o te han diagnosticado enfermedad periodontal.",
  },
  {
    slug: "gingivoplastia",
    title: "Gingivoplastia",
    category: "Periodoncia",
    categoryIntro:
      "La periodoncia se encarga de la prevención, diagnóstico y tratamiento de las enfermedades que afectan las encías y los tejidos que sostienen los dientes. Cuidar las encías es fundamental para conservar los dientes y mantener una boca saludable.",
    whatIs:
      "La gingivoplastia es un procedimiento que permite modificar y remodelar el contorno de las encías para conseguir una forma más equilibrada y armónica. La forma de las encías tiene un papel importante en la apariencia de la sonrisa, por lo que pequeños cambios pueden ayudar a mejorar la proporción entre dientes y encías.",
    whatFor:
      "Puede utilizarse para mejorar irregularidades en el contorno de las encías y determinados aspectos estéticos de la sonrisa.",
    features: [
      "Permite modificar el contorno de las encías.",
      "Se realiza de manera personalizada.",
      "Busca mejorar la armonía entre dientes y encías.",
      "Requiere una valoración periodontal previa.",
      "La cantidad de tejido que puede modificarse depende de cada caso.",
      "El procedimiento y la recuperación se planifican de acuerdo con las necesidades del paciente.",
    ],
    idealFor:
      "Sientes que la forma de tus encías hace que tu sonrisa se vea irregular o poco proporcionada.",
  },
  {
    slug: "alargamiento-de-corona-clinica",
    title: "Alargamiento de corona clínica",
    category: "Periodoncia",
    categoryIntro:
      "La periodoncia se encarga de la prevención, diagnóstico y tratamiento de las enfermedades que afectan las encías y los tejidos que sostienen los dientes. Cuidar las encías es fundamental para conservar los dientes y mantener una boca saludable.",
    whatIs:
      "Es un procedimiento periodontal que permite aumentar la cantidad de estructura dental visible mediante la modificación de la encía y, cuando está indicado, del tejido óseo que rodea al diente. Puede realizarse por razones estéticas o para facilitar determinados tratamientos restauradores.",
    whatFor:
      "En algunos pacientes puede ayudar a mejorar una sonrisa donde existe una apariencia de exceso de encía. También puede ser necesario cuando un diente presenta poca estructura visible para realizar adecuadamente una restauración.",
    features: [
      "Es un procedimiento realizado sobre los tejidos que rodean el diente.",
      "Puede tener una finalidad estética o restauradora.",
      "Permite aumentar la cantidad de diente visible.",
      "Se planifica de acuerdo con la anatomía de cada paciente.",
      "Requiere valoración periodontal.",
      "El proceso de recuperación depende del procedimiento realizado.",
      "Debe seguirse cuidadosamente el protocolo de cuidados indicado después del procedimiento.",
    ],
    idealFor:
      "Sientes que tus dientes se ven muy pequeños porque tienes una cantidad importante de encía visible o necesitas recuperar estructura dental para realizar una restauración.",
  },
  {
    slug: "implantes-dentales",
    title: "Implantes dentales",
    category: "Periodoncia",
    categoryIntro:
      "La periodoncia se encarga de la prevención, diagnóstico y tratamiento de las enfermedades que afectan las encías y los tejidos que sostienen los dientes. Cuidar las encías es fundamental para conservar los dientes y mantener una boca saludable.",
    whatIs:
      "Los implantes dentales son estructuras que se colocan en el hueso maxilar o mandibular para reemplazar la raíz de un diente perdido. Sobre ellos posteriormente puede colocarse una restauración, como una corona. Son una de las alternativas disponibles para reemplazar dientes ausentes y recuperar la función y apariencia de la sonrisa.",
    whatFor:
      "Permiten reemplazar uno o varios dientes perdidos y recuperar funciones como la masticación y la estética. El tratamiento se planifica individualmente, teniendo en cuenta la cantidad y calidad del hueso, la salud de las encías y las condiciones generales de la boca.",
    features: [
      "Permiten reemplazar la raíz de un diente perdido.",
      "Pueden utilizarse para reemplazar uno o varios dientes.",
      "Pueden servir como soporte para diferentes tipos de rehabilitación.",
      "Requieren valoración clínica y estudios diagnósticos.",
      "El tratamiento se planifica de manera individual.",
      "Es necesario evaluar previamente la salud de las encías y el hueso.",
      "Requieren buenos hábitos de higiene y controles posteriores.",
    ],
    idealFor:
      "Has perdido uno o varios dientes y quieres conocer una alternativa fija para recuperar tu sonrisa y función.",
  },
  {
    slug: "higiene-dental-profesional",
    title: "Higiene dental profesional",
    category: "Odontología estética",
    categoryIntro:
      "La odontología estética busca mejorar la apariencia de la sonrisa de una manera personalizada, teniendo en cuenta no solo el color de los dientes, sino también su forma, tamaño, proporción y relación con las encías y el rostro.",
    whatIs:
      "Es un procedimiento realizado por profesionales para remover placa bacteriana, sarro y manchas superficiales que pueden acumularse con el paso del tiempo y que no siempre pueden eliminarse completamente mediante el cepillado en casa.",
    whatFor:
      "Ayuda a mantener los dientes y las encías limpios y saludables, además de contribuir a prevenir problemas asociados con la acumulación de placa y sarro. También permite identificar durante la consulta posibles cambios o condiciones que requieran una valoración adicional.",
    features: [
      "Es realizada por personal capacitado.",
      "Permite remover placa bacteriana y sarro.",
      "Ayuda a disminuir manchas superficiales.",
      "Favorece la salud de las encías.",
      "Complementa la higiene oral diaria.",
      "La frecuencia recomendada depende de las necesidades de cada paciente.",
      "No reemplaza el cepillado ni el uso del hilo dental.",
    ],
    idealFor:
      "Sientes acumulación de sarro, manchas en tus dientes o quieres mantener una adecuada salud oral.",
  },
  {
    slug: "resinas-dentales",
    title: "Resinas dentales",
    category: "Odontología estética",
    categoryIntro:
      "La odontología estética busca mejorar la apariencia de la sonrisa de una manera personalizada, teniendo en cuenta no solo el color de los dientes, sino también su forma, tamaño, proporción y relación con las encías y el rostro.",
    whatIs:
      "Las resinas dentales son materiales restauradores del color del diente que permiten recuperar parte de la estructura dental perdida y, en determinados casos, mejorar aspectos estéticos de la sonrisa. Pueden adaptarse cuidadosamente a la forma y color de los dientes para conseguir un resultado natural.",
    whatFor:
      "Pueden utilizarse para restaurar dientes afectados por caries, pequeñas fracturas, desgastes o cambios en la forma. También pueden utilizarse en determinados casos para cerrar pequeños espacios o realizar modificaciones estéticas.",
    features: [
      "Tienen un color similar al diente natural.",
      "Permiten realizar restauraciones estéticas.",
      "Pueden utilizarse para recuperar pequeñas pérdidas de estructura.",
      "Pueden mejorar determinados detalles de forma y tamaño.",
      "Son una opción conservadora en diferentes situaciones.",
      "Requieren cuidados y controles.",
      "Su duración depende de factores como el tipo de restauración, hábitos del paciente y mantenimiento.",
    ],
    idealFor:
      "Tienes pequeñas fracturas, desgastes, caries, espacios o dientes cuya forma te gustaría mejorar.",
  },
  {
    slug: "carillas-dentales",
    title: "Carillas dentales",
    category: "Odontología estética",
    categoryIntro:
      "La odontología estética busca mejorar la apariencia de la sonrisa de una manera personalizada, teniendo en cuenta no solo el color de los dientes, sino también su forma, tamaño, proporción y relación con las encías y el rostro.",
    whatIs:
      "Las carillas dentales son láminas delgadas diseñadas de manera personalizada para cubrir la superficie visible de los dientes y modificar determinados aspectos de su apariencia. Permiten trabajar elementos como la forma, tamaño, proporción y color, buscando que la sonrisa se vea armónica y natural.",
    whatFor:
      "Pueden utilizarse para mejorar determinadas alteraciones estéticas, como cambios de color, dientes con formas irregulares, pequeñas diferencias de tamaño o algunas alteraciones de posición que puedan ser tratadas mediante este tipo de restauración. Antes de realizar carillas es fundamental valorar la salud de los dientes y las encías y determinar si realmente son la mejor opción.",
    features: [
      "Son personalizadas.",
      "Permiten modificar forma, tamaño y color.",
      "Buscan mejorar la armonía de la sonrisa.",
      "Se diseñan teniendo en cuenta las características faciales del paciente.",
      "Requieren valoración odontológica previa.",
      "No todos los pacientes necesitan o son candidatos para este tratamiento.",
      "Requieren cuidados y controles para mantener su apariencia y función.",
    ],
    idealFor:
      "Quieres mejorar varios aspectos de la apariencia de tu sonrisa y buscas un resultado planificado y personalizado.",
  },
  {
    slug: "incrustaciones-dentales",
    title: "Incrustaciones dentales",
    category: "Odontología estética",
    categoryIntro:
      "La odontología estética busca mejorar la apariencia de la sonrisa de una manera personalizada, teniendo en cuenta no solo el color de los dientes, sino también su forma, tamaño, proporción y relación con las encías y el rostro.",
    whatIs:
      "Las incrustaciones son restauraciones personalizadas que permiten recuperar dientes que han perdido una cantidad importante de estructura, pero que todavía conservan suficiente tejido dental sano para ser restaurados. Se fabrican para adaptarse a la forma del diente y posteriormente se fijan sobre la estructura dental.",
    whatFor:
      "Ayudan a recuperar la forma, resistencia y función de dientes que han sufrido daños importantes, ofreciendo en determinados casos una alternativa más conservadora que una restauración de mayor extensión.",
    features: [
      "Son restauraciones personalizadas.",
      "Se utilizan en dientes con pérdida considerable de estructura.",
      "Permiten conservar parte del tejido dental natural.",
      "Ayudan a recuperar la función masticatoria.",
      "Pueden ofrecer una buena adaptación a la estructura del diente.",
      "Requieren una valoración para determinar si el diente es candidato.",
      "Su material y diseño dependen de las necesidades de cada caso.",
    ],
    idealFor:
      "Tienes un diente bastante deteriorado, pero todavía puede conservarse y necesita una restauración que le devuelva resistencia y función.",
  },
  {
    slug: "extracciones-dentales",
    title: "Extracciones dentales",
    category: "Odontología estética",
    categoryIntro:
      "La odontología estética busca mejorar la apariencia de la sonrisa de una manera personalizada, teniendo en cuenta no solo el color de los dientes, sino también su forma, tamaño, proporción y relación con las encías y el rostro.",
    whatIs:
      "La extracción dental es un procedimiento mediante el cual se retira un diente cuando, después de una valoración, se determina que no puede conservarse o que su extracción es necesaria dentro de un plan de tratamiento. Siempre que sea posible, la odontología actual busca conservar los dientes naturales; por eso la extracción se indica únicamente cuando existe una razón clínica.",
    whatFor:
      "Puede ser necesaria en dientes con daños extensos que no pueden restaurarse, determinadas infecciones, dientes retenidos o situaciones en las que forma parte de un tratamiento de ortodoncia u otra rehabilitación.",
    features: [
      "Se realiza bajo anestesia local.",
      "Se planifica previamente según las condiciones del paciente.",
      "Puede tratarse de una extracción sencilla o quirúrgica.",
      "Se brindan indicaciones específicas para el cuidado posterior.",
      "El tiempo de recuperación depende del tipo de procedimiento.",
      "Cuando es necesario, posteriormente puede planificarse la reposición del diente.",
    ],
    idealFor:
      "Tienes un diente con daño severo, dolor recurrente, infección o una condición que requiere valorar la posibilidad de extracción.",
  },
  {
    slug: "coronas-dentales",
    title: "Coronas dentales",
    category: "Rehabilitación oral",
    categoryIntro:
      "La rehabilitación oral busca recuperar la salud, función y estética de una boca que presenta dientes dañados, desgastados o ausentes. El objetivo no es únicamente reemplazar dientes, sino lograr que puedas masticar, hablar y sonreír con mayor comodidad y seguridad.",
    whatIs:
      "Las coronas dentales son restauraciones que cubren un diente que ha perdido una cantidad importante de estructura, ayudando a protegerlo y recuperar su forma. También pueden utilizarse sobre implantes para reemplazar la parte visible de un diente perdido.",
    whatFor:
      "Ayudan a recuperar la resistencia, función y apariencia de dientes debilitados o muy restaurados. Pueden ser una opción cuando una restauración convencional no ofrece suficiente protección para el diente.",
    features: [
      "Se fabrican de manera personalizada.",
      "Permiten proteger dientes debilitados.",
      "Recuperan forma y función.",
      "Pueden mejorar la apariencia del diente.",
      "Pueden colocarse sobre dientes naturales o implantes.",
      "El material de la corona se selecciona de acuerdo con las necesidades de cada caso.",
      "Requieren controles y adecuados hábitos de higiene.",
    ],
    idealFor:
      "Tienes un diente muy restaurado, debilitado, fracturado o con pérdida importante de estructura y necesitas recuperar su función y protección.",
  },
  {
    slug: "protesis-parciales-removibles",
    title: "Prótesis parciales removibles",
    category: "Rehabilitación oral",
    categoryIntro:
      "La rehabilitación oral busca recuperar la salud, función y estética de una boca que presenta dientes dañados, desgastados o ausentes. El objetivo no es únicamente reemplazar dientes, sino lograr que puedas masticar, hablar y sonreír con mayor comodidad y seguridad.",
    whatIs:
      "Son dispositivos diseñados para reemplazar varios dientes que se han perdido. Se pueden retirar de la boca para realizar la higiene y el mantenimiento. Son una alternativa para pacientes que necesitan recuperar dientes ausentes y buscan una opción removible.",
    whatFor:
      "Ayudan a recuperar parcialmente la capacidad de masticar y hablar y permiten mejorar la apariencia de la sonrisa cuando existen varios dientes ausentes.",
    features: [
      "Permiten reemplazar varios dientes.",
      "Son removibles.",
      "Pueden retirarse para realizar la higiene.",
      "Se fabrican de acuerdo con las características de cada paciente.",
      "Ayudan a recuperar la función masticatoria.",
      "Pueden mejorar la apariencia de la sonrisa.",
      "Requieren controles y mantenimiento periódico.",
      "Necesitan un periodo de adaptación.",
    ],
    idealFor:
      "Te faltan varios dientes y buscas una alternativa removible para recuperar función y estética.",
  },
  {
    slug: "protesis-totales",
    title: "Prótesis totales",
    category: "Rehabilitación oral",
    categoryIntro:
      "La rehabilitación oral busca recuperar la salud, función y estética de una boca que presenta dientes dañados, desgastados o ausentes. El objetivo no es únicamente reemplazar dientes, sino lograr que puedas masticar, hablar y sonreír con mayor comodidad y seguridad.",
    whatIs:
      "Las prótesis totales son dispositivos diseñados para reemplazar todos los dientes de una arcada cuando estos se han perdido. Se fabrican de manera personalizada buscando recuperar la apariencia de la sonrisa y mejorar funciones como la masticación y el habla.",
    whatFor:
      "Permiten reemplazar los dientes ausentes y recuperar, en la medida de lo posible, la función y estética de la boca. También pueden ayudar a recuperar el soporte de los labios y determinados aspectos de la apariencia facial que pueden modificarse después de la pérdida total de los dientes.",
    features: [
      "Reemplazan todos los dientes de una arcada.",
      "Son removibles.",
      "Se fabrican de manera personalizada.",
      "Buscan recuperar la función y estética.",
      "Pueden ayudar a mejorar el habla y la masticación.",
      "Requieren un periodo de adaptación.",
      "Necesitan cuidados y limpieza diaria.",
      "Requieren controles para evaluar su adaptación y estado.",
    ],
    idealFor:
      "Has perdido todos los dientes de una arcada y quieres recuperar la función, comodidad y apariencia de tu sonrisa.",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((service) => service.slug === slug);
}
