

function openProfileFileStore() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("El navegador no permite guardar archivos localmente."));
      return;
    }

    const request = window.indexedDB.open("practicas-di-profile-files", 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("files")) request.result.createObjectStore("files");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("No se pudo abrir el almacenamiento local."));
  });
}

async function storeProfileCv(file) {
  const database = await openProfileFileStore();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("files", "readwrite");
    transaction.objectStore("files").put(file, "student-cv");
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error || new Error("No se pudo guardar el CV.")); };
    transaction.onabort = () => { database.close(); reject(transaction.error || new Error("No se pudo guardar el CV.")); };
  });
}

async function readProfileCv() {
  const database = await openProfileFileStore();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("files", "readonly");
    const request = transaction.objectStore("files").get("student-cv");
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error("No se pudo leer el CV guardado."));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => { database.close(); reject(transaction.error || new Error("No se pudo leer el CV guardado.")); };
    transaction.onabort = () => { database.close(); reject(transaction.error || new Error("No se pudo leer el CV guardado.")); };
  });
}

export { storeProfileCv, readProfileCv };
