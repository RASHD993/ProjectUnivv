import { Link } from 'wouter';
  import { Star } from 'lucide-react';

  export function ProductCard({ product }) {
    return (
      <Link href={`/products/${product.id}`} className="group flex flex-col relative h-full rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-md transition-all duration-300">
        <div className="aspect-[4/5] relative overflow-hidden bg-muted">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 bg-muted">
              <span className="font-serif italic text-xl">No image</span>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium tracking-wide uppercase rounded-sm border shadow-sm">
              Featured
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="text-xs font-medium text-muted-foreground mb-2 tracking-wider uppercase">{product.category}</div>
          <h3 className="font-serif text-lg font-medium leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="font-medium text-lg">${product.price.toFixed(2)}</div>
            {product.rating != null && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }