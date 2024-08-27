import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ padding: 4 }}>
            <Typography variant="h1" gutterBottom textAlign={'center'}>
                Política de Privacidad
            </Typography>
            <Typography variant="subtitle1" gutterBottom textAlign={'center'} >
                [04 de agosto de 2024]
            </Typography>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    1. Información Recopilada
                </Typography>
                <Typography variant="body1" paragraph>
                    No se recopila información personal de visitantes a menos que sea proporcionada voluntariamente, exceptuando el siguiente caso:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Datos de análisis básicos: Información sobre la ubicación general (país o región) desde la que acceden los usuarios al sitio, el número de visitas y el número de páginas vistas.</li>
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    2. Uso de la Información
                </Typography>
                <Typography variant="body1" paragraph>
                    La información recopilada se utiliza exclusivamente para:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Analizar el tráfico y el comportamiento de los usuarios en el sitio para mejorar el contenido y la experiencia de usuario.</li>
                </Typography>
                <Typography marginTop={1} variant="body1" paragraph>
                    No se comparte ni vende información a terceros.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    3. Cookies
                </Typography>
                <Typography variant="body1" paragraph>
                    El sitio web utiliza cookies mínimas para realizar un seguimiento del tráfico y de los patrones de uso. Estas cookies no contienen ninguna información personal identificable.
                </Typography>
                <Typography variant="body1" paragraph>
                    Se puede desactivar el uso de cookies modificando la configuración del navegador, aunque esto puede afectar a la funcionalidad del sitio.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    4. Seguridad
                </Typography>
                <Typography variant="body1" paragraph>
                    Se protege la información recopilada de cualquier acceso no autorizado, alteración o destrucción. Sin embargo, ninguna transmisión por Internet es completamente segura.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    5. Enlaces a Terceros
                </Typography>
                <Typography variant="body1" paragraph>
                    El sitio web puede contener enlaces a otros sitios. No se asume responsabilidad del contenido ni de las prácticas de privacidad de estos sitios de terceros. Se recomienda leer las políticas de privacidad de cualquier sitio web externo visitado.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    6. Cambios en la Política de Privacidad
                </Typography>
                <Typography variant="body1" paragraph>
                    La política de privacidad está sujeta a cambios. Cualquier cambio será publicado en esta página con la fecha de actualización revisada.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2" gutterBottom>
                    7. Contacto
                </Typography>
                <Typography variant="body1" paragraph>
                    Ante cualquier duda, el contacto es <Link href="mailto:tucorreo@ejemplo.com">tucorreo@ejemplo.com</Link>.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
