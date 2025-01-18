
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, Hammer, ShoppingBasket, Martini, BookOpen } from 'lucide-react';

const links = [
    {
        name: "Dashboard",
        url:  route('dashboard'),
        icon: LayoutDashboard,
    },
    {
        name: "Essentials",
        url:  route('essentials.index'),
        icon: Hammer,
    },
    {
        name: "My Recipes",
        url:  route('recipes.index'),
        icon: BookOpen,
    },
    {
        name: "Ingredients",
        url:  "#",
        icon: ShoppingBasket,
    },
    {
        name: "Spirits",
        url:  "#",
        icon: Martini,
    }
];

export function AppFooter() {
    const [active, setActive] = useState('');

    useEffect(() => {
        const currentRoute = window.location.href;
        const activeLink   = links.find((link) => link.url === currentRoute);
        setActive(activeLink?.url || '');
    }, []);

    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-sidebar rounded-t-lg">
        <nav className="flex justify-between items-center px-4 py-2">
          {links.map((link) => (
            <Link
                key={link.name}
                href={link.url}
                aria-label={link.name}
                className={`flex flex-col items-center text-muted-foreground ${active === link.url && 'text-primary'} transition-colors mb-2`}
            >

                <span className="text-xs mb-1 fade-in-10">{link.name}</span>
                <link.icon className="mb-1" />
            </Link>
          ))}
        </nav>
      </footer>
    )
}
