document.addEventListener("DOMContentLoaded", (): void => {
    const menuToggle = document.querySelector(".menu-toggle") as HTMLElement | null;
    const sidebar = document.querySelector(".sidebar") as HTMLElement | null;

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", (): void => {
            sidebar.classList.toggle("open");
        });
    }
});
