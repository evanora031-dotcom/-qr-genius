import type { ExtraToolContent } from './extraToolTypes';

export const EXTRA_TOOLS_FR: ExtraToolContent = {
  text: {
    label: 'QR Code Texte',
    meta: {
      title: 'Générateur de QR Code Texte Gratuit | Texte Brut | QR GENIUS',
      description: 'Transformez n’importe quel texte (note, code, message, consignes) en QR code. Gratuit, sans inscription, généré dans votre navigateur.',
      keywords: 'texte en qr code, generateur qr code texte, qr code message, qr texte gratuit',
      h1: 'Générateur de QR Code pour Texte'
    },
    page: {
      badge: 'QR Code Texte',
      title: 'Générateur de QR Code Texte Gratuit',
      subtitle: 'Encodez une note, un message, un numéro de série ou de courtes consignes dans un QR code qui affiche le texte une fois scanné. Aucun site web nécessaire.',
      benefits: [
        'Le texte est contenu dans le code, sans page web ni serveur',
        'Utile pour les numéros de série, étiquettes d’inventaire, consignes courtes, codes d’événement et activités en classe',
        'Restez bref : moins de texte donne un code plus simple, scanné plus vite et de plus loin',
        'Téléchargez un SVG ou un PNG haute résolution pour vos étiquettes et impressions'
      ],
      faqs: [
        { q: 'Quelle quantité de texte un QR code peut-il contenir ?', a: 'Un QR code peut contenir au maximum quelques milliers de caractères, mais un long texte produit un code dense, plus difficile à scanner. Au-delà de quelques phrases, préférez un lien vers une page web.' },
        { q: 'Que se passe-t-il quand on scanne un QR code texte ?', a: 'La plupart des appareils photo récents affichent le texte et permettent de le copier. Les options exactes dépendent du téléphone et de l’application de scan.' },
        { q: 'Puis-je modifier le texte après l’impression ?', a: 'Non. Un QR code statique contient le texte lui-même : toute modification exige de générer et d’imprimer un nouveau code.' }
      ]
    },
    copy: {
      heading: 'Placez un message dans un QR code',
      body: 'Un QR code texte stocke vos mots directement dans le code, ce qui le rend lisible sans site web. Il convient aux étiquettes, aux fiches d’inventaire, aux chasses au trésor et aux consignes courtes. Saisissez ou collez le texte, vérifiez l’aperçu, puis scannez-le pour confirmer le résultat.',
      steps: ['Saisissez ou collez le texte à partager.', 'Restez bref pour un code plus net et plus facile à scanner.', 'Scannez l’aperçu avec un téléphone, puis téléchargez le code.'],
      tip: 'Ne placez pas de mots de passe ni d’informations privées dans un QR code texte : toute personne qui le scanne peut les lire.'
    }
  },

  email: {
    label: 'QR Code E-mail',
    meta: {
      title: 'Générateur de QR Code E-mail Gratuit | Scanner pour Écrire | QR GENIUS',
      description: 'Créez un QR code e-mail qui ouvre un nouveau message avec votre adresse, l’objet et un texte facultatif déjà remplis. Gratuit et privé.',
      keywords: 'generateur qr code email, qr code mailto, scanner pour envoyer un email, qr email gratuit',
      h1: 'Générateur de QR Code E-mail'
    },
    page: {
      badge: 'Scanner pour Écrire',
      title: 'Générateur de QR Code E-mail Gratuit',
      subtitle: 'Créez un QR code qui ouvre un e-mail prêt à envoyer, avec votre adresse, l’objet et le message déjà remplis. Idéal pour flyers, emballages et cartes de visite.',
      benefits: [
        'Le scan ouvre l’application de messagerie avec un nouveau message adressé à vous',
        'Préremplissez l’objet et le corps pour recevoir des messages clairs et faciles à trier',
        'Pratique pour les retours, réservations, demandes de devis et contacts support sur supports imprimés',
        'Un code statique : vos informations sont stockées dans le code lui-même, pas sur nos serveurs'
      ],
      faqs: [
        { q: 'Quelle application de messagerie s’ouvre au scan ?', a: 'Le téléphone ouvre son application de messagerie par défaut ou demande laquelle utiliser, selon ses réglages.' },
        { q: 'Puis-je préremplir l’objet et le message ?', a: 'Oui. Ajoutez un objet et un corps de message : ils apparaissent dans le nouvel e-mail. L’expéditeur peut encore les modifier avant l’envoi.' },
        { q: 'Mon adresse e-mail sera-t-elle visible ?', a: 'Oui. L’adresse est stockée dans le code : toute personne qui le scanne peut la voir. Utilisez une adresse de contact publique, pas une adresse privée.' }
      ]
    },
    copy: {
      heading: 'Un seul scan pour vous écrire',
      body: 'Un QR code e-mail utilise le format standard mailto. Lorsqu’on le scanne, le téléphone ouvre un nouveau message vers votre adresse avec l’objet et le texte que vous avez choisis. Vos contacts n’ont plus à saisir votre adresse et vous recevez des messages clairement identifiés.',
      steps: ['Saisissez l’adresse e-mail qui doit recevoir le message.', 'Ajoutez un objet et un corps de message si vous le souhaitez.', 'Scannez le code pour vérifier que le brouillon s’ouvre correctement, puis téléchargez-le.'],
      tip: 'Utilisez une adresse de contact dédiée pour les codes imprimés, car tout le monde peut les scanner et lire l’adresse.'
    }
  },

  phone: {
    label: 'QR Code Téléphone',
    meta: {
      title: 'QR Code Téléphone Gratuit | Scanner pour Appeler | QR GENIUS',
      description: 'Créez un QR code qui propose d’appeler votre numéro après un scan. Gratuit, sans inscription, avec téléchargement SVG et PNG pour l’impression.',
      keywords: 'qr code numero de telephone, scanner pour appeler, generateur qr appel, qr code tel',
      h1: 'Générateur de QR Code Numéro de Téléphone'
    },
    page: {
      badge: 'Scanner pour Appeler',
      title: 'Générateur de QR Code Téléphone Gratuit',
      subtitle: 'Transformez un numéro de téléphone en QR code qui permet d’appeler en un geste. Parfait pour vitrines, véhicules, flyers et panneaux.',
      benefits: [
        'On scanne, on appuie sur appeler et on vous joint sans saisir le numéro',
        'Efficace sur les vitrines, véhicules, colis de livraison et publicités imprimées',
        'Utilisez le format international avec l’indicatif pays pour fonctionner partout',
        'Un code statique sans expiration : il fonctionne tant que le numéro est le vôtre'
      ],
      faqs: [
        { q: 'Le scan appelle-t-il automatiquement le numéro ?', a: 'En général, le téléphone affiche une invitation à appeler et la personne confirme avant de composer. L’appel ne part pas tout seul.' },
        { q: 'Dois-je inclure l’indicatif pays ?', a: 'Oui. Saisissez le numéro au format international, par exemple +212 ou +33 suivi du numéro, pour qu’il fonctionne depuis d’autres pays.' },
        { q: 'Et si je change de numéro ?', a: 'Le code contient le numéro lui-même : il faut créer et imprimer un nouveau code.' }
      ]
    },
    copy: {
      heading: 'Laissez les gens vous appeler en un scan',
      body: 'Un QR code téléphone encode un lien tel:. Après le scan, le téléphone propose d’appeler le numéro, sans que vos clients aient à le lire puis à le saisir. C’est une manière simple de rendre un numéro imprimé directement utilisable.',
      steps: ['Saisissez le numéro avec son indicatif pays.', 'Vérifiez l’aperçu et scannez-le avec votre propre téléphone.', 'Téléchargez le code en SVG ou PNG pour l’impression.'],
      tip: 'Imprimez aussi le numéro en toutes lettres à côté du code, pour ceux qui préfèrent composer manuellement.'
    }
  },

  sms: {
    label: 'QR Code SMS',
    meta: {
      title: 'Générateur de QR Code SMS Gratuit | Message Prérempli | QR GENIUS',
      description: 'Créez un QR code SMS qui ouvre un message vers votre numéro avec un texte préécrit. Gratuit et généré dans votre navigateur.',
      keywords: 'generateur qr code sms, qr code message texte, scanner pour envoyer un sms, qr sms prerempli',
      h1: 'Générateur de QR Code SMS'
    },
    page: {
      badge: 'Scanner pour Écrire',
      title: 'Générateur de QR Code SMS Gratuit',
      subtitle: 'Créez un QR code qui ouvre un nouveau SMS vers votre numéro avec un message préécrit. Idéal pour campagnes par mot-clé, demandes de rendez-vous et réponses rapides.',
      benefits: [
        'Le scan ouvre l’application de messagerie avec le destinataire et le message prêts',
        'Parfait pour demandes de rendez-vous, inscriptions à un club, mots-clés de commande et retours',
        'Un court message préécrit rend les SMS reçus faciles à reconnaître et à trier',
        'Testez sur iPhone et Android, car les applications de messagerie peuvent traiter les liens SMS différemment'
      ],
      faqs: [
        { q: 'Le SMS est-il envoyé automatiquement ?', a: 'Non. Le message apparaît dans l’application de messagerie et la personne doit appuyer sur envoyer.' },
        { q: 'Cela fonctionne-t-il sur iPhone et Android ?', a: 'La plupart des téléphones récents le prennent en charge, mais le comportement peut varier selon l’appareil et l’application de scan. Testez toujours votre code sur les téléphones de votre public.' },
        { q: 'Puis-je inclure un message ?', a: 'Oui. Vous pouvez préécrire un court message. Restez bref pour que le code reste simple à scanner.' }
      ]
    },
    copy: {
      heading: 'Lancez un SMS en un scan',
      body: 'Un QR code SMS stocke un numéro de téléphone et un message facultatif. Au scan, le téléphone ouvre un nouveau SMS adressé à ce numéro. Il convient aux demandes de réservation, aux inscriptions à un événement et aux réponses clients sur supports imprimés.',
      steps: ['Saisissez le numéro avec son indicatif pays.', 'Rédigez le court message à préremplir.', 'Scannez-le sur iPhone et Android pour vérifier, puis téléchargez-le.'],
      tip: 'Les frais de messagerie habituels peuvent s’appliquer à l’expéditeur : mentionnez-le si cela compte.'
    }
  },

  instagram: {
    label: 'QR Code Instagram',
    meta: {
      title: 'Générateur de QR Code Instagram Gratuit | Lien vers le Profil | QR GENIUS',
      description: 'Créez un QR code Instagram qui ouvre votre profil. Saisissez votre @pseudo, personnalisez couleurs et logo, puis téléchargez pour l’impression.',
      keywords: 'generateur qr code instagram, qr profil instagram, suivez moi qr code, qr instagram gratuit',
      h1: 'Générateur de QR Code Instagram'
    },
    page: {
      badge: 'Gagnez des Abonnés',
      title: 'Générateur de QR Code Instagram Gratuit',
      subtitle: 'Transformez votre nom d’utilisateur Instagram en QR code qui ouvre votre profil. Ajoutez-le aux cartes de visite, emballages, menus et panneaux d’événements.',
      benefits: [
        'Saisissez votre @pseudo ou le lien complet du profil : le code ouvre ce profil',
        'Facilitez la recherche et l’abonnement depuis vos supports imprimés',
        'Ajoutez les couleurs ou le logo de votre marque dans le studio complet',
        'Un code statique qui ouvre directement le lien web'
      ],
      faqs: [
        { q: 'Dois-je saisir mon @ ou le lien complet ?', a: 'Les deux fonctionnent. Saisissez votre pseudo avec ou sans @, ou collez le lien complet du profil Instagram.' },
        { q: 'Et si je change de pseudo ?', a: 'Le code pointe vers l’adresse de profil saisie : un nouveau pseudo implique un nouveau code.' },
        { q: 'Est-ce un outil officiel d’Instagram ?', a: 'Non. QR GENIUS est un outil indépendant, non affilié à Instagram et non approuvé par lui.' }
      ]
    },
    copy: {
      heading: 'Envoyez directement vers votre profil',
      body: 'Un QR code Instagram encode le lien de votre profil : il suffit de le scanner au lieu de chercher votre nom. Il est utile pour les boutiques, les créateurs et les événements où le public se trouve devant votre support imprimé.',
      steps: ['Saisissez votre pseudo ou collez le lien de votre profil.', 'Vérifiez le code et scannez-le pour confirmer que le bon profil s’ouvre.', 'Personnalisez le style si vous le souhaitez, puis téléchargez-le.'],
      tip: 'Gardez un fort contraste entre le code et son fond pour un bon scan sur emballages et panneaux.'
    }
  },

  facebook: {
    label: 'QR Code Facebook',
    meta: {
      title: 'QR Code Facebook Gratuit | Lien Page ou Profil | QR GENIUS',
      description: 'Créez un QR code Facebook qui ouvre votre page ou votre profil. Saisissez le nom de la page ou le lien, personnalisez-le et téléchargez-le.',
      keywords: 'generateur qr code facebook, qr page facebook, aimez notre page qr, qr facebook gratuit',
      h1: 'Générateur de QR Code Facebook'
    },
    page: {
      badge: 'Retrouvez-nous sur Facebook',
      title: 'Générateur de QR Code Facebook Gratuit',
      subtitle: 'Créez un QR code qui ouvre votre page ou votre profil Facebook. Idéal pour commerces locaux, événements, groupes et publicités imprimées.',
      benefits: [
        'Saisissez le nom de votre page ou collez son lien complet',
        'Aide les clients à trouver votre page sans saisie ni recherche',
        'Associez-le à un appel à l’action comme « Scannez pour nous suivre » sur flyers et panneaux',
        'Téléchargez des fichiers haute résolution pour affiches, bannières et emballages'
      ],
      faqs: [
        { q: 'Puis-je pointer vers un groupe ou un événement Facebook ?', a: 'Oui. Collez dans le champ le lien complet du groupe, de l’événement ou de la page : le code l’ouvrira.' },
        { q: 'Que saisir pour une page ?', a: 'Saisissez le nom de la page tel qu’il apparaît dans son adresse Facebook, ou collez le lien complet par précaution.' },
        { q: 'Cet outil est-il affilié à Facebook ?', a: 'Non. QR GENIUS est un outil indépendant, non affilié à Facebook ni à Meta et non approuvé par eux.' }
      ]
    },
    copy: {
      heading: 'Reliez vos supports imprimés à votre page Facebook',
      body: 'Un QR code Facebook stocke l’adresse web de votre page, groupe, événement ou profil. Au scan, il ouvre cette adresse dans l’application Facebook ou le navigateur. C’est un pont simple entre une affiche ou une vitrine et votre communauté en ligne.',
      steps: ['Saisissez le nom de la page ou collez le lien Facebook complet.', 'Scannez l’aperçu pour confirmer que la bonne page s’ouvre.', 'Téléchargez le code et placez-le sur vos supports.'],
      tip: 'Coller le lien complet est la manière la plus fiable de pointer vers des groupes et des événements.'
    }
  },

  youtube: {
    label: 'QR Code YouTube',
    meta: {
      title: 'Générateur de QR Code YouTube Gratuit | Lien Vidéo ou Chaîne | QR GENIUS',
      description: 'Créez un QR code YouTube qui ouvre une vidéo ou une chaîne. Collez un lien ou @chaîne, personnalisez-le et téléchargez-le pour l’impression ou vos diapositives.',
      keywords: 'generateur qr code youtube, qr code video, qr chaine youtube, scanner pour regarder une video',
      h1: 'Générateur de QR Code YouTube'
    },
    page: {
      badge: 'Partagez vos Vidéos',
      title: 'Générateur de QR Code YouTube Gratuit',
      subtitle: 'Transformez le lien d’une vidéo, d’une playlist ou d’une chaîne YouTube en QR code. Parfait pour présentations, notices produit, classes et affiches d’événements.',
      benefits: [
        'Collez un lien de vidéo ou de playlist, ou saisissez @chaîne pour pointer vers une chaîne',
        'Permettez de regarder un tutoriel ou une démo directement depuis une notice ou un emballage',
        'Utilisez-le dans vos diapositives et en classe pour que le public ouvre la vidéo sur son téléphone',
        'Téléchargez un SVG ou un PNG pour l’impression et les présentations'
      ],
      faqs: [
        { q: 'Vers quoi puis-je pointer ?', a: 'Vers une vidéo, une playlist ou une chaîne. Collez le lien complet ou saisissez un identifiant de chaîne commençant par @.' },
        { q: 'Puis-je saisir uniquement l’identifiant de la vidéo ?', a: 'Oui. Si vous saisissez seulement un identifiant de vidéo, le code pointe vers cette vidéo.' },
        { q: 'Est-ce un produit YouTube ?', a: 'Non. QR GENIUS est un outil indépendant, non affilié à YouTube ni à Google et non approuvé par eux.' }
      ]
    },
    copy: {
      heading: 'Ouvrez une vidéo en un scan',
      body: 'Un QR code YouTube stocke le lien d’une vidéo, d’une playlist ou d’une chaîne. Le scan ouvre YouTube sur le téléphone du spectateur, qui n’a pas à saisir une longue adresse. Pratique pour les notices, emballages, présentations et panneaux d’événements.',
      steps: ['Collez un lien YouTube ou saisissez un identifiant de chaîne comme @votrechaine.', 'Scannez l’aperçu pour vérifier que la bonne vidéo ou chaîne s’ouvre.', 'Téléchargez le code pour vos diapositives, l’impression ou les emballages.'],
      tip: 'Pointez vers une vidéo que vous maîtrisez et comptez garder en ligne : une vidéo supprimée rend le code inutile.'
    }
  },

  maps: {
    label: 'QR Code Google Maps',
    meta: {
      title: 'Générateur de QR Code Google Maps Gratuit | Localisation | QR GENIUS',
      description: 'Créez un QR code qui ouvre un lieu dans Google Maps à partir d’une adresse ou de coordonnées. Gratuit, privé et prêt à imprimer.',
      keywords: 'qr code google maps, generateur qr code localisation, qr code adresse, coordonnees gps qr',
      h1: 'Générateur de QR Code Localisation Google Maps'
    },
    page: {
      badge: 'Partagez un Lieu',
      title: 'Générateur de QR Code Google Maps Gratuit',
      subtitle: 'Transformez une adresse ou des coordonnées GPS en QR code qui ouvre le lieu dans Google Maps. Idéal pour boutiques, salles, invitations et panneaux d’événements.',
      benefits: [
        'Saisissez une adresse postale ou des coordonnées de latitude et de longitude',
        'Le scan ouvre le lieu dans Google Maps pour obtenir l’itinéraire',
        'Utile sur invitations, flyers, vitrines et instructions de livraison',
        'Un code statique sans expiration, tant que le lien de la carte fonctionne'
      ],
      faqs: [
        { q: 'Dois-je utiliser une adresse ou des coordonnées ?', a: 'Une adresse convient aux boutiques et aux salles. Les coordonnées conviennent aux lieux sans adresse précise, comme un départ de sentier ou un parking.' },
        { q: 'Le code ouvre-t-il Google Maps ?', a: 'Oui. Il ouvre un lien Google Maps, dans l’application Maps ou dans le navigateur selon le téléphone.' },
        { q: 'Comment trouver des coordonnées ?', a: 'Dans Google Maps, faites un clic droit sur un point sur ordinateur, ou appuyez longuement sur mobile, pour afficher sa latitude et sa longitude. Saisissez-les en format décimal.' }
      ]
    },
    copy: {
      heading: 'Guidez les gens au bon endroit',
      body: 'Un QR code de localisation stocke un lien Google Maps construit à partir de votre adresse ou de vos coordonnées. Le scan ouvre la carte pour voir le lieu et lancer la navigation. Utile pour invitations, flyers de boutique et partout où vous trouver est difficile.',
      steps: ['Choisissez adresse ou coordonnées et saisissez le lieu.', 'Scannez l’aperçu pour confirmer que le bon endroit s’ouvre.', 'Téléchargez le code et ajoutez-le à vos supports.'],
      tip: 'Vérifiez le repère sur la carte avant d’imprimer, surtout pour les adresses qui existent dans plusieurs villes.'
    }
  }
};
