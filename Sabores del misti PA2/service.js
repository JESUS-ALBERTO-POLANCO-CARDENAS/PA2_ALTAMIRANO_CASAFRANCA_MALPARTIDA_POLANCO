// La capa de servicio se encarga de gestionar los datos.
// En un proyecto real, estas funciones harían llamadas a una API REST.
// Aquí, simulamos la respuesta con datos estáticos y un retraso.

export const menuItems = [
    {
        id: 'rocoto',
        name: 'Rocoto Relleno',
        price: 20.00,
        image: 'img/rocoto.png',
        description: 'Plato emblemático de Arequipa, relleno de carne molida, especias y queso derretido.',
        type: 'main'
    },
    {
        id: 'ocopa',
        name: 'Ocopa Arequipeña',
        price: 25.00,
        image: 'img/ocopa.png',
        description: 'Plato de entrada con papas bañadas en una salsa cremosa y picante de huacatay y maní.',
        type: 'entry'
    },
    {
        id: 'pastel',
        name: 'Pastel de Papas',
        price: 15.00,
        image: 'img/patata.png',
        description: 'Una de las guarniciones más populares y tradicionales de la "Ciudad Blanca".',
        type: 'side'
    }
];

export const recipes = [
    {
        id: 'recipe1',
        title: 'Caldo Blanco',
        ingredients: [
            '80gr de arroz',
            '80gr de garbanzos',
            '8 morayas pequeñas o chuño',
            '500gr papa blanca pelada',
            '500gr de yuca pelada',
            '2 zanahorias medianas en bastones',
            '4 ramas de apio + 1 poro',
            '4 dientes de ajo + perejil picado',
            '1 cebolla grande + 1 cebolla china',
            '1 nabo + aceite',
            '1 kg de carne de cordero o res'
        ],
        instructions: [
            'Cocer en agua hirviendo garbanzos, ajo, poro, nabo, yuca, chuño.',
            'Seguidamente se agrega la carne y se deja hervir con la olla semitapada y a fuego bajo.',
            'Posteriormente cuando la carne este suave agregar las papas, apio, zanahorias.',
            'Finalmente agregar el arroz, verdura picada y cebolla china; lista para servir.'
        ]
    },
    {
        id: 'recipe2',
        title: 'Rocoto Relleno',
        ingredients: [
            '4 rocotos grandes',
            'Carne molida o picada en cuadrados',
            'Huevos, aceitunas y pasas',
            'Leche, queso fresco',
            'Ajo, cebolla, ají panca'
        ],
        instructions: [
            'Retirar las venas y semillas del rocoto y hervir varias veces para quitar el picor.',
            'Preparar el relleno de carne con especias, huevos duros, aceitunas y pasas.',
            'Rellenar los rocotos con la carne y cubrir con una rodaja de queso.',
            'Hornear en una bandeja con una mezcla de leche y queso para gratinar.'
        ]
    }
];

// Función simulada para obtener el menú
export const getMenuItems = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(menuItems);
        }, 500); // Simula un retraso de 500ms de una API
    });
};

// Función simulada para obtener las recetas
export const getRecipes = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(recipes);
        }, 500);
    });
};