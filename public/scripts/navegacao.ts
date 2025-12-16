document.addEventListener("DOMContentLoaded", (): void => {
    const navItems = document.querySelectorAll(".nav-item");
    const inventoryButton = Array.from(navItems).find(
        (item) => item.textContent?.trim() === "Inventário"
    ) as HTMLElement | undefined;
    const reportsButton = Array.from(navItems).find(
        (item) => item.textContent?.trim().startsWith("Relatórios")
    ) as HTMLElement | undefined;
    const alertsButton = Array.from(navItems).find(
        (item) => item.textContent?.trim().startsWith("Alertas")
    ) as HTMLElement | undefined;

    const inventoryContainer = document.querySelector(".table-container") as HTMLElement | null;
    const reportsContainer = document.getElementById("relatorios-container") as HTMLElement | null;
    const alertsContainer = document.getElementById("alertas-container") as HTMLElement | null;
    const principalContainer = document.querySelector(".principal") as HTMLElement | null;

    if (!inventoryButton || !reportsButton || !alertsButton || !inventoryContainer || !reportsContainer || !alertsContainer || !principalContainer) {
        console.error(
            "Um ou mais elementos da interface não foram encontrados. A navegação pode não funcionar corretamente."
        );
        return;
    }

    function resetState(): void {
        if (principalContainer) principalContainer.style.display = "none";
        if (inventoryContainer) inventoryContainer.style.display = "none";
        if (reportsContainer) reportsContainer.style.display = "none";
        if (alertsContainer) alertsContainer.style.display = "none";

        navItems.forEach((item) => item.classList.remove("active"));
    }

    reportsButton.addEventListener("click", (): void => {
        resetState();
        if (reportsContainer) reportsContainer.style.display = "block";
        carregarRelatorios();
        reportsButton.classList.add("active");
    });

    inventoryButton.addEventListener("click", (): void => {
        resetState();
        if (principalContainer) principalContainer.style.display = "block";
        if (inventoryContainer) inventoryContainer.style.display = "table";
        inventoryButton.classList.add("active");
    });

    alertsButton.addEventListener("click", (): void => {
        resetState();
        if (alertsContainer) alertsContainer.style.display = "block";
        carregarAlertas();
        alertsButton.classList.add("active");
    });

    inventoryButton.click();
});
