document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ contact.js berhasil dimuat");

  const form = document.getElementById("contact-form");
  const button = form.querySelector("button");

  if (!form) {
    console.error("⚠️ Form tidak ditemukan!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Feedback saat loading
    button.disabled = true;
    button.textContent = "Sending...";
    button.style.backgroundColor = "#999";

    try {
      let response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();

        // ✅ sukses
        button.textContent = "Sent!";
        button.style.backgroundColor = "green";

        // Balik ke normal setelah 2 detik
        setTimeout(() => {
          button.textContent = "Send";
          button.disabled = false;
          button.style.backgroundColor = "";
        }, 2000);
      } else {
        // ❌ gagal
        button.textContent = "Failed!";
        button.style.backgroundColor = "red";

        setTimeout(() => {
          button.textContent = "Send";
          button.disabled = false;
          button.style.backgroundColor = "";
        }, 2000);
      }
    } catch (err) {
      // ⚠️ error jaringan
      button.textContent = "Error!";
      button.style.backgroundColor = "orange";

      setTimeout(() => {
        button.textContent = "Send";
        button.disabled = false;
        button.style.backgroundColor = "";
      }, 2000);
    }
  });
});
