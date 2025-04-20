let scene, camera, renderer, animationObject, currentSection = null;

const sectionColors = {
  sobremi: ["#000000", "#8000ff"],
  tecnologias: ["#000000", "#0077ff"],
  proyectos: ["#000000", "#00ff88"],
  contacto: ["#000000", "#ffff55"]
};

init();
switchSection("sobremi");

document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    switchSection(section);
  });
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  const canvas = document.getElementById("bg-animation");
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas);
  animate();
}

function resizeCanvas() {
  const canvas = document.getElementById("bg-animation");
  const container = document.getElementById("canvas-container");
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function switchSection(section) {
  if (currentSection === section) return;
  currentSection = section;

  updateBackground(section);
  updateContent(section);
  updateAnimation(section);
}

function updateBackground(section) {
  const [from, to] = sectionColors[section];
  document.body.style.background = `linear-gradient(to bottom right, ${from}, ${to})`;
}

function updateContent(section) {
    const content = document.getElementById("content");
    content.innerHTML = "";
  
    if (section === "sobremi") {
      content.innerHTML = `<h3>Sobre mí</h3><p>Desarrollador fullstack con experiencia en aplicaciones móviles, sitios web modernos, inteligencia artificial y ciencia de datos.</p>`;
    } else if (section === "tecnologias") {
      content.innerHTML = `
        <h3>Tecnologías</h3>
        <div class="tech-section">
          <h4>Frontend</h4>
          <div class="icon-container" id="frontend-icons">
            <!-- Aquí puedes agregar tus íconos del frontend -->
            <!-- Ejemplo: <img src="ruta/react.png" alt="React" /> -->
            <img src="react.png" alt="React" />
            <img src="js.png" alt="js" />
            <img src="flutter.png" alt="flutter" />

          </div>
        </div>
        <div class="tech-section">
          <h4>Backend</h4>
          <div class="icon-container" id="backend-icons">
            <!-- Aquí puedes agregar tus íconos del backend -->
            <!-- Ejemplo: <img src="ruta/node.png" alt="Node.js" /> -->
            <img src="node.png" alt="node" />
            <img src="laravel.png" alt="laravel" />
            <img src="aws.png" alt="aws" />
            <img src="github.png" alt="github" />
            <img src="python.png" alt="python" />
          </div>
        </div>
      `;
    } else if (section === "proyectos") {
      content.innerHTML = `<h3>Proyectos</h3><ul><li>App móvil en Flutter</li><li>Sistema web con Laravel</li><li>Modelo IA con TensorFlow</li><li>Microservicios con Docker</li></ul>`;
    } else if (section === "contacto") {
      content.innerHTML = `
        <h3>Contáctame</h3>
        <form>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo" required />
          <textarea placeholder="Tu mensaje"></textarea>
          <button type="submit">Enviar</button>
        </form>
      `;
    }
  }
  

function updateAnimation(section) {
  if (animationObject) {
    scene.remove(animationObject);
  }

  let geometry, material;

  if (section === "sobremi") {
    geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  } else if (section === "tecnologias") {
    geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
  } else if (section === "proyectos") {
    geometry = new THREE.ConeGeometry(1, 2, 4);
    material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
  } else if (section === "contacto") {
    geometry = new THREE.SphereGeometry(1, 32, 32);
    material = new THREE.MeshStandardMaterial({ color: 0xffff55 });
  }

  animationObject = new THREE.Mesh(geometry, material);
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.clear(); // Limpiar escena
  scene.add(light);
  scene.add(animationObject);
}

function animate() {
  requestAnimationFrame(animate);
  if (animationObject) {
    animationObject.rotation.x += 0.01;
    animationObject.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
