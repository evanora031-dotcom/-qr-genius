import type { ExtraToolContent } from './extraToolTypes';

export const EXTRA_TOOLS_EN: ExtraToolContent = {
  text: {
    label: 'Text QR Code',
    meta: {
      title: 'Free Text to QR Code Generator | Plain Text QR | QR GENIUS',
      description: 'Turn any plain text, such as a note, code, message, or short instructions, into a QR code. Free, no sign-up, generated in your browser.',
      keywords: 'text to qr code, plain text qr code generator, message qr code, free text qr',
      h1: 'Text to QR Code Generator'
    },
    page: {
      badge: 'Plain Text QR',
      title: 'Free Text to QR Code Generator',
      subtitle: 'Encode a note, a message, a serial number, or short instructions into a QR code that shows the text when scanned. No website needed.',
      benefits: [
        'The text lives inside the code, so no web page or server is involved',
        'Useful for serial numbers, asset tags, short instructions, event codes, and classroom activities',
        'Keep it short: less text makes a simpler code that scans faster and from farther away',
        'Download SVG or high-resolution PNG for labels and print'
      ],
      faqs: [
        { q: 'How much text can a QR code hold?', a: 'A QR code can hold a few thousand characters at most, but long text makes a dense code that is harder to scan. For anything longer than a few sentences, link to a web page instead.' },
        { q: 'What happens when someone scans a text QR code?', a: 'Most modern phone cameras show the text and let the person copy it. The exact options depend on the phone and the scanner app.' },
        { q: 'Can I change the text after printing?', a: 'No. A static QR code stores the text itself, so changing it means generating and printing a new code.' }
      ]
    },
    copy: {
      heading: 'Put a message inside a QR code',
      body: 'A text QR code stores your words directly in the code, so it can be read without a website. It suits labels, inventory tags, scavenger hunts, and short instructions. Type or paste the text, check the preview, and scan it to confirm that it reads exactly as intended.',
      steps: ['Type or paste the text you want to share.', 'Keep it short for a cleaner, easier-to-scan code.', 'Scan the preview with a phone, then download the code.'],
      tip: 'Do not put passwords or private information in a text QR code, because anyone who scans it can read it.'
    }
  },

  email: {
    label: 'Email QR Code',
    meta: {
      title: 'Free Email QR Code Generator | Scan to Send Email | QR GENIUS',
      description: 'Create an email QR code that opens a new message with your address, subject, and optional text already filled in. Free and private.',
      keywords: 'email qr code generator, mailto qr code, scan to email, free email qr',
      h1: 'Email QR Code Generator'
    },
    page: {
      badge: 'Scan to Email',
      title: 'Free Email QR Code Generator',
      subtitle: 'Make a QR code that opens a ready-to-send email with your address, subject line, and message already filled in. Ideal for flyers, packaging, and business cards.',
      benefits: [
        'Scanning opens the phone\'s email app with a new message addressed to you',
        'Pre-fill a subject and body so every message arrives clear and easy to sort',
        'Handy for feedback, bookings, quote requests, and support contact on printed materials',
        'A static code: your details are stored in the code itself, not on our servers'
      ],
      faqs: [
        { q: 'Which email app opens when the code is scanned?', a: 'The phone opens its default mail app or asks which one to use. This depends on the phone\'s settings.' },
        { q: 'Can I pre-fill the subject and message?', a: 'Yes. Add a subject and body and they appear in the new message. The sender can still edit them before sending.' },
        { q: 'Will my email address be visible?', a: 'Yes. The address is stored in the code, so anyone who scans it can see it. Use a public contact address, not a private one.' }
      ]
    },
    copy: {
      heading: 'Make it one scan to email you',
      body: 'An email QR code uses the standard mailto format. When someone scans it, their phone opens a new message to your address with the subject and text you chose. It saves people from typing your address and helps you receive clearly labelled messages.',
      steps: ['Enter the email address that should receive the message.', 'Add an optional subject and message body.', 'Scan the code to confirm that the draft opens correctly, then download it.'],
      tip: 'Use a dedicated contact address for printed codes, since anyone can scan them and read the address.'
    }
  },

  phone: {
    label: 'Phone Number QR Code',
    meta: {
      title: 'Free Phone Number QR Code Generator | Scan to Call | QR GENIUS',
      description: 'Create a QR code that prompts a call to your phone number when scanned. Free, no sign-up, with SVG and PNG download for print.',
      keywords: 'phone number qr code, scan to call qr, call qr code generator, tel qr code',
      h1: 'Phone Number QR Code Generator'
    },
    page: {
      badge: 'Scan to Call',
      title: 'Free Phone Number QR Code Generator',
      subtitle: 'Turn a phone number into a QR code that prompts the caller to dial with one tap. Perfect for shop windows, vehicles, flyers, and signs.',
      benefits: [
        'People scan, tap call, and reach you without typing the number',
        'Works well on storefronts, vehicles, delivery boxes, and printed ads',
        'Use the full international format with the country code so it works from anywhere',
        'A static code with no expiry: it works for as long as the number is yours'
      ],
      faqs: [
        { q: 'Does scanning call the number automatically?', a: 'Usually the phone shows a call prompt and the person confirms before dialling. It does not place a call by itself.' },
        { q: 'Should I include the country code?', a: 'Yes. Enter the number in international format, for example +212 or +1 followed by the number, so it works for people calling from other countries.' },
        { q: 'What if I change my number?', a: 'The code stores the number itself, so you need to create and print a new code.' }
      ]
    },
    copy: {
      heading: 'Let people call you with one scan',
      body: 'A phone number QR code encodes a tel: link. After scanning, the phone offers to call the number, so customers do not have to read it and type it in. It is a simple way to make a printed number actionable.',
      steps: ['Enter the phone number with its country code.', 'Check the preview and scan it with your own phone.', 'Download the code in SVG or PNG for print.'],
      tip: 'Print the number in plain text next to the code as well, for people who prefer to dial manually.'
    }
  },

  sms: {
    label: 'SMS QR Code',
    meta: {
      title: 'Free SMS QR Code Generator | Pre-filled Text Message | QR GENIUS',
      description: 'Create an SMS QR code that opens a text message to your number with a pre-written message. Free and generated in your browser.',
      keywords: 'sms qr code generator, text message qr code, scan to text, pre-filled sms qr',
      h1: 'SMS QR Code Generator'
    },
    page: {
      badge: 'Scan to Text',
      title: 'Free SMS QR Code Generator',
      subtitle: 'Create a QR code that opens a new text message to your number with a pre-written message. Ideal for keyword campaigns, appointment requests, and quick replies.',
      benefits: [
        'Scanning opens the messaging app with the recipient and message ready',
        'Great for appointment requests, club sign-ups, order keywords, and feedback',
        'Short pre-written messages make incoming texts easy to recognize and sort',
        'Test on both iPhone and Android, because messaging apps can handle SMS links differently'
      ],
      faqs: [
        { q: 'Does the text send automatically?', a: 'No. The message appears in the messaging app and the person must press send.' },
        { q: 'Does it work on both iPhone and Android?', a: 'Most modern phones support it, but behavior can vary by device and scanner app. Always test your code on the phones your audience uses.' },
        { q: 'Can I include a message?', a: 'Yes. You can pre-write a short message. Keep it brief so the code stays simple to scan.' }
      ]
    },
    copy: {
      heading: 'Start a text message with one scan',
      body: 'An SMS QR code stores a phone number and an optional message. When scanned, the phone opens a new text addressed to that number. It works well for booking requests, event sign-ups, and customer replies on printed materials.',
      steps: ['Enter the phone number with its country code.', 'Write the short message you want pre-filled.', 'Scan it on iPhone and Android to confirm, then download it.'],
      tip: 'Standard messaging rates may apply to the sender, so mention it where it matters.'
    }
  },

  instagram: {
    label: 'Instagram QR Code',
    meta: {
      title: 'Free Instagram QR Code Generator | Link to Profile | QR GENIUS',
      description: 'Create an Instagram QR code that opens your profile. Enter your @username, customize colors and logo, then download for print.',
      keywords: 'instagram qr code generator, instagram profile qr, follow me qr code, free instagram qr',
      h1: 'Instagram QR Code Generator'
    },
    page: {
      badge: 'Grow Your Followers',
      title: 'Free Instagram QR Code Generator',
      subtitle: 'Turn your Instagram username into a QR code that opens your profile. Add it to business cards, packaging, menus, and event signs.',
      benefits: [
        'Enter your @username or a full profile link and the code opens that profile',
        'Make it easy for customers to find and follow you from printed materials',
        'Add brand colors or a logo in the full studio',
        'A static code that opens the web link directly'
      ],
      faqs: [
        { q: 'Do I enter my @ or the full link?', a: 'Either works. Type your username with or without the @, or paste a full Instagram profile link.' },
        { q: 'What if I change my username?', a: 'The code points to the profile address that was entered, so a new username means a new code.' },
        { q: 'Is this an official Instagram tool?', a: 'No. QR GENIUS is an independent tool and is not affiliated with or endorsed by Instagram.' }
      ]
    },
    copy: {
      heading: 'Send people straight to your profile',
      body: 'An Instagram QR code encodes the link to your profile, so anyone can open it by scanning instead of searching for your name. It is useful for shops, creators, and events where people are standing in front of your printed material.',
      steps: ['Type your username or paste your profile link.', 'Review the code and scan it to confirm that the right profile opens.', 'Customize the style if you like, then download it.'],
      tip: 'Keep strong contrast between the code and its background so it scans well on packaging and signs.'
    }
  },

  facebook: {
    label: 'Facebook QR Code',
    meta: {
      title: 'Free Facebook QR Code Generator | Link to Page or Profile | QR GENIUS',
      description: 'Create a Facebook QR code that opens your page or profile. Enter the page name or link, customize it, and download for print.',
      keywords: 'facebook qr code generator, facebook page qr, like us on facebook qr, free facebook qr',
      h1: 'Facebook QR Code Generator'
    },
    page: {
      badge: 'Connect on Facebook',
      title: 'Free Facebook QR Code Generator',
      subtitle: 'Create a QR code that opens your Facebook page or profile. Great for local businesses, events, groups, and printed advertising.',
      benefits: [
        'Enter your page name or paste its full link',
        'Helps customers find your page without typing or searching',
        'Pair it with a call to action such as "Scan to follow us" on flyers and signs',
        'Download high-resolution files for posters, banners, and packaging'
      ],
      faqs: [
        { q: 'Can I link to a Facebook group or event?', a: 'Yes. Paste the full link of the group, event, or page into the field and the code will open it.' },
        { q: 'What should I enter for a page?', a: 'Enter the page name as it appears in its Facebook address, or paste the complete page link to be safe.' },
        { q: 'Is this affiliated with Facebook?', a: 'No. QR GENIUS is an independent tool and is not affiliated with or endorsed by Facebook or Meta.' }
      ]
    },
    copy: {
      heading: 'Link your printed material to your Facebook page',
      body: 'A Facebook QR code stores the web address of your page, group, event, or profile. When scanned, it opens that address in the Facebook app or the browser. It is a simple bridge from a poster or storefront to your online community.',
      steps: ['Enter your page name or paste the full Facebook link.', 'Scan the preview to confirm that the correct page opens.', 'Download the code and place it on your materials.'],
      tip: 'Pasting the full link is the most reliable way to point to groups and events.'
    }
  },

  youtube: {
    label: 'YouTube QR Code',
    meta: {
      title: 'Free YouTube QR Code Generator | Link to Video or Channel | QR GENIUS',
      description: 'Create a YouTube QR code that opens a video or channel. Paste a link or @channel, customize it, and download for print or slides.',
      keywords: 'youtube qr code generator, video qr code, youtube channel qr, scan to watch video',
      h1: 'YouTube QR Code Generator'
    },
    page: {
      badge: 'Share Your Videos',
      title: 'Free YouTube QR Code Generator',
      subtitle: 'Turn a YouTube video, playlist, or channel link into a QR code. Perfect for presentations, product manuals, classrooms, and event posters.',
      benefits: [
        'Paste a video or playlist link, or enter @channel to link a channel',
        'Let people watch a tutorial or demo straight from a printed manual or package',
        'Use it in slides and classrooms so the audience can open the video on their own phones',
        'Download SVG or PNG for print and presentations'
      ],
      faqs: [
        { q: 'What can I link to?', a: 'You can link to a video, a playlist, or a channel. Paste the full link, or enter a channel handle starting with @.' },
        { q: 'Can I enter just a video ID?', a: 'Yes. If you enter only a video ID, the code links to that video.' },
        { q: 'Is this a YouTube product?', a: 'No. QR GENIUS is an independent tool and is not affiliated with or endorsed by YouTube or Google.' }
      ]
    },
    copy: {
      heading: 'Open a video with one scan',
      body: 'A YouTube QR code stores a link to a video, playlist, or channel. Scanning it opens YouTube on the viewer\'s phone, which saves them from typing a long address. It is handy for instruction sheets, product packaging, presentations, and event signs.',
      steps: ['Paste a YouTube link or enter a channel handle such as @yourchannel.', 'Scan the preview to check that the right video or channel opens.', 'Download the code for your slides, print, or packaging.'],
      tip: 'Link to a video you control and plan to keep online, because a removed video breaks the code.'
    }
  },

  maps: {
    label: 'Google Maps QR Code',
    meta: {
      title: 'Free Google Maps QR Code Generator | Location QR | QR GENIUS',
      description: 'Create a QR code that opens a place in Google Maps from an address or coordinates. Free, private, and ready for print.',
      keywords: 'google maps qr code, location qr code generator, address qr code, gps coordinates qr',
      h1: 'Google Maps Location QR Code Generator'
    },
    page: {
      badge: 'Share a Location',
      title: 'Free Google Maps Location QR Code Generator',
      subtitle: 'Turn an address or GPS coordinates into a QR code that opens the location in Google Maps. Ideal for shops, venues, invitations, and event signs.',
      benefits: [
        'Enter a street address or latitude and longitude coordinates',
        'Scanning opens the place in Google Maps so people can get directions',
        'Useful on invitations, flyers, store windows, and delivery instructions',
        'A static code with no expiry, as long as the map link keeps working'
      ],
      faqs: [
        { q: 'Should I use an address or coordinates?', a: 'Use an address for shops and venues. Use coordinates for places without a clear address, such as trailheads or parking spots.' },
        { q: 'Does the code open Google Maps?', a: 'Yes. It opens a Google Maps link, in the Maps app or the browser depending on the phone.' },
        { q: 'How do I find coordinates?', a: 'In Google Maps, right-click a spot on desktop, or press and hold on mobile, to see its latitude and longitude. Enter them in decimal form.' }
      ]
    },
    copy: {
      heading: 'Send people to the right place',
      body: 'A location QR code stores a Google Maps link built from your address or coordinates. Scanning opens the map so people can see the place and start navigation. It is useful for event invitations, store flyers, and anywhere finding you is the hard part.',
      steps: ['Choose address or coordinates and enter the location.', 'Scan the preview to confirm that the correct place opens.', 'Download the code and add it to your materials.'],
      tip: 'Check the pin on the map before printing, especially for addresses that exist in more than one city.'
    }
  }
};
