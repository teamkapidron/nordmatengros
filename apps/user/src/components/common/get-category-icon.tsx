import { memo } from 'react';
import {
  Cookie,
  Nut,
  UtensilsCrossed,
  Leaf,
  Milk,
  Coffee,
  Package,
  Candy,
  Droplets,
  Archive,
  GlassWater,
  Apple,
  Wheat,
  Refrigerator,
  Zap,
} from '@repo/ui/lib/icons';

interface GetCategoryIconProps {
  categoryName: string;
}

function GetCategoryIcon(props: GetCategoryIconProps) {
  const name = props.categoryName.toLowerCase();

  if (name.includes('kjeks') || name.includes('kaker')) {
    return <Cookie size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('nøtter') || name.includes('frø')) {
    return <Nut size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('pasta') || name.includes('nudler')) {
    return (
      <UtensilsCrossed size={16} className="text-[var(--baladi-primary)]" />
    );
  }
  if (name.includes('te') && name.includes('poser')) {
    return <Coffee size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('te') && name.includes('løs')) {
    return <Leaf size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('melk') || name.includes('fløte')) {
    return <Milk size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('kaffe')) {
    return <Coffee size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('potetgull')) {
    return <Package size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('cappucino') || name.includes('3in1')) {
    return <Coffee size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('non food')) {
    return <Package size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('baklawa') || name.includes('søtsaker')) {
    return <Candy size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('olje') || name.includes('ghee')) {
    return <Droplets size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('krydder')) {
    return <Archive size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('drikker')) {
    return <GlassWater size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('dadler')) {
    return <Apple size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('ris') || name.includes('mel') || name.includes('gryn')) {
    return <Wheat size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('pickles')) {
    return <Archive size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('sauser') || name.includes('syruper')) {
    return <Zap size={16} className="text-[var(--baladi-primary)]" />;
  }
  if (name.includes('kjølevarer')) {
    return <Refrigerator size={16} className="text-[var(--baladi-primary)]" />;
  }

  return <Package size={16} className="text-[var(--baladi-primary)]" />;
}

export default memo(GetCategoryIcon);
