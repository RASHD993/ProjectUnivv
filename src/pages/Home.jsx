import { Link } from 'wouter';
  import { getProducts, CATEGORIES } from '@/data/products';
  import { Layout } from '@/components/Layout';
  import { ProductCard } from '@/components/ProductCard';
  import { Button } from '@/components/ui/button';
  import { ArrowRight } from 'lucide-react';

  const featuredProducts = getProducts({ featured: true }).slice(0, 4);

  export default function Home() {
    return (
      <Layout >
        {/* Hero */}
        <section className="relative overflow-hidden bg-muted/50 py-20 md:py-32">
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 inline-block">مرحبا بكم</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium max-w-3xl mx-auto leading-tight mb-6">
              كل ما  <span className="text-orange-400 italic">تحتاج</span> هنا و اكثر.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              كل شي ضروري تحتاجه هنا في السوق النزلي، من أدوات المطبخ إلى ديكور المنزل، كل ما تحتاجه لتجعل منزلك أكثر راحة وجمال.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 text-base h-14" asChild>
                <Link href="/products">تسوق كل المنتجات</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14" asChild>
                <Link href="/products?category=kitchen">استكشف المطبخ</Link>
              </Button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-orange-100 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-serif font-medium mb-3">المنتجات المميزة</h2>
                <p className="text-muted-foreground max-w-xl text-lg">أفضل القطع التي اخترناها بعناية من حيث الجودة والتصميم.</p>
              </div>
              <Link href="/products" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                اظهار الكل <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium mb-3">الفئات</h2>
              <p className="text-muted-foreground text-lg">ابحث عن ما تبحث عنه بالضبط.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} href={`/products?category=${cat.slug}`}
                  className="group rounded-xl h-36 flex items-center justify-center border bg-card hover:border-primary/50 transition-colors shadow-sm">
                  <div className="text-center p-4 bg-background/80 backdrop-blur-sm rounded-lg border group-hover:scale-105 transition-transform duration-300">
                    <h3 className="font-serif font-medium text-base mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{cat.productCount} Items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">الأساسيات عالية الجودة للمنزل اليومي</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                نؤمن بأن الأشياء التي نستخدمها كل يوم يجب أن تجلب السعادة. من كوب القهوة الصباحي إلى الأسرة التي تنام عليها، نختار منتجات تجمع بين الجمال الزمني والفعالية غير المتناقضة.
              </p>
              <div className="inline-block w-16 h-1 bg-orange-400 rounded-full" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }