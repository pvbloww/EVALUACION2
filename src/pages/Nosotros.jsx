import Imagen from '../components/Imagen.jsx'
import { imagenes } from '../data/imagenes.js'
import './Nosotros.css'

export default function Nosotros() {
  return (
    <div className="v-pagina">
    <section aria-label="Presentación de la empresa">
      <h1>Sobre Veterinaria San Marcos</h1>
      <p>
        Veterinaria San Marcos es una clínica veterinaria ubicada en Rancagua, Región del
        Libertador General Bernardo O'Higgins. Fue fundada en 2009 y cuenta con 3 médicos
        veterinarios, 1 técnico veterinario y 1 recepcionista administrativa.
      </p>
      <p>
        Atendemos mascotas domésticas: principalmente perros y gatos, aunque también
        conejos y aves. Prestamos servicios de consulta general, vacunación, cirugía menor,
        desparasitación y control de peso, con un promedio de 25 pacientes atendidos por día.
      </p>
    </section>

    <div className="nosotros-video">
      <iframe loading="lazy"
        src="https://www.youtube.com/embed/vvFNOllHgvU"
        title="Video institucional sobre el cuidado de mascotas"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>

    <section className="v-seccion" aria-label="Nuestro equipo">
      <div className="v-titulo">
        <h2>Nuestro equipo</h2>
        <p>Profesionales dedicados al bienestar de tu mascota.</p>
      </div>
      <div className="v-grid">
        <article className="v-card v-card-centro">
          <Imagen src={imagenes.equipoMedico} alt="Equipo médico veterinario" texto="👩‍⚕️" />
          <h3>Equipo médico veterinario</h3>
          <p>3 médicos con experiencia en consulta general, cirugía y control de peso.</p>
        </article>
        <article className="v-card v-card-centro">
          <Imagen src={imagenes.tecnico} alt="Técnico veterinario" texto="🧑‍🔬" />
          <h3>Técnico veterinario</h3>
          <p>Apoyo directo en procedimientos, vacunación y administración de medicamentos.</p>
        </article>
        <article className="v-card v-card-centro">
          <Imagen src={imagenes.recepcion} alt="Recepción" texto="🗂️" />
          <h3>Recepción</h3>
          <p>Encargada de agendar horas y coordinar la atención de cada paciente.</p>
        </article>
      </div>
    </section>

    <section className="v-seccion" aria-label="Nuestra misión">
      <div className="v-titulo">
        <h2>Nuestro compromiso</h2>
      </div>
      <p>
        Buscamos modernizar la forma en que nuestros pacientes acceden a la atención:
        que los dueños de mascotas puedan solicitar y revisar sus citas en línea, que los
        médicos accedan al historial clínico desde cualquier dispositivo, y que cada
        consulta, vacuna y tratamiento quede registrado digitalmente.
      </p>
    </section>
  
    </div>
  )
}
