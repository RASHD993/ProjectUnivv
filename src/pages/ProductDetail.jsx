import { useState } from 'react';
  import { useRoute, Link } from 'wouter';
  import { Layout } from '@/components/Layout';
  import { getProductById } from '@/data/products';
  import { useCart } from '@/context/CartContext';
  import { useToast } from '@/hooks/use-toast';
  import { Button } from '@/components/ui/button';
  import { Star, ArrowLeft, Check, Minus, Plus, ShoppingBag } from 'lucide-react';

  export default function ProductDetail() {
    const [, params] = useRoute('/products/:id');
    const product = getProductById(parseInt(params?.id || '0', 10));
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAdd = () => {
      if (!product) return;
      setAdding(true);
      addToCart(product, quantity);
      toast({ title: 'Added to cart', description: `${quantity}x ${product.name} added to your bag.` });
      setTimeout(() => setAdding(false), 600);
    };

    if (!product) return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-serif mb-4">Product not found</h2>
          <Button asChild><Link href="/products">Back to products</Link></Button>
        </div>
      </Layout>
    );

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden border">
              {product.imageUrl
                ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-muted-foreground/50"><span className="font-serif italic text-xl">No image</span></div>
              }
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">{product.category}</span>
                {product.inStock
                  ? <span className="inline-flex items-center text-xs font-medium text-green-600"><Check className="mr-1 h-3 w-3" /> In stock</span>
                  : <span className="inline-flex items-center text-xs font-medium text-red-500">Out of stock</span>
                }
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
                <div className="text-2xl font-medium mr-4">${product.price.toFixed(2)}</div>
                {product.rating != null && (
                  <div className="flex items-center text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium mr-1 text-foreground">{product.rating.toFixed(1)}</span>
                    <span>({product.reviewCount || 0} reviews)</span>
                  </div>
                )}
              </div>
              <p className="leading-relaxed text-base text-muted-foreground mb-8">{product.description}</p>
              <div className="mt-auto border-t pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-md h-12 bg-card">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1 || !product.inStock}
                      className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} disabled={!product.inStock}
                      className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button size="lg" className="flex-1 h-12 text-base font-medium rounded-md gap-2" disabled={!product.inStock || adding} onClick={handleAdd}>
                    <ShoppingBag className="h-5 w-5" />
                    {adding ? 'Adding...' : 'Add to Cart'}
                  </Button>
                </div>
                <div className="flex gap-4 mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <div><strong className="block text-foreground font-medium mb-1">Free Shipping</strong>On orders over $50</div>
                  <div><strong className="block text-foreground font-medium mb-1">Easy Returns</strong>30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }