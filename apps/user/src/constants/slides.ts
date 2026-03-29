import { CarouselSlide } from '@/components/common/carousel';

export const carouselSlides = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Kvalitetsprodukter for Fagfolk',
    description:
      'Opplev vårt brede sortiment av produkter til konkurransedyktige priser',
    ctaText: 'Utforsk Produkter',
    ctaLink: '/products',
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Ferske Asiatiske Ingredienser',
    description: 'Direkte hentet fra autentiske produsenter',
    ctaText: 'Handle Nå',
    ctaLink: '/products?category=fresh',
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Engrosløsninger',
    description: 'Pålitelig leverandør for restauranter og matbedrifter',
    ctaText: 'Kontakt Oss',
    ctaLink: '/contact',
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Spesialtilbud',
    description: 'Sjekk ut våre nyeste tilbud og kampanjer',
    ctaText: 'Se Tilbud',
    ctaLink: '/offers',
  },
] satisfies CarouselSlide[];
