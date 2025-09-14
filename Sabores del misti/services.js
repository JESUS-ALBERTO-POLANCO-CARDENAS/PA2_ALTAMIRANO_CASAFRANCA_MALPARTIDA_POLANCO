export const MenuService = {
    async getMenu() {
        try {
            // Ejemplo con API real (FakeStoreAPI)
            const response = await fetch("https://fakestoreapi.com/products?limit=6");
            const data = await response.json();
fetch("https://api.midominio.com/menu")
  .then(res => res.json())
  .then(data => console.log(data));
            // Adaptamos los datos de la API a nuestro formato
            return data.map((item, index) => ({
                id: item.id,
                nombre: ["Rocoto Relleno", "Ocopa Arequipeña", "Pastel de Papas"][index] || item.title,
                descripcion: item.description,
                precio: (item.price * 3.5).toFixed(2), // simula precio en soles
                imagen: item.image
            }));
        } catch (error) {
            console.error("Error al cargar el menú:", error);
            return [];
        }
        
    }
}

