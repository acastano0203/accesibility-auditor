import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Problema 1: no hay landmark <main>, todo es div */}

      {/* Problema 2: imagen sin atributo alt */}
      <img src="https://via.placeholder.com/150" />

      {/* Problema 3: el "título" es un div, no un h1 */}
      <div style={{ fontSize: "32px", fontWeight: "bold" }}>
        Mi Tienda Online
      </div>

      {/* Problema 4: jerarquía de encabezados rota — h3 sin h2 */}
      <h3>Productos destacados</h3>

      {/* Problema 5: botón con solo ícono y sin aria-label */}
      <button onClick={() => setCount(count + 1)}>
        <span>🔍</span>
      </button>

      {/* Problema 6: input sin label asociado */}
      <div>
        <p>Correo electrónico</p>
        <input type="email" />
      </div>

      {/* Problema 7: enlace con texto poco descriptivo */}
      <a href="/productos">Click aquí</a>

      {/* Problema 8: contraste insuficiente — texto gris claro sobre blanco */}
      <p style={{ color: "#bbbbbb", background: "#ffffff" }}>
        Texto con contraste muy bajo que falla WCAG AA
      </p>

      {/* Problema 9: div con onClick — debería ser button */}
      <div onClick={() => alert("hola")} style={{ cursor: "pointer" }}>
        Agregar al carrito
      </div>

      {/* Problema 10: form sin estructura semántica */}
      <div>
        <p>Buscar producto:</p>
        <input type="text" />
        <div onClick={() => {}}>Buscar</div>
      </div>

      <p>Contador: {count}</p>
    </div>
  );
}

export default App;
