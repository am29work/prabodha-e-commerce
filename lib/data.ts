// Define the shape of a Generation object
export interface Generation {
  id: string;
  title: string;
  subtitle: string;
  themeColor: string;
  image: string;
}

export const generations: Generation[] = [
  {
    id: 'millennial',
    title: 'The Heritage',
    subtitle: 'Classic Grace for the Modern Heirloom.',
    themeColor: 'bg-[#3A0D0D]', 
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'gen-z',
    title: 'The Disruptor',
    subtitle: 'Traditional Soul. Urban Spirit.',
    themeColor: 'bg-[#0D1B2A]',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'gen-alpha',
    title: 'The Evolution',
    subtitle: 'Fluidity in Every Stitch.',
    themeColor: 'bg-[#1A1A1A]',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1600',
  },
];