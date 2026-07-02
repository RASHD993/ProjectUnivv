import { useState, useMemo } from 'react';
  import { useLocation } from 'wouter';
  import { Layout } from '@/components/Layout';
  import { ProductCard } from '@/components/ProductCard';
  import { getProducts, CATEGORIES } from '@/data/products';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Search } from 'lucide-react';

  function cn(...classes) { return classes.filter(Boolean).join(' '); }

  export default function Products() {
    const [, setLocation] = useLocation();
    const categoryParam = new URLSearchParams(window.location.search).get('category') || '';
    const [search, setSearch] = useState('');

    const products = useMemo(() =>
      getProducts({ category: categoryParam || undefined, search: search || undefined }),
      [categoryParam, search]
    );

    const handleCategory = (slug) => {
      setLocation(slug && slug !== categoryParam ?  `/products?category=${cat.slug}` : '/products');
    };
 
      

    return (
      <Layout>
        <div className="bg-muted/30 border-b py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-medium mb-4">كل المنتجات</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">تصفح مجموعتنا الكاملة من السلع المنزلية المختارة بعناية.</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2"><Search className="h-4 w-4" /> البحث</h3>
              <Input type="text" placeholder="ابحث عن المنتجات..." value={search} onChange={e => setSearch(e.target.value)} className="bg-card" />
            </div>
            <div>
              <h3 className="font-medium mb-4">الفئات</h3>
              <div className="flex flex-col space-y-2">
                <button onClick={() => handleCategory('')}
                  className={cn('text-left px-3 py-2 rounded-md transition-colors text-sm', !categoryParam ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground')}>
                  كل الفئات     
                </button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => handleCategory(cat.slug)}
                  
                    className={cn('text-left px-3 py-2 rounded-md transition-colors text-sm flex justify-between items-center', categoryParam === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground')}>
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-60">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 text-sm text-muted-foreground"> {products.length}  اظهار المتجات</div>
            {products.length === 0 ? (
              <div className="py-20 text-center border rounded-xl bg-card border-dashed">
                <h3 className="text-xl font-serif mb-2">لا توجد منتجات</h3>
                <p className="text-muted-foreground mb-6">حاول بحث مختلف أو فئة.</p>
                <Button variant="outline" onClick={() => { setSearch(''); setLocation('/products'); }}>امسح التصنيف</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }