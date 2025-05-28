import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { initializeApp, getApps } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializa o Firebase App (somente uma vez)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);

// 📤 Upload de um único arquivo
export async function uploadFile(file) {
  const uniqueFileName = `${uuidv4()}_${file.name}`;
  const fileRef = ref(storage, `uploads/${uniqueFileName}`);

  try {
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);
    return { fileUrl: fileUrl, tipo: file.type };
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw error;
  }
}

// 📤 Upload de múltiplos arquivos
export async function uploadFiles(files) {
  return await Promise.all(files.map((file) => uploadFile(file)));
}

// 🗑️ Remover um único arquivo
export async function removeFile(fileUrl) {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Erro ao remover arquivo:", error);
    throw error;
  }
}

// 🗑️ Remover múltiplos arquivos
export async function removeFiles(fileUrls) {
  return await Promise.all(fileUrls.map((url) => removeFile(url)));
}
