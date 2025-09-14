// Función para mostrar el modal de pedido
function orderDish(dishName) {
    saveOrder(dishName);
    document.getElementById("modalMessage").innerText = `Has pedido: ${dishName}. ¡Gracias por tu preferencia!`;
    document.getElementById("orderModal").classList.remove("hidden");
}

function saveOrder(dishName) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ dish: dishName, date: new Date().toISOString() });
    localStorage.setItem("orders", JSON.stringify(orders));
}
// Función para cerrar el modal
function closeModal() {
    document.getElementById('orderModal').classList.add('hidden');
}

// Función para alternar la visibilidad de la receta
function toggleRecipe(recipeId) {
            const recipeContent = document.getElementById(recipeId);
            const icon = document.getElementById(`icon-${recipeId}`);
            
            recipeContent.classList.toggle('open');
            if (recipeContent.classList.contains('open')) {
                icon.textContent = '-';
                icon.classList.add('rotate-180');
            } else {
                icon.textContent = '+';
                icon.classList.remove('rotate-180');
            }
        }
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BookService } from "./services/BookService.js";

function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    BookService.getBooks().then(setBooks);
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  return (
    <div>
      <header>
        <h1>Tienda de E-Books</h1>
        <p>Carrito: {cart.length} artículos</p>
      </header>

      <div className="container">
        {books.map((book) => (
          <div key={book.id} className="card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p><b>${book.price}</b></p>
            <button onClick={() => addToCart(book)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { MenuService, RecetaService } from "./services.js";

// --- Interactividad con el Menú ---
async function loadMenu() {
  const menuContainer = document.querySelector("#menu .grid");
  const platos = await MenuService.getMenu();

  menuContainer.innerHTML = "";

  platos.forEach(plato => {
    const card = document.createElement("div");
    card.className = "bg-gray-50 rounded-lg shadow-xl p-6 flex flex-col transform hover:scale-105 transition-transform duration-300";

    card.innerHTML = `
      <img src="${plato.img}" alt="${plato.nombre}" class="rounded-lg mb-4 object-cover h-48 w-full">
      <h3 class="text-2xl font-semibold mb-2">${plato.nombre}</h3>
      <p class="text-gray-600 flex-grow">Plato tradicional arequipeño.</p>
      <div class="flex justify-between items-center mt-4">
        <span class="text-2xl font-bold text-gray-900">S/. ${plato.precio.toFixed(2)}</span>
        <button onclick="orderDish('${plato.nombre}')" 
          class="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300">
          Pedir
        </button>
      </div>
    `;

    menuContainer.appendChild(card);
  });

}

// --- Interactividad con Recetas ---
async function loadRecetas() {
    const recetas = await RecetaService.getRecetas();
    console.log("Recetas cargadas desde servicio:", recetas);
    // Podrías extender esto para renderizarlas dinámicamente también
}

// --- Funciones para Modal ---
window.orderDish = function(nombrePlato) {
    const modal = document.getElementById("orderModal");
    const message = document.getElementById("modalMessage");
    message.textContent = `Tu pedido de "${nombrePlato}" ha sido registrado con éxito.`;
    modal.classList.remove("hidden");
};

window.closeModal = function() {
    document.getElementById("orderModal").classList.add("hidden");
};

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    loadRecetas();
});
export const RecetaService = {
    async getRecetas() {
        // Simulación (podría venir de otra API o JSON local)
        return [
            {
                id: "recipe1",
                titulo: "Caldo Blanco",
                ingredientes: ["Arroz", "Garbanzos", "Chuño", "Papa blanca", "Yuca"],
                instrucciones: "Hervir los ingredientes y cocinar a fuego lento hasta que esté listo."
            },
            {
                id: "recipe2",
                titulo: "Rocoto Relleno",
                ingredientes: ["Rocotos", "Carne molida", "Queso fresco", "Huevos", "Aceitunas"],
                instrucciones: "Rellenar los rocotos y hornear con queso."
            }
        ];
    }
};


