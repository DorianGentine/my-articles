import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-72 bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Bienvenue sur My Articles</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Cette application a été développée dans le cadre d'un test technique. Elle utilise une stack, comprenant les technologies suivantes :
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-8">
        <li><strong>Next.js</strong> - Un framework React pour le rendu côté serveur et la génération de sites statiques.</li>
        <li><strong>React</strong> - Une bibliothèque JavaScript pour construire des interfaces utilisateur.</li>
        <li><strong>Tailwind CSS</strong> - Un framework CSS utilitaire pour un développement rapide et flexible.</li>
        <li><strong>TypeScript</strong> - Un sur-ensemble typé de JavaScript qui améliore la qualité du code et la productivité des développeurs.</li>
        ---------
        <li><strong>Express</strong> - Un framework web minimaliste pour Node.js.</li>
        <li><strong>MongoDB</strong> - Une base de données NoSQL flexible et évolutive.</li>
        <li><strong>Mongoose</strong> - Une bibliothèque ODM (Object Data Modeling) pour MongoDB et Node.js.</li>
        <li><strong>CORS</strong> - Un middleware pour permettre les requêtes cross-origin.</li>
        <li><strong>dotenv</strong> - Un module pour charger les variables d'environnement à partir d'un fichier `.env`.</li>
        <li><strong>morgan</strong> - Un middleware de journalisation des requêtes HTTP pour Node.js.</li>
        <li><strong>multer</strong> - Un middleware pour la gestion des fichiers multipart/form-data.</li>
        <li><strong>nodemailer</strong> - Un module pour envoyer des emails avec Node.js.</li>
        <li><strong>nodemon</strong> - Un outil qui aide à développer des applications Node.js en redémarrant automatiquement l'application lorsque des fichiers sont modifiés.</li>
      </ul>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Explorez les différentes sections de l'application pour en savoir plus sur les articles et les fonctionnalités implémentées.
      </p>
    </div>
  )
}