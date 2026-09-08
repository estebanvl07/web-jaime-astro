import imgHero from "@/imports/assets/a8f2c0383b88021a11b45557934c6aacc3594e91.avif?url";
import imgDoctorFemale from "@/imports/assets/890ab96eccf5036670caa7b94b7722353ee0b062.avif?url";
import imgDoctorMale from "@/imports/assets/390a25e5fe1e5f9ca887d18144e9fa2e6aaaf821.avif?url";

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
    img: imgHero,
    bio: "Odontólogo y especialista en Ortodoncia con aproximadamente 18 años de experiencia profesional y 12 años dedicados al diagnóstico, prevención y tratamiento de las alteraciones en la posición de los dientes y la mordida. Se graduó como odontólogo el 15 de febrero de 2008 y como ortodoncista el 14 de marzo de 2014.",
  },
  {
    name: "Dr. Yesid Escorcia Niebles",
    specialty: "Periodoncista · 7 años de especialidad",
    img: imgDoctorMale,
    bio: "Odontólogo con aproximadamente 18 años de experiencia y especialista en Periodoncia desde 2019, enfocado en la prevención, diagnóstico y tratamiento de las enfermedades de las encías y los tejidos que soportan los dientes. Se graduó como odontólogo el 15 de febrero de 2008 y como periodoncista el 25 de octubre de 2019.",
  },
  {
    name: "Dra. Linda Camacho Pinzón",
    specialty: "Odontóloga · 18 años de experiencia",
    img: imgDoctorFemale,
    bio: "Odontóloga con aproximadamente 18 años de experiencia profesional, comprometida con brindar una atención integral, cercana y enfocada en el cuidado y mantenimiento de la salud oral. Se graduó el 15 de febrero de 2008.",
  },
];
