document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.getElementById("toggle-theme");
    const body = document.body;
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav ul li a");
    const themeList = document.getElementById("theme-list");
    const icono = document.querySelector("#icono-experiencia");

    // Función para actualizar el color del icono SVG
    const updateIconColor = () => {
        if (!icono) return; // Evita errores si el icono no existe

        if (body.classList.contains("dark-mode")) {
            icono.style.stroke = "white"; // Color en modo oscuro
        } else {
            icono.style.stroke = "rgb(31, 41, 55)"; // Color en modo claro
        }
    };

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        const sunIcon = document.getElementById("sun-icon");
        const moonIcon = document.getElementById("moon-icon");
        const systemIcon = document.getElementById("system-icon");
    
        // Ocultar todos los iconos antes de aplicar el nuevo tema
        sunIcon.style.display = "none";
        moonIcon.style.display = "none";
        systemIcon.style.display = "none";
    
        if (theme === "dark") {
            body.classList.add("dark-mode");
            header.classList.add("dark-mode");
            moonIcon.style.display = "inline"; // Mostrar solo la luna ☾
        } else if (theme === "light") { 
            body.classList.remove("dark-mode");
            header.classList.remove("dark-mode");
            sunIcon.style.display = "inline"; // Mostrar solo el sol ☀
        } else if (theme === "system") {
            systemIcon.style.display = "inline"; // Mostrar solo el icono de sistema "모"
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            
            if (systemPrefersDark) {
                body.classList.add("dark-mode");
                header.classList.add("dark-mode");
            } else {
                body.classList.remove("dark-mode");
                header.classList.remove("dark-mode");
            }
        }
    
        updateIconColor(); // 🔹 Actualizar color del icono después de cambiar el tema
    };
    
    // Verificar tema guardado en localStorage o establecer "light" por defecto
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    
    // Mostrar lista de temas (light, dark, system) cuando se hace clic en el botón
    toggleThemeBtn.addEventListener("click", () => {
        themeList.style.display = themeList.style.display === "none" ? "block" : "none";
    });
    
    // Selección del tema desde la lista
    themeList.addEventListener("click", (event) => {
        const theme = event.target.id;
        if (theme) {
            applyTheme(theme);
            localStorage.setItem("theme", theme); // Guardar la preferencia
            themeList.style.display = "none"; // Cerrar la lista
        }
    });
    

    // Efecto de zoom en imágenes de proyectos
    const proyectos = document.querySelectorAll(".proyecto img");
    proyectos.forEach(img => {
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.1)";
        });
        img.addEventListener("mouseout", () => {
            img.style.transform = "scale(1)";
        });
    });

    // Cambio de color y transparencia en la barra de navegación al hacer scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { 
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Resaltar la sección actual en el menú
        let fromTop = window.scrollY;
        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (section && section.offsetTop <= fromTop + 100 && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

    // Actualizar el color del icono si el usuario cambia el modo del sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateIconColor);
});
