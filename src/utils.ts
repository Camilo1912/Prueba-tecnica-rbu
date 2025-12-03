export const validarRut = (rut: string): boolean => {
    const rutLimpio = rut.replace(/[^0-9kK]/g, '').toUpperCase(); 

    if (rutLimpio.length < 2 || rutLimpio.length > 9) {
        return false;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = suma % 11;
    let dvCalculado: string;

    if (resto === 1) {
        dvCalculado = 'K'; 
    } else if (resto === 0) {
        dvCalculado = '0'; 
    } else {
        dvCalculado = String(11 - resto); 
    }
    
    return dvCalculado === dv;
};

export const formatDate = (inputDate: string): string => {
    if (!inputDate) {
        return ""
    }
    const dateObject = new Date(inputDate)

    if (isNaN(dateObject.getTime())) {
        console.log("Fecha inválida: ", inputDate)
        return ""
    }

    const opciones: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    };
    return new Intl.DateTimeFormat('es-CL', opciones).format(dateObject);
}