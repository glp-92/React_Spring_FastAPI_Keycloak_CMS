### Problemas en paso a produccion

- Las cookies httponly fuera de localhost necesitan https para ser enviadas al servidor => ocasiona que se tenga que reescribir la configuracion de nginx y habilitar puerto 443 y 80

- Keycloak presenta problemas de performance en vpc, reserva de ram y cpu
- Para ssl, en los certificados error de permisos => chmod -R 644 * dentro del directorio de los certs
- Poner modo host strict false
