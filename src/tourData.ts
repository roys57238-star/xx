
export interface TourDetail {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions?: string[];
}

export const TOUR_DETAILS: TourDetail[] = [
  {
    id: "puri",
    name: "Puri",
    duration: "4 Days / 3 Nights",
    price: 7900,
    originalPrice: 10900,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200",
    description: "Experience the spiritual aura of Lord Jagannath and the serene beauty of Puri's golden beaches.",
    itinerary: [
      { day: 1, title: "Departure", activities: ["Journey starts in the evening by bus from Kolkata/Howrah."] },
      { day: 2, title: "Bhubaneswar Sightseeing", activities: ["Morning arrival at Bhubaneswar.", "Visit Nandankanan Zoological Park.", "Explore Udayagiri and Khandagiri Caves.", "Visit Konark Sun Temple and Chandrabhaga Beach.", "Evening check-in at Puri hotel."] },
      { day: 3, title: "Jagannath Temple & Beach", activities: ["Morning visit to the holy Jagannath Temple.", "Leisure time at Puri Sea Beach.", "Shopping at the local market."] },
      { day: 4, title: "Return Journey", activities: ["Morning at the beach.", "After breakfast, check-out from hotel.", "Return journey by bus."] }
    ],
    inclusions: ["Daily Breakfast, Lunch & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing as per itinerary", "Pick up & Drop off"]
  },
  {
    id: "spiti-valley",
    name: "Shimla Spiti Valley",
    duration: "9 Days / 8 Nights",
    price: 28900,
    originalPrice: 31900,
    image: "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&q=80&w=1200",
    description: "A journey through the 'Middle Land' - Spiti Valley, witnessing ancient monasteries and breathtaking landscapes.",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", activities: ["Pick up from Chandigarh airport/station.", "Visit Viceregal Lodge, Jakhu Temple and Sankat Mochan Temple.", "Overnight stay at Shimla."] },
      { day: 2, title: "Shimla to Chitkul", activities: ["Journey towards Chitkul via Kufri, Narkanda and Rampur Bushahr.", "Stop at Karshum Dam.", "Travel through Sangla Valley.", "Overnight stay at Chitkul by Baspa River."] },
      { day: 3, title: "Chitkul to Kalpa", activities: ["Sunrise at Chitkul (India's last village near Tibet border).", "Explore local village.", "Afternoon journey to Kalpa.", "Visit Suicide Point and Roghi Village.", "Overnight stay at Kalpa."] },
      { day: 4, title: "Kalpa to Tabo", activities: ["Travel towards Tabo.", "Visit Khab (confluence of Satluj and Spiti rivers).", "Visit Nako Lake and Gue Mummy.", "Star gazing at Tabo Helipad.", "Overnight stay at Tabo."] },
      { day: 5, title: "Tabo to Kaza", activities: ["Visit Tabo Monastery.", "Visit ancient Dhankar Monastery and Pin Valley National Park.", "Evening explore Kaza market.", "Overnight stay at Kaza."] },
      { day: 6, title: "Kaza Sightseeing", activities: ["Visit Langza (Marine fossils & Buddha statue).", "Visit Komic (World's highest motorable village).", "Visit Hikkim (World's highest post office).", "Overnight stay at Kaza."] },
      { day: 7, title: "Kaza to Chandratal", activities: ["Visit Kee Monastery and Chicham Bridge.", "Lunch at Losar.", "Head towards Chandratal Lake.", "Overnight stay in tents/hotel under the stars."] },
      { day: 8, title: "Chandratal to Manali", activities: ["Journey towards Manali through scenic mountain roads.", "Overnight stay at Manali."] },
      { day: 9, title: "Departure", activities: ["Check-out from Manali hotel.", "Drop at Chandigarh airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel/Tent Accommodation", "All Sightseeing", "Pick up & Drop off", "Train Ticket (from Howrah/Kolkata)"]
  },
  {
    id: "kerala",
    name: "Kerala",
    duration: "8 Days / 7 Nights",
    price: 23900,
    originalPrice: 26900,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
    description: "Explore 'God's Own Country' with its backwaters, tea gardens, and pristine beaches.",
    itinerary: [
      { day: 1, title: "Cochin Arrival", activities: ["Transfer to hotel.", "Visit Ernakulam Shiva Temple, Jewish Synagogue, Dutch Palace.", "Visit Fort Cochin beach and Chinese fishing nets.", "Overnight stay at Cochin."] },
      { day: 2, title: "Cochin to Munnar", activities: ["Transfer to Munnar.", "Enjoy waterfalls and tea gardens on the way.", "Overnight stay at Munnar."] },
      { day: 3, title: "Munnar to Thekkady", activities: ["Munnar sightseeing: Eravikulam National Park, Mattupetty Dam, Kundala Lake, Echo Point.", "Transfer to Thekkady.", "Overnight stay at Thekkady."] },
      { day: 4, title: "Thekkady to Alleppey", activities: ["Optional: Periyar National Park.", "Transfer to Alleppey.", "Check-in at 3-star Houseboat.", "Backwater cruising and overnight stay in Houseboat."] },
      { day: 5, title: "Alleppey to Kanyakumari", activities: ["Transfer to Kanyakumari via Varkala.", "Visit Varkala Cliff and Beach.", "Overnight stay at Kanyakumari."] },
      { day: 6, title: "Kanyakumari to Trivandrum", activities: ["Sunrise view at Kanyakumari.", "Visit Vivekananda Rock Memorial, Thiruvalluvar Statue, Gandhi Memorial.", "Transfer to Trivandrum.", "Overnight stay at Trivandrum."] },
      { day: 7, title: "Trivandrum & Kovalam", activities: ["Visit Padmanabhaswamy Temple, Napier Museum, Art Gallery.", "Evening visit Kovalam Beach and Lighthouse Beach.", "Overnight stay at Trivandrum."] },
      { day: 8, title: "Departure", activities: ["Check-out and drop at Trivandrum airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "3-Star Houseboat Stay in Alleppey", "All Sightseeing", "Pick up & Drop off", "Train Ticket"]
  },
  {
    id: "goa",
    name: "Goa",
    duration: "5 Days / 4 Nights",
    price: 15900,
    originalPrice: 18900,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200",
    description: "Sun, sand, and sea! Discover the vibrant culture and beautiful beaches of Goa.",
    itinerary: [
      { day: 1, title: "Goa Arrival", activities: ["Arrival at Goa airport/station.", "Transfer to hotel and check-in.", "Evening at leisure."] },
      { day: 2, title: "North Goa Sightseeing", activities: ["Visit Calangute Beach, Baga Beach, Anjuna Beach.", "Explore Vagator Beach and Fort Aguada."] },
      { day: 3, title: "South Goa Sightseeing", activities: ["Visit Old Goa Churches (Basilica of Bom Jesus).", "Visit Mangeshi Temple.", "Explore Miramar Beach and Dona Paula.", "Optional: Mandovi River Cruise."] },
      { day: 4, title: "Leisure Day", activities: ["Day at leisure for beach activities, water sports, or shopping."] },
      { day: 5, title: "Departure", activities: ["Check-out and drop at airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off", "Train Ticket"]
  },
  {
    id: "meghalaya-guwahati",
    name: "Meghalaya & Guwahati",
    duration: "6 Days / 5 Nights",
    price: 17900,
    originalPrice: 20900,
    image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1200",
    description: "Explore the 'Abode of Clouds' with its living root bridges, waterfalls, and the cleanest village in Asia.",
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", activities: ["Guwahati arrival.", "Transfer to Shillong.", "Visit Umiam Lake (Barapani).", "Overnight stay at Shillong."] },
      { day: 2, title: "Shillong to Cherrapunji", activities: ["Transfer to Cherrapunji.", "Visit Elephant Falls, Seven Sisters Falls, Mawsmai Cave, Eco Park.", "Overnight stay at Cherrapunji."] },
      { day: 3, title: "Mawlynnong & Dawki", activities: ["Visit Mawlynnong (Cleanest village in Asia).", "Visit Dawki (Umngot River - crystal clear water).", "Transfer back to Shillong."] },
      { day: 4, title: "Shillong Sightseeing", activities: ["Visit Laitlum Canyons.", "Visit Krang Suri Falls.", "Overnight stay at Shillong."] },
      { day: 5, title: "Shillong to Guwahati", activities: ["Transfer to Guwahati.", "Visit Kamakhya Temple.", "Optional: Brahmaputra River Cruise.", "Overnight stay at Guwahati."] },
      { day: 6, title: "Departure", activities: ["Check-out and drop at Guwahati airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "andaman",
    name: "Andaman",
    duration: "7 Days / 6 Nights",
    price: 23900,
    originalPrice: 26900,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200",
    description: "A tropical paradise with white sandy beaches, turquoise waters, and rich history.",
    itinerary: [
      { day: 1, title: "Port Blair Arrival", activities: ["Arrival at Port Blair.", "Visit Cellular Jail (Light & Sound show).", "Overnight stay at Port Blair."] },
      { day: 2, title: "Port Blair to Havelock", activities: ["Transfer to Havelock Island by Cruise.", "Visit Radhanagar Beach (Asia's best beach).", "Overnight stay at Havelock."] },
      { day: 3, title: "Havelock to Neil Island", activities: ["Transfer to Neil Island by Cruise.", "Visit Bharatpur Beach, Laxmanpur Beach, Natural Bridge.", "Overnight stay at Neil Island."] },
      { day: 4, title: "Neil to Port Blair", activities: ["Transfer back to Port Blair by Cruise.", "Overnight stay at Port Blair."] },
      { day: 5, title: "Island Hopping", activities: ["Visit North Bay Island (Coral Island).", "Visit Ross Island (Netaji Subhash Chandra Bose Island).", "Overnight stay at Port Blair."] },
      { day: 6, title: "Baratang Island", activities: ["Early morning trip to Baratang Island.", "Visit Limestone Caves and Mud Volcano.", "Overnight stay at Port Blair."] },
      { day: 7, title: "Departure", activities: ["Check-out and drop at Port Blair airport."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Cruise Tickets", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "shimla-manali",
    name: "Shimla Kullu Manali",
    duration: "5 Days / 4 Nights",
    price: 16900,
    originalPrice: 19900,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
    description: "The classic Himalayan getaway featuring snow-capped mountains and charming hill stations.",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", activities: ["Pick up from Chandigarh.", "Transfer to Shimla.", "Overnight stay at Shimla."] },
      { day: 2, title: "Shimla Sightseeing", activities: ["Visit Kufri.", "Explore Mall Road, Ridge, and Jakhu Temple.", "Overnight stay at Shimla."] },
      { day: 3, title: "Shimla to Manali", activities: ["Transfer to Manali.", "Enroute visit Kullu Valley and Pandoh Dam.", "Overnight stay at Manali."] },
      { day: 4, title: "Manali Sightseeing", activities: ["Visit Hadimba Devi Temple, Vashisht Temple.", "Visit Solang Valley for snow activities.", "Overnight stay at Manali."] },
      { day: 5, title: "Departure", activities: ["Check-out and drop at Chandigarh airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off", "Train Ticket"]
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    duration: "6 Days / 5 Nights",
    price: 18900,
    originalPrice: 21900,
    image: "https://images.unsplash.com/photo-1626690110325-4b089970c84a?auto=format&fit=crop&q=80&w=1200",
    description: "Discover the 'Land of the Rising Sun' with its majestic monasteries and high mountain passes.",
    itinerary: [
      { day: 1, title: "Guwahati to Bhalukpong", activities: ["Guwahati arrival.", "Transfer to Bhalukpong.", "Overnight stay at Bhalukpong."] },
      { day: 2, title: "Bhalukpong to Dirang", activities: ["Transfer to Dirang.", "Visit Tipi Orchidarium.", "Overnight stay at Dirang."] },
      { day: 3, title: "Dirang to Tawang", activities: ["Transfer to Tawang.", "Enroute visit Sela Pass and Jaswant Garh War Memorial.", "Overnight stay at Tawang."] },
      { day: 4, title: "Tawang Sightseeing", activities: ["Visit Tawang Monastery (second largest in the world).", "Visit Tawang War Memorial.", "Optional: Bumla Pass trip.", "Overnight stay at Tawang."] },
      { day: 5, title: "Tawang to Bomdila", activities: ["Transfer to Bomdila.", "Overnight stay at Bomdila."] },
      { day: 6, title: "Departure", activities: ["Transfer to Guwahati and drop at airport/station."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "darjeeling-gangtok",
    name: "Darjeeling & Gangtok",
    duration: "5 Days / 4 Nights",
    price: 12900,
    originalPrice: 15900,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
    description: "A perfect blend of tea gardens, monasteries, and stunning views of Mt. Kanchenjunga. (Min 8 Pax)",
    itinerary: [
      { day: 1, title: "Arrival in Gangtok", activities: ["Arrival at NJP/Bagdogra.", "Transfer to Gangtok.", "Overnight stay at Gangtok."] },
      { day: 2, title: "Tsomgo Lake Trip", activities: ["Visit Tsomgo Lake and Baba Mandir.", "Overnight stay at Gangtok."] },
      { day: 3, title: "Gangtok to Darjeeling", activities: ["Transfer to Darjeeling.", "Enroute visit Namchi (Chardham).", "Overnight stay at Darjeeling."] },
      { day: 4, title: "Darjeeling Sightseeing", activities: ["Early morning Tiger Hill (Sunrise).", "Visit Batasia Loop and Ghoom Monastery.", "Afternoon 7-point sightseeing.", "Overnight stay at Darjeeling."] },
      { day: 5, title: "Departure", activities: ["Check-out and drop at NJP/Bagdogra."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "darjeeling-gangtok-pelling",
    name: "Darjeeling, Gangtok & Pelling",
    duration: "7 Days / 6 Nights",
    price: 18900,
    originalPrice: 21900,
    image: "https://images.unsplash.com/photo-1610448721566-473ce9da814c?auto=format&fit=crop&q=80&w=1200",
    description: "Explore the best of Sikkim and North Bengal with this comprehensive tour. (Min 8 Pax)",
    itinerary: [
      { day: 1, title: "Arrival in Gangtok", activities: ["Arrival at NJP.", "Transfer to Gangtok.", "Overnight stay at Gangtok."] },
      { day: 2, title: "Tsomgo Lake Trip", activities: ["Visit Tsomgo Lake and Baba Mandir.", "Overnight stay at Gangtok."] },
      { day: 3, title: "Gangtok to Pelling", activities: ["Transfer to Pelling.", "Enroute visit Ravangla (Buddha Park).", "Overnight stay at Pelling."] },
      { day: 4, title: "Pelling Sightseeing", activities: ["Visit Skywalk, Khecheopalri Lake, Kanchenjunga Falls.", "Overnight stay at Pelling."] },
      { day: 5, title: "Pelling to Darjeeling", activities: ["Transfer to Darjeeling.", "Overnight stay at Darjeeling."] },
      { day: 6, title: "Darjeeling Sightseeing", activities: ["Tiger Hill sunrise.", "Batasia Loop, Ghoom Monastery.", "7-point sightseeing.", "Overnight stay at Darjeeling."] },
      { day: 7, title: "Departure", activities: ["Check-out and drop at NJP."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "gangtok-only",
    name: "Gangtok",
    duration: "4 Days / 3 Nights",
    price: 8900,
    originalPrice: 11900,
    image: "https://images.unsplash.com/photo-1589136775550-c201359bf63a?auto=format&fit=crop&q=80&w=1200",
    description: "A quick and refreshing getaway to the capital of Sikkim. (Min 8 Pax)",
    itinerary: [
      { day: 1, title: "Arrival in Gangtok", activities: ["Arrival at NJP.", "Transfer to Gangtok.", "Overnight stay at Gangtok."] },
      { day: 2, title: "Tsomgo Lake Trip", activities: ["Visit Tsomgo Lake and Baba Mandir.", "Overnight stay at Gangtok."] },
      { day: 3, title: "Gangtok Local Sightseeing", activities: ["Full day local sightseeing (10 points).", "Overnight stay at Gangtok."] },
      { day: 4, title: "Departure", activities: ["Check-out and drop at NJP."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "darjeeling-only",
    name: "Darjeeling",
    duration: "4 Days / 3 Nights",
    price: 7900,
    originalPrice: 10900,
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1200",
    description: "The 'Queen of the Hills', famous for its tea gardens and breathtaking views of Mt. Kanchenjunga. (Min 8 Pax)",
    itinerary: [
      { day: 1, title: "Arrival in Darjeeling", activities: ["Arrival at NJP/Bagdogra.", "Transfer to Darjeeling.", "Overnight stay at Darjeeling."] },
      { day: 2, title: "Darjeeling Sightseeing", activities: ["Early morning Tiger Hill (Sunrise).", "Visit Batasia Loop and Ghoom Monastery.", "Afternoon 7-point sightseeing.", "Overnight stay at Darjeeling."] },
      { day: 3, title: "Mirik Excursion", activities: ["Full day trip to Mirik Lake.", "Enjoy boating and horse riding.", "Visit tea gardens on the way.", "Overnight stay at Darjeeling."] },
      { day: 4, title: "Departure", activities: ["Check-out and drop at NJP/Bagdogra."] }
    ],
    inclusions: ["Daily Breakfast & Dinner", "Deluxe Hotel Accommodation", "All Sightseeing", "Pick up & Drop off"]
  },
  {
    id: "vietnam",
    name: "Vietnam",
    duration: "8 Days / 7 Nights",
    price: 69900,
    originalPrice: 74900,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200",
    description: "Experience the vibrant culture and stunning natural beauty of Vietnam, from the bustling streets of Saigon to the serene waters of Ha Long Bay.",
    itinerary: [
      { day: 1, title: "Saigon Arrival & My Tho", activities: ["Arrival at Ho Chi Minh City (Saigon).", "Depart for My Tho and explore Unicorn Island.", "Enjoy a hand-rowed sampan ride through Thoi Son canal.", "Visit a Honey Bee Farm and a coconut candy workshop.", "Overnight in Saigon."] },
      { day: 2, title: "Saigon to Da Nang", activities: ["Saigon orientation tour.", "Domestic flight to Da Nang.", "Check into hotel and leisure evening.", "Overnight in Da Nang."] },
      { day: 3, title: "Da Nang & Hoi An", activities: ["Visit Son Tra Peninsula (Monkey Mountain) and Linh Ung Pagoda.", "Explore Marble Mountains.", "Evening exploring the beautiful Hoi An Ancient Town.", "Overnight in Da Nang."] },
      { day: 4, title: "Ba Na Hills to Hanoi", activities: ["Visit Ba Na Hills via the tourist route.", "Explore Golden Bridge, Fantasy Park, and Shakyamuni Buddha statue.", "Evening flight to Hanoi.", "Overnight in Hanoi."] },
      { day: 5, title: "Ninh Binh Excursion", activities: ["Travel to Ninh Binh Province to visit Hoa Lu.", "2-hour boat ride on the Ngo Dong River through limestone mountains and three magnificent caves (Hang Ca, Hang Hai, Hang Ba).", "Overnight in Hanoi."] },
      { day: 6, title: "Ha Long Bay Cruise", activities: ["Depart for Ha Long Bay and board a 4-star luxury cruise.", "Visit Ti Top Island.", "Enjoy a sunset party on the sundeck and a professional chef-prepared dinner.", "Overnight on the cruise."] },
      { day: 7, title: "Hanoi City Tour", activities: ["Start with Tai Chi and visit the Surprising Cave.", "Return to Hanoi to visit Sword Lake, Ngoc Son Temple, Huc Bridge.", "Explore the Old Quarter via a cycle tour or puppet show.", "Overnight in Hanoi."] },
      { day: 8, title: "Departure", activities: ["Breakfast and transfer to Hanoi International Airport for your flight home."] }
    ],
    inclusions: ["3/4-star Hotel Accommodation", "Daily Breakfast", "4-Star Luxury Cruise in Ha Long Bay", "All Transfers and Sightseeing by AC Vehicle", "All Entrance Fees"]
  },
  {
    id: "bali",
    name: "Bali",
    duration: "6 Days / 5 Nights",
    price: 49900,
    originalPrice: 54900,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    description: "Discover the Island of Gods, from the lush rice terraces of Ubud to the stunning sunsets of Uluwatu.",
    itinerary: [
      { day: 1, title: "Arrival & Ubud Transfer", activities: ["Arrival at Bali International Airport.", "Meet representative and transfer to Ubud hotel.", "Overnight stay in Ubud."] },
      { day: 2, title: "Ubud Sightseeing", activities: ["Visit Tegalalang Rice Terrace and Kintamani Volcano.", "Explore Tukad Cepung Waterfall, Ubud Palace, and Ubud Market.", "Overnight stay in Ubud."] },
      { day: 3, title: "Ubud to Kuta", activities: ["Check out from Ubud and head to Kuta.", "Visit Taman Ayun Temple, Beratan Lake, and Ulun Danu Temple.", "Visit Handara Gate of Heaven, Wanagiri Hidden Hills, and Coffee Plantation.", "Overnight stay in Kuta."] },
      { day: 4, title: "Nusa Penida Excursion", activities: ["Full-day adventure to Nusa Penida Island.", "Enjoy a provided lunch on the island.", "Overnight stay in Kuta."] },
      { day: 5, title: "Water Sports & Uluwatu", activities: ["Visit Tanjung Benoa for water sports.", "Visit Padang-Padang Beach and cliffside Uluwatu Temple.", "Traditional Kecak Dance Performance at sunset.", "Jimbaran Seafood Dinner by the beach.", "Overnight stay in Kuta."] },
      { day: 6, title: "Departure", activities: ["Breakfast and transfer to Bali International Airport for your departure flight."] }
    ],
    inclusions: ["3-star Hotel Accommodation", "Daily Breakfast", "Special Nusa Penida Tour with Lunch", "Jimbaran Seafood Dinner", "All Transport and Sightseeing by AC Vehicle", "English Speaking Driver", "All Entrance Fees"]
  },
  {
    id: "bangkok-pattaya-phuket-krabi",
    name: "Bangkok, Pattaya, Phuket & Krabi",
    duration: "9 Days / 8 Nights",
    price: 56900,
    originalPrice: 61900,
    image: "https://images.unsplash.com/photo-1504214208698-ea1919a23562?auto=format&fit=crop&q=80&w=1200",
    description: "The ultimate Thailand experience covering the best of cities, beaches, and islands.",
    itinerary: [
      { day: 1, title: "Arrival & Pattaya Transfer", activities: ["Arrival at Bangkok Airport and transfer to Pattaya.", "Enroute visit Sriracha Tiger Zoo with breakfast.", "Overnight stay in Pattaya."] },
      { day: 2, title: "Coral Island Tour", activities: ["Full-day Coral Island tour with lunch included.", "Overnight stay in Pattaya."] },
      { day: 3, title: "Pattaya to Bangkok", activities: ["Check out and transfer to Bangkok.", "City tour: Gems Gallery, Big Buddha Temple, Big Buddha Hills, and Pattaya View Points.", "Evening Chao Phraya River Cruise with dinner and music.", "Overnight stay in Bangkok."] },
      { day: 4, title: "Safari World & Marine Park", activities: ["Full day exploring the Jungle Safari & Marine Park with lunch.", "Overnight stay in Bangkok."] },
      { day: 5, title: "Bangkok to Krabi", activities: ["Transfer to airport for flight to Krabi.", "Meet representative and transfer to Krabi hotel.", "Overnight stay in Krabi."] },
      { day: 6, title: "Krabi 4 Islands Tour", activities: ["4 Islands tour: Railay Beach, Chicken Island, and Poda Island with lunch.", "Overnight stay in Krabi."] },
      { day: 7, title: "Krabi to Phuket", activities: ["Transfer to Phuket.", "Enroute Phuket City Tour.", "Overnight stay in Phuket."] },
      { day: 8, title: "Phi Phi Island Tour", activities: ["Full-day trip to Phi Phi Island by speedboat/large boat with lunch.", "Overnight stay in Phuket."] },
      { day: 9, title: "Departure", activities: ["Breakfast and transfer to Phuket International Airport."] }
    ],
    inclusions: ["3/4-star Hotel Accommodation", "Daily Breakfast", "Coral Island Tour with Lunch", "Chao Phraya River Cruise with Dinner", "Safari World & Marine Park Tour with Lunch", "Krabi 4 Islands Tour", "Phuket City Tour", "Phi Phi Island Tour with Lunch", "All Transfers and Sightseeing by AC Vehicle", "English Speaking Driver", "All Entrance Fees"]
  },
  {
    id: "phuket-krabi",
    name: "Phuket & Krabi",
    duration: "6 Days / 5 Nights",
    price: 39900,
    originalPrice: 44900,
    image: "https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?auto=format&fit=crop&q=80&w=1200",
    description: "Relax and explore the stunning islands and beaches of Southern Thailand.",
    itinerary: [
      { day: 1, title: "Arrival & Krabi Transfer", activities: ["Arrival at Phuket Airport and transfer to Krabi hotel.", "Overnight stay in Krabi."] },
      { day: 2, title: "Krabi 4 Islands Tour", activities: ["Scenic 4 Islands Tour: Railay Beach, Chicken Island, and Poda Island with lunch.", "Overnight stay in Krabi."] },
      { day: 3, title: "Krabi to Phuket", activities: ["Transfer to Phuket.", "Phuket City Tour.", "Overnight stay in Phuket."] },
      { day: 4, title: "Phi Phi Island Tour", activities: ["Trip to Phi Phi Island by shared launch or speedboat with lunch.", "Overnight stay in Phuket."] },
      { day: 5, title: "James Bond Island Tour", activities: ["World-famous James Bond Island full-day tour with lunch.", "Overnight stay in Phuket."] },
      { day: 6, title: "Departure", activities: ["Breakfast and transfer to Phuket International Airport."] }
    ],
    inclusions: ["3-star Hotel Accommodation", "Daily Breakfast", "Krabi 4 Islands Tour with Lunch", "Phi Phi Island Tour with Lunch", "James Bond Island Tour with Lunch", "All Transfers and Sightseeing by AC Vehicle", "English Speaking Driver", "All Entrance Fees"]
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    duration: "4 Days / 3 Nights",
    price: 29900,
    originalPrice: 34900,
    image: "https://images.unsplash.com/photo-1596422846543-b5c64863e939?auto=format&fit=crop&q=80&w=1200",
    description: "Explore the modern skyline and cultural heritage of Malaysia's capital city.",
    itinerary: [
      { day: 1, title: "Arrival & Putrajaya Tour", activities: ["Arrival at KL International Airport.", "Enroute tour of Putrajaya.", "Check-in at hotel.", "Overnight stay in Kuala Lumpur."] },
      { day: 2, title: "Batu Caves & Genting Highlands", activities: ["Visit iconic Batu Caves.", "Full-day adventure to Genting Highlands with cable car ride.", "Overnight stay in Kuala Lumpur."] },
      { day: 3, title: "KL City Tour", activities: ["Visit King Palace, Independence Square, National Mosque, and National Monuments.", "Photo stops at Petronas Twin Towers.", "Visit Chocolate Gallery.", "Overnight stay in Kuala Lumpur."] },
      { day: 4, title: "Departure", activities: ["Breakfast, check-out, and transfer to KL International Airport."] }
    ],
    inclusions: ["4-star Hotel Accommodation", "Daily Breakfast", "Putrajaya Tour", "Batu Caves & Genting Highlands Tour", "KL City Tour", "All Transfers and Sightseeing by AC Vehicle", "English Speaking Driver", "All Entrance Fees"]
  },
  {
    id: "kuala-lumpur-langkawi",
    name: "Kuala Lumpur & Langkawi",
    duration: "6 Days / 5 Nights",
    price: 44900,
    originalPrice: 49900,
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200",
    description: "A perfect mix of island relaxation in Langkawi and city exploration in Kuala Lumpur.",
    itinerary: [
      { day: 1, title: "Langkawi Arrival", activities: ["Arrival at Langkawi International Airport and transfer to hotel.", "Overnight stay in Langkawi."] },
      { day: 2, title: "Langkawi Island Hopping", activities: ["Half-day island hopping tour.", "Visit Skybridge with Cable Car, SkyDome, SkyRex, and SkyCab.", "Overnight stay in Langkawi."] },
      { day: 3, title: "Langkawi to Kuala Lumpur", activities: ["Transfer to Langkawi Airport for flight to Kuala Lumpur.", "Transfer to KL hotel.", "Overnight stay in Kuala Lumpur."] },
      { day: 4, title: "Batu Caves & Genting Highlands", activities: ["Full-day tour to Batu Caves and Genting Highlands with cable car tickets.", "Overnight stay in Kuala Lumpur."] },
      { day: 5, title: "KL City Tour", activities: ["Visit King Palace, Independence Square, National Mosque, and National Monuments.", "Petronas Twin Tower photo stop.", "Visit Chocolate Gallery.", "Overnight stay in Kuala Lumpur."] },
      { day: 6, title: "Departure", activities: ["Breakfast, check-out, and Putrajaya Tour.", "Transfer to KL International Airport."] }
    ],
    inclusions: ["3/4-star Hotel Accommodation", "Daily Breakfast", "Langkawi Island Hopping Tour", "Batu Caves & Genting Highlands Tour", "KL City Tour", "All Transfers and Sightseeing by AC Vehicle", "English Speaking Driver", "All Entrance Fees"]
  },
  {
    id: "phu-quoc",
    name: "Phu Quoc",
    duration: "5 Days / 4 Nights",
    price: 54900,
    originalPrice: 59900,
    image: "https://cdn.audleytravel.com/1050/749/79/16016190-phu-quoc-island-south-vietnam.webp",
    description: "Escape to the tropical paradise of Phu Quoc, known for its white sand beaches and crystal clear waters.",
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Arrival at Phu Quoc International Airport and transfer to hotel.", "Overnight stay in Phu Quoc."] },
      { day: 2, title: "4 Islands Speedboat Tour", activities: ["Visit Buom, Gam Ghi, and May Rut islands for snorkeling.", "Experience Sea Walker and Aquatopia Water Park at Thom Island.", "Cable Car ride at sunset.", "Overnight stay in Phu Quoc."] },
      { day: 3, title: "Safari & VinWonders", activities: ["Explore Safari (wild animal zoo) and VinWonders (theme park).", "Visit Teddy Bear Museum and Grand World.", "Overnight stay in Phu Quoc."] },
      { day: 4, title: "Starfish Beach & Grand World", activities: ["Relax at Starfish Beach.", "Evening visit Grand World for 'Kiss of the Sea' water and light show.", "Overnight stay in Phu Quoc."] },
      { day: 5, title: "Departure", activities: ["Breakfast, check-out, and transfer to Phu Quoc International Airport."] }
    ],
    inclusions: ["3-star Hotel Accommodation", "Daily Breakfast", "4-Island Speedboat Tour with Lunch", "English Speaking Driver", "All Entrance Fees"]
  }
];
