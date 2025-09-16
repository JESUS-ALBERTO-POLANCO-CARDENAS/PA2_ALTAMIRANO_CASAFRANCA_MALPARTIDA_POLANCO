import { getMenuItems, getRecipes } from './service.js';

// Estado global para el carrito de compras
let cart = [];

// Función para mostrar los items del menú dinámicamente
async function renderMenu() {
    const menuSection = document.getElementById('menu-items-container');
    const items = await getMenuItems(); // Consume el servicio
    menuSection.innerHTML = ''; // Limpia el contenido existente
    
    items.forEach(item => {
        const itemHTML = `
            <div class="bg-gray-50 rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 flex flex-col">
                <img src="${item.image}" alt="${item.name}" class="rounded-lg mb-4 object-cover h-48 w-full">
                <h3 class="text-2xl font-semibold mb-2">${item.name}</h3>
                <p class="text-gray-600 flex-grow">${item.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-2xl font-bold text-gray-900">S/. ${item.price.toFixed(2)}</span>
                    <button data-id="${item.id}" class="add-to-cart-btn bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        menuSection.innerHTML += itemHTML;
    });

    // Agregar event listeners a los nuevos botones
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.id;
            addItemToCart(itemId);
        });
    });
}

// Función para añadir un plato al carrito
async function addItemToCart(itemId) {
    const items = await getMenuItems();
    const itemToAdd = items.find(item => item.id === itemId);
    if (itemToAdd) {
        cart.push(itemToAdd);
        updateCartDisplay();
        showOrderModal(itemToAdd.name);
    }
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="text-center text-gray-500">El carrito está vacío.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - S/. ${item.price.toFixed(2)}`;
            li.classList.add('flex', 'justify-between', 'items-center', 'py-1');
            cartList.appendChild(li);
            total += item.price;
        });
    }

    cartTotal.textContent = `S/. ${total.toFixed(2)}`;
}

// Función para mostrar el modal de pedido
function showOrderModal(dishName) {
    document.getElementById('modalMessage').textContent = `¡Gracias! "${dishName}" ha sido añadido a tu carrito.`;
    document.getElementById('orderModal').classList.remove('hidden');
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
    } else {
        icon.textContent = '+';
    }
}

// Cargar las recetas dinámicamente
async function renderRecipes() {
    const recipesSection = document.getElementById('recipes-container');
    const recipes = await getRecipes();
    recipesSection.innerHTML = '';

    recipes.forEach(recipe => {
        const instructionsHtml = recipe.instructions.map(inst => `<li>${inst}</li>`).join('');
        const ingredientsHtml = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

        const recipeHTML = `
            <div class="bg-white rounded-lg shadow-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300" onclick="toggleRecipe('${recipe.id}')">
                <h3 class="text-2xl font-semibold mb-2 flex items-center justify-between">
                    ${recipe.title}
                    <span class="text-xl transform rotate-0 transition-transform duration-300" id="icon-${recipe.id}">+</span>
                </h3>
                <div id="${recipe.id}" class="recipe-content mt-4 text-gray-600">
                    <p class="mb-2 font-bold">Ingredientes:</p>
                    <ul class="list-disc list-inside mb-4">${ingredientsHtml}</ul>
                    <p class="mb-2 font-bold">Instrucciones:</p>
                    <ol class="list-decimal list-inside space-y-2">${instructionsHtml}</ol>
                </div>
            </div>
        `;
        recipesSection.innerHTML += recipeHTML;
    });
}

// Inicializar la aplicación
window.onload = () => {
    renderMenu();
    renderRecipes();
    updateCartDisplay();
};

// Exponer las funciones al ámbito global para que HTML pueda llamarlas
window.closeModal = closeModal;
window.toggleRecipe = toggleRecipe;