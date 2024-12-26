import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import routes from './routes/routes';
import UrlParser from './utils/url-parser';

let deferredPrompt;

const app = () => {
  const renderPage = async () => {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log('Active URL:', url);
    const page = routes[url];
    if (page) {
      document.querySelector('#mainContent').innerHTML = await page.render();
      await page.afterRender();
    } else {
      console.log('Halaman tidak ditemukan');
    }
  };

  const skipToContentButton = document.querySelector('.skip-to-content');
  if (skipToContentButton) {
    skipToContentButton.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah navigasi halaman ke #/ (halaman utama)
      const mainContent = document.querySelector('#mainContent');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' }); // Scroll ke mainContent dengan animasi
      }
    });
  }

  window.addEventListener('hashchange', renderPage);
  window.addEventListener('load', renderPage);

  // Register Service Worker for offline capabilities
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  }

  // Handle "Add to Home Screen"
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from showing
    event.preventDefault();
    deferredPrompt = event;
    console.log('Add to Home Screen is available!');

    // Show the install button
    const installButton = document.querySelector('#installButton');
    if (installButton) {
      installButton.style.display = 'block';

      installButton.addEventListener('click', () => {
        // Trigger the A2HS prompt when the button is clicked
        deferredPrompt.prompt();

        // Handle the user's choice
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }

          // Reset the deferred prompt and hide the button
          deferredPrompt = null;
          installButton.style.display = 'none';
        });
      });
    }
  });

  // Optional: You can hide the "Add to Home Screen" button if A2HS is not available
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    const installButton = document.querySelector('#installButton');
    if (installButton) {
      installButton.style.display = 'none';
    }
  });

  // Menambahkan logika untuk tombol hamburger
  const hamburgerButton = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', () => {
      // Toggle class 'open' pada menu untuk membuka/tutup menu
      navMenu.classList.toggle('open');
    });
  }
};

app();
