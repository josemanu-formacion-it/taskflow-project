# Investigación de Herramientas de API y Backend

En el proceso de construcción de **mi** API para TaskFlow, he investigado las siguientes herramientas fundamentales en la industria:

### 1. Axios
Es una librería cliente HTTP basada en promesas para el navegador y Node.js. 
- **¿Por qué se usa?** Aunque `fetch` es nativo, Axios ofrece ventajas como la transformación automática de datos JSON, la interceptación de peticiones/respuestas y una sintaxis más limpia para manejar errores.

### 2. Postman
Es una plataforma colaborativa para el diseño y uso de APIs.
- **¿Por qué se usa?** Me permite probar **mis** endpoints (`GET`, `POST`, `DELETE`) sin necesidad de tener el frontend terminado. Es vital para asegurar que **mi** "contrato de red" funciona correctamente.

### 3. Sentry
Es una plataforma de monitoreo de errores y rendimiento.
- **¿Por qué se usa?** En el backend, si algo falla en producción, Sentry me envía una alerta con la traza exacta del error antes de que **mis** usuarios se den cuenta. Ayuda a mantener **mi** servidor estable.

### 4. Swagger (OpenAPI)
Es un conjunto de herramientas para documentar APIs.
- **¿Por qué se usa?** Genera una página web interactiva donde otros desarrolladores pueden ver qué endpoints tiene **mi** API, qué datos esperan y probarlos directamente desde el navegador.