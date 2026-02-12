import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Sua configuração (copiada do painel do Firebase)
const firebaseConfig = {
  apiKey: "AizaSyCePjiowi1oU7gWpqGuqrAon8gkNiHIows",
  authDomain: "upa-sistema-v1.firebaseapp.com",
  projectId: "upa-sistema-v1",
  storageBucket: "upa-sistema-v1.appspot.com",
  messagingSenderId: "1032873427352",
  appId: "1:1032873427352:web:65e1b6f002206c888981f3",
  measurementId: "G-9K7H6X5V4W" // Coloque o seu se for diferente
};

// Inicializa o Firebase (Apenas uma vez!)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporta as ferramentas para usarmos nos outros arquivos
export const db = getFirestore(app);
export const auth = getAuth(app);