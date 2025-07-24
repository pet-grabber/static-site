# PET Grabber

## Robot telecomandat pentru gestionarea acumulărilor de deșeuri

**PET Grabber** este un robot conceput pentru soluționarea problemei gunoaielor. Acesta este manevrat de pe site-ul [pet-grabber.web.app](https://pet-grabber.web.app), proiectat pentru toate platformele, cu ajutorul unei interfețe intuitive. Proiectul are mai multe componente:

* Site-ul **PET Grabber** este făcut în HTML, CSS și Vanilla JS, este găzduit pe [Firebase](https://firebase.google.com/), o suită de unelte pentru dezvoltarea aplicațiilor web, iar autentificarea și stocarea datelor se fac prin același serviciu (Firebase Authentication și Firebase Realtime Database).
* Odată autentificat, utilizatorul are acces la live stream-ul de la Pi Camera, realizat printr-un server Flask pe `localhost:5000` ([`stream.py`](https://github.com/pet-grabber/pet-grabber/tree/main/robot/stream.py)). Acest server este expus în siguranță pe Internet prin intermediul unui [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), o conexiune similară unui VPN, fără a deschide porturi în rețea. Astfel, se obține un URL cu stream-ul, care este deschis pe site.
* 