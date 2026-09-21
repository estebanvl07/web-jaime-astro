export type TeamMember = {
  name: string;
  specialty: string;
  bio: string;
  img: string;
  linkedin?: string;
  instagram?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Jaime Eduardo Pinzón Tovar",
    specialty: "Ortodoncista · 12 años de especialidad",
    img: "/images/profesionales/prof-01.png",
    bio: "Odontólogo y especialista en Ortodoncia con aproximadamente 18 años de experiencia profesional y 12 años dedicados al diagnóstico, prevención y tratamiento de las alteraciones en la posición de los dientes y la mordida. Se graduó como odontólogo el 15 de febrero de 2008 y como ortodoncista el 14 de marzo de 2014.",
  },
  {
    name: "Dr. Yesid Escorcia Niebles",
    specialty: "Periodoncista · 7 años de especialidad",
    img: "/images/profesionales/prof-02.png",
    bio: "Odontólogo con aproximadamente 18 años de experiencia y especialista en Periodoncia desde 2019, enfocado en la prevención, diagnóstico y tratamiento de las enfermedades de las encías y los tejidos que soportan los dientes. Se graduó como odontólogo el 15 de febrero de 2008 y como periodoncista el 25 de octubre de 2019.",
  },
  {
    name: "Dra. Linda Camacho Pinzón",
    specialty: "Odontóloga · 18 años de experiencia",
    img: "/images/profesionales/prof-03.png",
    bio: "Odontóloga con aproximadamente 18 años de experiencia profesional, comprometida con brindar una atención integral, cercana y enfocada en el cuidado y mantenimiento de la salud oral. Se graduó el 15 de febrero de 2008.",
  },
];
