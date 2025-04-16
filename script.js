const filtro = document.getElementById("tipo");
    const cards = document.querySelectorAll(".card");

    filtro.addEventListener("change", () => {
      const tipo = filtro.value;
      cards.forEach(card => {
        if (tipo === "todos" || card.dataset.tipo === tipo) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });