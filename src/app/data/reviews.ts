export type GoogleReview = {
  name: string;
  text: string;
  when: string;
  avatar: string;
  stars: number;
};

/** Foto de perfil de Google a un tamaño usable en las tarjetas. */
function avatar(src: string): string {
  return src.replace(/=w\d+-h\d+/, "=w128-h128");
}

export const googleReviews: GoogleReview[] = [
  {
    name: "Maria Jose Alarcon Theran",
    when: "Hace un mes",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a/ACg8ocI62IBHFhHoQVoPO3aF0JOCVIWOIWBPhcE6DSMvYHi3eMc1dA=w36-h36-p-rp-mo-br100",
    ),
    text: "Excelente atención. Es un lugar muy cómodo donde uno se siente en confianza desde que llega. Todo el equipo es muy amable y profesional, hacen que cada cita sea una muy buena experiencia. ¡Los recomiendo totalmente!",
  },
  {
    name: "Sofia Hernández Giha",
    when: "Hace un mes",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a/ACg8ocLHU4-EDkrv0NUPfb1duq8R2fuKYGgC253sJ9BaaE6JCkeFWA=w36-h36-p-rp-mo-br100",
    ),
    text: "Excelente atención y un trabajo impecable. El doctor es muy amable y profesional durante todo el tratamiento. Me explicó cada procedimiento y el resultado superó mis expectativas. Mis dientes quedaron hermosos y me sentí muy cómoda durante todo el proceso. Lo recomiendo completamente!",
  },
  {
    name: "Carolina Tarrá",
    when: "Hace un mes",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a/ACg8ocIJcwHQa8n2nxYoqaUV1c0S6UjgUNLxkoDwc7X4Y2RkjY-GdO5e=w36-h36-p-rp-mo-br100",
    ),
    text: "Excelente servicio. Realicé mi tratamiento de ortodoncia, diseño en resina y otros procedimientos, y en cada uno de ellos la atención ha sido excelente. Todo el equipo es muy profesional, amable y siempre estuvo pendiente de que me sintiera cómoda durante el proceso. Sin duda, los recomiendo.",
  },
  {
    name: "Maria Alejandra Gutierrez Ordoñez",
    when: "Hace 2 meses",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a/ACg8ocJekfXygcff4V5YM6Aj2tho-fTOUUihxnQSGXFMZF6EtKhD5fY=w36-h36-p-rp-mo-br100",
    ),
    text: "La atención fue excelente, más cómoda no me pude sentir durante todo el proceso, me encantó como me quedó mi sonrisa y más no la he podido lucir, encantada con el servicio del doctor Jaime y de todo el personal del consultorio en general.",
  },
  {
    name: "Michelle Olivares",
    when: "Hace 2 meses",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a-/ALV-UjVG9nZGyFyUZHQZ8TDI31UAjEwmp1-MHyo8qYNNsXHFCOZROgdutw=w36-h36-p-rp-mo-br100",
    ),
    text: "Amé su trabajo, desde mi corrección de dentadura hasta mi diseño de sonrisa, excelente atención, no los cambio por nada los mejores!",
  },
  {
    name: "Sergio Zuleta",
    when: "Hace 2 meses",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a-/ALV-UjWes-fh1lADlN3rLjzvMSrCEtgAm8yZTgc5QbwreVExYWxgFJl9ew=w36-h36-p-rp-mo-br100",
    ),
    text: "El mejor ortodoncista de la ciudad. Recomendado muy amable, explica muy bien todo los tratamientos y procesos.",
  },
  {
    name: "David González",
    when: "Hace 2 meses",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a-/ALV-UjWdxagdrZrLCOAvP0H3cTj_bn-LVHtcpTf7azpndosZ3QNKnKZF=w36-h36-p-rp-mo-br100",
    ),
    text: "Estoy en proceso de ortodoncia con el doctor y los cambios en mis dientes han sido espectaculares, super recomendado. El mejor odontólogo de Barranquilla sin duda.",
  },
  {
    name: "Jorge Alberto Benitorevollo",
    when: "Hace 2 meses",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a/ACg8ocKPjrEqPXKN_b0y233m_hXCjHbYZrt00wb0GXCv5X_xLhWWRA=w36-h36-p-rp-mo-br100",
    ),
    text: "Excelente experiencia el doctor es súper dedicado, la atención y la puntualidad siempre excelentes.",
  },
  {
    name: "Carlos Palomino",
    when: "Hace un mes",
    stars: 5,
    avatar: avatar(
      "https://lh3.googleusercontent.com/a-/ALV-UjUxL6NZ_dH9rzzIVHbXuGx8HHtLhViQC2SRbQPYG1EdRgQyIvv_=w36-h36-p-rp-mo-br100",
    ),
    text: "Me siento muy satisfecho con los resultados, excelente atención, personal capacitado y profesional. Recomiendo totalmente sus servicios.",
  },
];
