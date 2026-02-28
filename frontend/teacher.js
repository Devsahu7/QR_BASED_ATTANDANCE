const backendUrl = "http://127.0.0.1:1000";


document.getElementById("generateQR").addEventListener("click", async () => {
  const res = await fetch(`${backendUrl}/generateQR`, { method: "POST" });
  const data = await res.json();
  document.getElementById("qrContainer").innerHTML = `
    <img src="${data.qrImage}" alt="QR Code">
    <p><b>Session ID:</b> ${data.sessionId}</p>
  `;
});


async function loadAttendance() {
  const res = await fetch(`${backendUrl}/getAttendance`);
  const records = await res.json();
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";
  records.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.userId}</td>
        <td>${r.sessionId}</td>
        <td>${r.time}</td>
      </tr>`;
  });
}

loadAttendance();

setInterval(loadAttendance, 5000);
